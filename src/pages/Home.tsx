import { CinematicHero } from '../components/ui/motion-hero';
import { TESTIMONIALS, BUSINESS_INFO } from '../constants/data';
import SectionHeader from '../components/SectionHeader';
import { useADSConfig } from '../hooks/useADSConfig';

export default function Home() {
  const config = useADSConfig();
  // Duplicate array directly to make a seamless infinite marquee
  const doubleTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <>
      <main className="relative w-full z-10 flex flex-col justify-center items-center">
        <CinematicHero />
      </main>
      
      <section className="px-6 md:px-12 py-24 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 max-w-7xl mx-auto">
        <div className="glass-card p-6 md:p-8 flex items-start gap-5 hover:bg-foreground/10 transition-colors shadow-2xl rounded-[32px]">
          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent shrink-0 border border-accent/20">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
            </svg>
          </div>
          <div>
            <h4 className="font-black uppercase tracking-tight text-lg mb-1 text-foreground">Custom Arch</h4>
            <p className="text-[10px] font-bold uppercase opacity-50 tracking-widest text-accent text-accent/80">Zero Latency Engineering</p>
          </div>
        </div>

        <div className="glass-card p-6 md:p-8 flex items-start gap-5 hover:bg-foreground/10 transition-colors shadow-2xl rounded-[32px]">
          <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary shrink-0 border border-secondary/20">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
          </div>
          <div>
            <h4 className="font-black uppercase tracking-tight text-lg mb-1 text-foreground">E-Commerce</h4>
            <p className="text-[10px] font-bold uppercase opacity-50 tracking-widest text-secondary text-secondary/80">Scale Ready Deployment</p>
          </div>
        </div>

        <div className="glass-card p-6 md:p-8 flex flex-col justify-center items-center text-center hover:bg-foreground/10 transition-colors shadow-2xl rounded-[32px]">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-6 h-6 text-accent drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            <span className="font-black uppercase tracking-tighter text-lg text-foreground">FBR Certified</span>
          </div>
          <div className="px-5 py-2 bg-foreground/10 rounded-xl font-mono text-xs text-accent border border-accent/20 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
            NTN: {config.ntn === BUSINESS_INFO.ntn ? BUSINESS_INFO.ntnDisplay : config.ntn}
          </div>
        </div>
      </section>

      {/* Authentic Feedback Section */}
      <section className="w-full py-24 relative bg-[var(--background)]/40 border-t border-foreground/5">
         <div className="container-custom relative z-10 mb-12">
            <SectionHeader title="Entity Verification" subtitle="AUTHENTIC PAKISTANI TESTIMONIALS" />
         </div>
         
         <div className="w-full relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-6 px-4">
              {doubleTestimonials.map((testimonial, i) => (
                <div 
                  key={i} 
                  className="w-[320px] md:w-[400px] shrink-0 glass-card p-6 md:p-8 rounded-3xl hover:border-accent/40 transition-all duration-300 group flex flex-col"
                >
                  <div className="flex gap-1 mb-4 text-accent drop-shadow-[0_0_5px_rgba(0,240,255,0.8)]">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-foreground/70 text-sm font-medium leading-relaxed italic mb-6 flex-grow">"{testimonial.review}"</p>
                  <div className="mt-auto border-t border-foreground/10 pt-4 flex items-center justify-between">
                    <div>
                      <h5 className="text-foreground font-black uppercase text-xs tracking-wider">{testimonial.name}</h5>
                      <p className="text-[10px] text-accent uppercase font-bold tracking-widest">{testimonial.role}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-foreground/10 border border-foreground/20 flex items-center justify-center text-[10px] font-black text-foreground mix-blend-overlay">
                      PK
                    </div>
                  </div>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* Modern Workflow Section */}
      <section className="py-24 bg-[var(--background)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="container-custom">
           <SectionHeader title="Deployment Cycle" subtitle="ENGINEERED TO PERFECTION" />
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Intelligence", desc: "Deep analysis of your business logic and goals." },
                { step: "02", title: "Architecture", desc: "Structuring a high-fidelity code blueprint." },
                { step: "03", title: "Construction", desc: "Modular dev using the latest React standards." },
                { step: "04", title: "Launch", desc: "Zero-latency cloud deployment & monitoring." }
              ].map((item, idx) => (
                <div key={idx} className="glass-card p-8 rounded-3xl hover:border-accent/40 transition-all group">
                   <div className="text-4xl font-black text-foreground/10 group-hover:text-accent/20 mb-4 transition-colors font-mono">{item.step}</div>
                   <h4 className="text-xl font-black uppercase tracking-tight mb-2 text-foreground">{item.title}</h4>
                   <p className="text-sm font-medium text-foreground/40 leading-relaxed uppercase opacity-80">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
    </>
  );
}
