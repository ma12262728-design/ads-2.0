import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { supabase } from '../lib/supabase';
import { useSEO } from '../hooks/useSEO';

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

export default function Blog() {
  useSEO(
    "Engineering Insights & Blog - Ammar Digital", 
    "Latest technical insights, software engineering updates, and digital marketing strategies from Ammar Digital.",
    "blog",
    "https://ammardigital.shop/og-image.jpg"
  );
  
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...new Set(posts.map(p => p.category))];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-20 md:pt-32 pb-20">
      <div className="container-custom">
        <SectionHeader 
          title="Knowledge Core" 
          subtitle="INSIGHTS, TECH TRENDS & ARCHITECTURAL GUIDES" 
        />

        {/* Search and Filter Bar */}
        <div className="flex flex-col gap-6 mb-12 md:mb-16 items-center justify-between">
          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-accent transition-colors">
              <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Search intelligence..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-foreground/[0.03] border border-foreground/10 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-accent/40 focus:bg-foreground/[0.05] transition-all font-mono text-sm text-foreground"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${
                  activeCategory === cat 
                    ? 'bg-accent text-black border-accent shadow-[0_0_20px_rgba(0,240,255,0.3)]' 
                    : 'bg-foreground/[0.03] text-muted-foreground border-foreground/10 hover:border-accent/40 hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-[350px] md:h-[400px] bg-foreground/5 animate-pulse rounded-[32px] border border-foreground/10" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group h-full"
              >
                <Link to={`/blog/${post.slug}`} className="flex flex-col h-full bg-foreground/[0.02] border border-foreground/[0.05] rounded-[32px] overflow-hidden hover:bg-foreground/[0.04] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img 
                      src={post.image_url || `https://picsum.photos/seed/${post.slug}/800/500`}
                      alt={post.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-accent/90 text-black px-3 py-1 md:px-4 md:py-1.5 rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-[9px] md:text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-widest mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={11} className="text-secondary" />
                        {new Date(post.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User size={11} className="text-accent" />
                        {post.author}
                      </div>
                    </div>

                    <h3 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-tight leading-tight mb-3 group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-6 line-clamp-2 md:line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-accent opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                      Access Intelligence <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
            
            {filteredPosts.length === 0 && (
              <div className="col-span-full py-40 text-center">
                 <div className="mb-6 opacity-20 flex justify-center">
                    <Search size={80} />
                 </div>
                 <h4 className="text-2xl font-black text-foreground uppercase tracking-widest opacity-40 italic">NO_RELEVANT_DATA_POINTS_FOUND</h4>
                 <p className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-widest mt-4">Try adjusting your search filters</p>
                 <button 
                  onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                  className="mt-10 text-accent font-black uppercase tracking-widest text-[11px] underline underline-offset-8"
                 >
                   Reset Search Protocol
                 </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
