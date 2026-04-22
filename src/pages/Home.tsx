import { CinematicHero } from '../components/ui/motion-hero';
import { TESTIMONIALS, BUSINESS_INFO } from '../constants/data';
import SectionHeader from '../components/SectionHeader';
import { useADSConfig } from '../hooks/useADSConfig';
import { Link } from 'react-router-dom';

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
            <p className="text-[10px] font-bold uppercase opacity-50 tracking-widest text-accent/80">Zero Latency Engineering</p>
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

      {/* 1. Tech Stack Marquee */}
      <section className="py-10 border-y border-foreground/5 bg-foreground/[0.02] overflow-hidden flex items-center">
         <div className="animate-marquee flex gap-16 px-6 items-center w-max">
            {['React', 'Next.js', 'Node.js', 'TypeScript', 'TailwindCSS', 'AWS', 'Python', 'Figma', 'Docker', 'GraphQL', 'React', 'Next.js', 'Node.js', 'TypeScript', 'TailwindCSS', 'AWS', 'Python', 'Figma', 'Docker', 'GraphQL'].map((tech, i) => (
                <span key={i} className="text-xl md:text-2xl font-black uppercase text-foreground/20 font-mono tracking-widest">{tech}</span>
            ))}
         </div>
      </section>

      {/* 2. Services Overview */}
      <section className="py-24 relative container-custom">
          <SectionHeader title="Core Services" subtitle="WHAT WE DO BEST" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                  { title: "Web Architecture", desc: "High-performance React & Next.js web applications tailored for speed.", icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" },
                  { title: "E-Commerce", desc: "Conversion-optimized Shopify and custom scalable stores.", icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" },
                  { title: "UI/UX Engineering", desc: "Pixel-perfect, modern designs that captivate and convert.", icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" },
                  { title: "Custom APIs", desc: "Robust backend infrastructure, cloud databases, and API development.", icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }
              ].map((service, idx) => (
                  <div key={idx} className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group">
                      <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6 border border-accent/20 group-hover:scale-110 transition-transform">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                          </svg>
                      </div>
                      <h3 className="font-black text-foreground tracking-tight text-xl mb-3 uppercase">{service.title}</h3>
                      <p className="text-foreground/50 text-sm font-medium leading-relaxed">{service.desc}</p>
                  </div>
              ))}
          </div>
      </section>

      {/* 3. Featured Portfolio */}
      <section className="py-24 relative bg-[var(--background)]/40 border-y border-foreground/5">
          <div className="container-custom">
              <SectionHeader title="Featured Works" subtitle="RECENT DEPLOYMENTS" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                      { 
                        title: "Fintech Dashboard", 
                        category: "Web Application", 
                        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                      },
                      { 
                        title: "Luxury E-Commerce", 
                        category: "Shopping Platform", 
                        image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop"
                      }
                  ].map((project, idx) => (
                      <div key={idx} className="glass-card rounded-[32px] overflow-hidden group cursor-pointer relative p-2 outline outline-1 outline-foreground/10 hover:outline-accent/50 transition-all bg-background/50">
                         <div className="w-full h-64 md:h-80 rounded-[28px] relative overflow-hidden flex flex-col items-center justify-center">
                            {/* Graphic Images */}
                            <img 
                              src={project.image} 
                              alt={project.title} 
                              referrerPolicy="no-referrer"
                              className="absolute inset-0 w-full h-full object-cover object-center opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-in-out mix-blend-luminosity group-hover:mix-blend-normal"
                            />
                            {/* Inner Overlays */}
                            <div className="absolute inset-0 bg-background/50 group-hover:bg-transparent transition-colors duration-700 z-10 mix-blend-multiply"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10 pointer-events-none"></div>
                            
                            {/* Centered Graphic Icon - Tech vibe */}
                            <svg className="w-16 h-16 text-foreground/70 mb-4 group-hover:text-accent group-hover:-translate-y-2 relative z-20 transition-all duration-500 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={idx === 0 ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" : "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"}></path>
                            </svg>
                            <span className="font-mono text-foreground uppercase tracking-widest font-black text-2xl group-hover:scale-105 relative z-20 transition-all duration-500 text-shadow-xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] opacity-90 group-hover:opacity-100">{project.title}</span>
                         </div>
                         <div className="p-6 pb-4 relative z-20">
                             <p className="text-xs text-accent font-bold uppercase tracking-widest mb-1">{project.category}</p>
                             <div className="flex justify-between items-center">
                                 <h3 className="text-2xl font-black text-foreground uppercase tracking-tight">{project.title}</h3>
                                 <div className="w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                                   <svg className="w-5 h-5 text-foreground group-hover:text-background transition-colors -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                   </svg>
                                 </div>
                             </div>
                         </div>
                      </div>
                  ))}
              </div>
              <div className="mt-12 text-center">
                  <Link to="/portfolio" className="inline-flex items-center gap-2 px-8 py-4 glass-card text-foreground font-black tracking-widest uppercase rounded-full hover:bg-foreground hover:text-background transition-colors hover:shadow-xl">
                      View Full Portfolio
                  </Link>
              </div>
          </div>
      </section>

      {/* Authentic Feedback Section */}
      <section className="w-full py-24 relative bg-[var(--background)] border-b border-foreground/5">
         <div className="container-custom relative z-10 mb-12">
            <SectionHeader title="Entity Verification" subtitle="AUTHENTIC PAKISTANI TESTIMONIALS" />
         </div>
         
         <div className="w-full relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-6 px-4">
              {doubleTestimonials.map((testimonial, i) => (
                <div 
                  key={i} 
                  className="w-[280px] md:w-[400px] shrink-0 glass-card p-6 md:p-8 rounded-3xl hover:border-accent/40 transition-all duration-300 group flex flex-col"
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
                      <p className="text-[10px] text-accent uppercase font-bold tracking-widest leading-tight">
                        {testimonial.role}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-[10px] font-black text-accent shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                        PK
                      </div>
                      <span className="text-[8px] uppercase tracking-widest font-bold opacity-40">Verified</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* Modern Workflow Section */}
      <section className="py-24 bg-[var(--background)]/40 relative overflow-hidden">
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

      {/* 4. Final CTA */}
      <section className="py-32 relative border-t border-foreground/5 bg-foreground/[0.01]">
         <div className="absolute inset-0 bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
         <div className="container-custom relative z-10 text-center">
             <div className="glass-card md:w-3/4 mx-auto p-10 md:p-20 rounded-[3rem] border border-accent/20 shadow-[0_0_50px_rgba(0,240,255,0.05)] relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 blur-[80px] rounded-full pointer-events-none" />
                 <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter uppercase mb-6 relative z-10">
                     Ready to Scale <br className="hidden md:block"/> <span className="text-accent drop-shadow-[0_0_10px_rgba(0,240,255,0.4)]">Your Business?</span>
                 </h2>
                 <p className="text-foreground/60 max-w-xl mx-auto mb-10 md:text-lg font-medium leading-relaxed relative z-10">
                     Let's build a high-performance digital asset that converts visitors into loyal customers. No fluff, just pure engineering.
                 </p>
                 <Link to="/contact" className="relative z-10 inline-flex items-center gap-3 px-8 py-5 bg-accent text-background font-black tracking-widest text-sm uppercase rounded-full hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:scale-105 transition-all duration-300">
                     Start Your Project
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                     </svg>
                 </Link>
             </div>
         </div>
      </section>
    </>
  );
}
