import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Tag, Share2, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { supabase } from '../lib/supabase';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image_url: string;
  created_at: string;
}

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (err) {
      console.error('Error fetching post:', err);
      // If post not found, redirect to blog list after a short delay
      setTimeout(() => navigate('/blog'), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        url: window.location.href,
      });
    } else {
      alert('Link copied to clipboard!');
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-48 text-center px-6">
        <h2 className="text-4xl font-black text-foreground uppercase tracking-widest mb-6">404: ARCHIVE_NOT_FOUND</h2>
        <p className="text-muted-foreground mb-12 max-w-md mx-auto">The requested intelligence packet does not exist or has been declassified.</p>
        <Link to="/blog" className="text-accent underline underline-offset-8 font-black uppercase tracking-widest text-[11px]">Return to Grid</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container-custom max-w-4xl">
        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link to="/blog" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-accent transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> Back to Intelligence Index
          </Link>
        </motion.div>

        {/* Hero Section */}
        <div className="mb-16">
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="bg-accent/10 border border-accent/20 text-accent px-5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
              {post.category}
            </span>
            <div className="h-px w-12 bg-foreground/10" />
            <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-widest">
              <Clock size={12} /> Read duration: 8m
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-foreground uppercase tracking-tight leading-[0.9] mb-12 italic">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-8 py-8 border-y border-foreground/[0.05]">
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center text-accent">
                  <User size={20} />
                </div>
                <div>
                   <p className="text-[8px] font-mono font-black text-muted-foreground uppercase tracking-[0.2em]">Intel_Author</p>
                   <p className="text-xs font-black text-foreground uppercase tracking-widest">{post.author}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center text-secondary">
                  <Calendar size={20} />
                </div>
                <div>
                   <p className="text-[8px] font-mono font-black text-muted-foreground uppercase tracking-[0.2em]">Declassified_On</p>
                   <p className="text-xs font-black text-foreground uppercase tracking-widest">{new Date(post.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleShare}
              className="w-12 h-12 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground hover:bg-accent hover:text-black transition-all group"
            >
              <Share2 size={18} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="aspect-[21/9] overflow-hidden rounded-[40px] mb-20 border border-foreground/10 p-2 bg-foreground/5"
        >
          <img 
            src={post.image_url || `https://picsum.photos/seed/${post.slug}/1920/1080`}
            alt={post.title}
            className="w-full h-full object-cover rounded-[32px] grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
          {/* Sidebar - Floating Contents (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-1 border-l border-accent/20 sticky top-48 h-fit">
             {/* Decorative element */}
             <div className="h-40 bg-gradient-to-b from-accent/20 to-transparent w-px ml-[-1px]" />
          </div>

          <div className="lg:col-span-11">
             <div className="markdown-body">
                <ReactMarkdown>{post.content}</ReactMarkdown>
             </div>

             {/* Footer Interaction */}
             <div className="mt-24 p-12 bg-foreground/[0.02] border border-foreground/[0.05] rounded-[48px] text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-accent/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h4 className="text-2xl font-black text-foreground uppercase tracking-widest mb-6">Found this intel useful?</h4>
                <p className="text-muted-foreground text-sm max-w-md mx-auto mb-10 leading-relaxed">Share it across the network to help other digital architects build better infrastructures.</p>
                <div className="flex justify-center gap-6">
                   <button 
                    onClick={handleShare}
                    className="bg-accent text-black px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:shadow-[0_0_40px_rgba(0,240,255,0.4)] transition-all active:scale-95"
                   >
                     Broadcast Intelligence
                   </button>
                   <Link 
                    to="/blog"
                    className="bg-foreground/[0.05] text-foreground border border-foreground/10 px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-foreground hover:text-background transition-all"
                   >
                     Return to Archive
                   </Link>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
