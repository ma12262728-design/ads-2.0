import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

export default function NotFound() {
  useSEO("Page Not Found - Ammar Digital", "The protocol you requested is offline or does not exist.", "website", "https://ammardigital.shop/og-image.jpg", undefined, true);

  return (
    <div className="min-h-screen pt-32 pb-24 flex items-center justify-center relative overflow-hidden bg-white text-black">
      {/* Visual Accents */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-100 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-100 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl mx-auto p-12 md:p-20 rounded-[40px] border border-gray-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
          
          <div className="w-24 h-24 mx-auto mb-8 bg-red-50 rounded-full flex items-center justify-center border border-red-100 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
             <ShieldAlert size={48} className="text-red-500 animate-pulse" />
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter mb-4 font-mono">
            404
          </h1>
          
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest text-gray-800 mb-6 font-display">
            Protocol Mismatch
          </h2>
          
          <p className="text-gray-500 mb-10 leading-relaxed max-w-md mx-auto uppercase text-sm font-bold tracking-tight">
            The digital endpoint you are trying to access does not exist in our current architecture. It may have been relocated or decommissioned.
          </p>

          <Link to="/" className="inline-flex items-center gap-3 px-8 py-4 bg-gray-100 hover:bg-black hover:text-white border border-gray-200 text-gray-900 font-black tracking-widest text-sm uppercase rounded-full transition-all duration-300 transform hover:scale-105 shadow-md">
            <ArrowLeft size={18} />
            Return to Main Node
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
