import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

export default function NotFound() {
  useSEO("Page Not Found - Ammar Digital", "The protocol you requested is offline or does not exist.");

  return (
    <div className="min-h-screen pt-32 pb-24 flex items-center justify-center relative overflow-hidden bg-[var(--background)]">
      {/* Visual Accents */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass-card max-w-2xl mx-auto p-12 md:p-20 rounded-[40px] border border-red-500/10 shadow-[0_0_50px_rgba(239,68,68,0.05)] relative overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
          
          <div className="w-24 h-24 mx-auto mb-8 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
             <ShieldAlert size={48} className="text-red-500 animate-pulse" />
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-foreground tracking-tighter mb-4 font-mono">
            404
          </h1>
          
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest text-foreground/80 mb-6 font-display">
            Protocol Mismatch
          </h2>
          
          <p className="text-foreground/60 mb-10 leading-relaxed max-w-md mx-auto uppercase text-sm font-bold tracking-tight">
            The digital endpoint you are trying to access does not exist in our current architecture. It may have been relocated or decommissioned.
          </p>

          <Link to="/" className="inline-flex items-center gap-3 px-8 py-4 bg-foreground/5 hover:bg-accent hover:text-black border border-foreground/10 hover:border-accent text-foreground font-black tracking-widest text-sm uppercase rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl">
            <ArrowLeft size={18} />
            Return to Main Node
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
