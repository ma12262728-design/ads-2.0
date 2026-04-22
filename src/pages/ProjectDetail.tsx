import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PORTFOLIO } from '../constants/data';
import SectionHeader from '../components/SectionHeader';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState<any>(PORTFOLIO.find(p => p.slug === slug));
  const [loading, setLoading] = useState(!project);

  useEffect(() => {
    if (!project && slug) {
      async function fetchDynamicProject() {
        try {
          const { data, error } = await supabase
            .from('portfolio')
            .select('*')
            .eq('id', slug) // Assuming ID is used as slug for dynamic ones
            .single();
          
          if (!error && data) {
            setProject({
              slug: data.id,
              title: data.title,
              client: data.client,
              delivered: new Date(data.created_at).toLocaleDateString(),
              tech: data.tech,
              image: data.image,
              detailedDescription: data.description,
              challenge: "The specific requirements necessitated a highly scalable technical architecture with low latency.",
              solution: "Integrated modular services with Supabase backend for real-time synchronization and secure data handling."
            });
          }
        } catch (err) {
          console.error("Error fetching dynamic project:", err);
        } finally {
          setLoading(false);
        }
      }
      fetchDynamicProject();
    }
  }, [slug, project]);

  if (loading) return <div className="pt-48 text-center text-white"><RefreshCw className="animate-spin text-accent inline mr-2" /> Syncing Node Data...</div>;
  if (!project) return <div className="pt-48 text-center text-white">Record Not Found</div>;

  return (
    <div className="pt-48 pb-24 min-h-screen">
      <div className="container-custom max-w-5xl">
        <Link to="/portfolio" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-accent transition-colors mb-12">
          <ArrowLeft size={16} /> Return to Archives
        </Link>

        <SectionHeader title={project.title} subtitle={`CLIENT: ${project.client}`} centered={false} />

        <div className="rounded-[40px] overflow-hidden border border-foreground/10 shadow-[0_0_50px_rgba(0,0,0,0.05)] dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] mb-16 relative group">
           <img src={project.image} alt={project.title} className="w-full aspect-video object-cover" referrerPolicy="no-referrer" />
           <div className="absolute inset-0 border border-accent/20 rounded-[40px] pointer-events-none" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-12">
             <div>
                <h4 className="text-sm font-black uppercase tracking-[0.3em] text-foreground opacity-60 dark:opacity-40 mb-4">Architecture Synopsis</h4>
                <p className="text-foreground/80 dark:text-gray-300 font-medium leading-relaxed">{project.detailedDescription}</p>
             </div>
             
             <div className="p-8 bg-foreground/5 border border-foreground/10 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-2xl rounded-full" />
                <h4 className="text-sm font-black uppercase tracking-[0.3em] text-foreground opacity-60 dark:opacity-40 mb-4 relative z-10">The Challenge</h4>
                <p className="text-foreground/80 dark:text-gray-300 font-medium leading-relaxed relative z-10">{project.challenge}</p>
             </div>

             <div className="p-8 bg-accent/5 border border-accent/20 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-2xl rounded-full" />
                <h4 className="text-sm font-black uppercase tracking-[0.3em] text-accent mb-4 relative z-10">The Solution</h4>
                <p className="text-foreground/80 dark:text-gray-300 font-medium leading-relaxed relative z-10">{project.solution}</p>
             </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card p-8 rounded-3xl border border-foreground/10 space-y-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 dark:opacity-40 mb-1">Entity</p>
                <p className="font-bold text-foreground uppercase tracking-tight">{project.client}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 dark:opacity-40 mb-1">Stack</p>
                <p className="font-bold text-foreground uppercase tracking-tight">{project.tech}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 dark:opacity-40 mb-1">Deployed</p>
                <p className="font-bold text-foreground uppercase tracking-tight">{project.delivered}</p>
              </div>
            </div>
            
            <Link to="/order" className="w-full btn-bold-secondary py-4 text-xs uppercase tracking-widest text-center block">
              Request Similar Build
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
