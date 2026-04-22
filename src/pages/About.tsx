import { motion } from 'motion/react';
import { ShieldCheck, Target, Heart, Zap, Globe, Award } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { BUSINESS_INFO } from '../constants/data';
import { useADSConfig } from '../hooks/useADSConfig';
import { useSEO } from '../hooks/useSEO';

const ValueCard = ({ icon: Icon, title, text }: any) => (
  <div className="liquid-glass p-10 rounded-[40px] space-y-6 group hover:scale-[1.02] transition-all">
    <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors shadow-lg shadow-accent/10">
      <Icon size={28} />
    </div>
    <h3 className="text-2xl font-black uppercase tracking-tighter dark:text-white">{title}</h3>
    <p className="text-gray-text dark:text-gray-400 font-medium leading-relaxed uppercase text-xs tracking-wider opacity-60">{text}</p>
  </div>
);

export default function About() {
  const config = useADSConfig();
  useSEO("About Us - Ammar Digital", "Learn about Muhammad Ammar Shahid, founder of Pakistan's trusted tech entity. Legal FBR verified architecture firm.");
  
  return (
    <div className="pt-48 pb-24 overflow-hidden min-h-screen">
      <div className="container-custom">
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40"
        >
          <motion.div>
            <div className="glass-pill mb-8 inline-block shadow-lg shadow-accent/20 border-accent/20">The Lead Architect</div>
            <h1 className="text-5xl md:text-9xl font-black text-primary dark:text-white leading-[0.88] mb-12 tracking-tighter uppercase font-display italic">
               Systemic <br /> 
               <span className="text-accent underline decoration-accent/10 underline-offset-[20px] decoration-4 not-italic">Innovator</span>
            </h1>
            <p className="text-xl text-gray-text dark:text-gray-400 mb-10 leading-relaxed font-bold uppercase tracking-tight opacity-70">
              {config.aboutText}
            </p>
            <div className="flex gap-12">
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  <h4 className="text-4xl font-black text-accent mb-2">3+</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60 dark:text-white">Active Years</p>
               </motion.div>
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                  <h4 className="text-4xl font-black text-accent mb-2">100%</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60 dark:text-white">FBR Legitimacy</p>
               </motion.div>
            </div>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
             animate={{ opacity: 1, scale: 1, rotate: 0 }}
             transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
             className="relative"
          >
            <div className="absolute inset-0 bg-accent/30 blur-[130px] rounded-full -z-10 pulse-soft" />
            <div className="liquid-glass-high p-4 rounded-[60px] transform transition-all duration-700 shadow-2xl scale-105 float-slow">
               <img 
                 src={BUSINESS_INFO.profilePic}
                 alt="Muhammad Ammar Shahid"
                 className="rounded-[44px] w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                 referrerPolicy="no-referrer"
               />
            </div>
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute -bottom-10 -right-10 liquid-glass-high p-8 rounded-3xl hidden md:block border border-white/20 shadow-2xl"
            >
               <div className="text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-accent mb-2">Verified Principal</p>
                  <h3 className="text-xl font-black uppercase dark:text-white">M. Ammar Shahid</h3>
               </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Founder's Message Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-40"
        >
          <div className="glass-card p-12 md:p-24 rounded-[40px] border border-foreground/10 relative overflow-hidden bg-gradient-to-r from-accent/5 to-transparent">
             <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[100px] rounded-full" />
             <div className="max-w-4xl relative z-10">
                <div className="flex items-center gap-4 text-accent mb-8 font-black tracking-widest uppercase text-sm">
                  <Heart size={24} /> Founder's Vision
                </div>
                <h3 className="text-3xl md:text-5xl font-black mb-8 leading-tight text-foreground tracking-tighter">
                  "Building digital infrastructure isn't just about code. It's about empowering Pakistani businesses to compete on a global scale with uncompromising quality."
                </h3>
                <div className="mt-8 pt-8 border-t border-foreground/10 flex items-center gap-6">
                   <div>
                     <p className="text-xl font-black uppercase tracking-tight text-foreground">Muhammad Ammar Shahid</p>
                     <p className="text-xs font-bold uppercase tracking-widest text-foreground/50 mt-1">Founder & Lead Architect</p>
                   </div>
                </div>
             </div>
          </div>
        </motion.section>

        {/* FBR Registration Detail */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="liquid-glass-high rounded-[60px] p-12 md:p-32 relative overflow-hidden border border-white/30 mb-40"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pulse-soft" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center relative z-10">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 text-accent mb-8 font-black tracking-widest uppercase text-sm">
                <ShieldCheck size={32} className="tech-glow" /> Protocol Transparency
              </div>
              <h2 className="text-4xl md:text-8xl font-black mb-10 italic uppercase tracking-tighter leading-none dark:text-white font-display">
                Certified <span className="text-accent underline decoration-white/20 underline-offset-[24px] not-italic">Identity</span>
              </h2>
              <p className="text-gray-text dark:text-gray-400 text-2xl font-bold uppercase tracking-tight opacity-70 mb-12">
                 Legally authorized digital services under FBR NTN standards.
              </p>
            </div>
            <motion.div 
               whileHover={{ scale: 1.05 }}
               className="liquid-glass-high bg-white/5 border-white/20 p-12 rounded-[48px] backdrop-blur-3xl text-center shadow-2xl"
            >
              <p className="text-[10px] text-accent font-black uppercase tracking-[0.3em] mb-6">Taxpayer Identity</p>
              <p className="text-4xl md:text-5xl font-mono font-black text-primary dark:text-white mb-4 tracking-tighter">{config.ntn === BUSINESS_INFO.ntn ? BUSINESS_INFO.ntnDisplay : config.ntn}</p>
              <div className="h-px w-24 bg-accent/30 mx-auto mb-6" />
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Division: Pakistan Operations</p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeader title="Systemic Values" subtitle="THE FOUNDATION OF DIGITAL ARCHITECTURE" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "Precision Focus", text: "Zero latency engineering across all systemic layers." },
              { icon: Globe, title: "Global Scale", text: "Architecting locally, deploying globally." },
              { icon: Zap, title: "Instant Velocity", text: "Bleeding-edge performance as a default standard." },
              { icon: Heart, title: "Partner Legacy", text: "We construct long-term digital evolution." },
              { icon: ShieldCheck, title: "Total Integrity", text: "Verified legitimacy in every deployment." },
              { icon: Award, title: "Premium Specs", text: "Hand-crafted solutions for elite entities." },
            ].map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ValueCard icon={val.icon} title={val.title} text={val.text} />
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
