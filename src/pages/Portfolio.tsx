import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PORTFOLIO } from '../constants/data';
import SectionHeader from '../components/SectionHeader';
import { supabase } from '../lib/supabase';
import { RefreshCw } from 'lucide-react';

export default function Portfolio() {
  const [dynamicPortfolio, setDynamicPortfolio] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const { data, error } = await supabase
          .from('portfolio')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (!error && data) {
          // Map dynamic data to match the structure expected by the UI
          const mappedData = data.map(item => ({
            slug: item.slug || item.id,
            title: item.title,
            client: item.client,
            delivered: item.delivered || new Date(item.created_at).toLocaleDateString(),
            tech: item.tech,
            image: item.image,
            detailedDescription: item.description,
            isDynamic: true
          }));
          setDynamicPortfolio(mappedData);
        }
      } catch (err) {
        console.error("Failed to fetch dynamic portfolio:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPortfolio();
  }, []);

  const allProjects = [...dynamicPortfolio, ...PORTFOLIO];

  return (
    <div className="pt-48 pb-24 min-h-screen">
      <div className="container-custom">
        <SectionHeader title="Deployment Log" subtitle="ARCHIVE OF EXCELLENCE" />
        
        {loading && (
          <div className="flex justify-center mb-12">
            <RefreshCw className="animate-spin text-accent" size={32} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {allProjects.map((project, index) => (
            <Link
              key={project.slug || index}
              to={project.isDynamic ? `/portfolio/${project.slug}` : `/portfolio/${project.slug}`}
              className="group block relative rounded-[40px] overflow-hidden border border-white/10"
            >
              <div className="absolute inset-0 bg-black/60 group-hover:bg-transparent transition-colors z-10 duration-500" />
              <img 
                src={project.image} 
                className="w-full aspect-[4/3] object-cover transform group-hover:scale-105 transition-transform duration-700 blur-[2px] group-hover:blur-0" 
                alt={project.title} 
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 bg-gradient-to-t from-black via-black/80 to-transparent">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-2">{project.client}</p>
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-2">{project.title}</h3>
                  <div className="flex gap-2 items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                     <span className="text-[9px] font-bold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/20 text-white backdrop-blur-md">
                       {project.tech}
                     </span>
                     {project.isDynamic && (
                       <span className="text-[8px] font-bold uppercase tracking-widest bg-accent/20 text-accent px-2 py-0.5 rounded-md border border-accent/30">
                         Newly Uploaded
                       </span>
                     )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
