import React from 'react';
import { motion } from 'motion/react';
import { Share2, Heart, MessageCircle } from 'lucide-react';

export default function Template1() {
  return (
    <div className="w-full h-full min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full z-10 flex flex-col items-center text-center"
      >
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase font-display bg-clip-text text-transparent bg-gradient-to-r from-accent to-purple-500">
          Digital Evolution
        </h1>
        <p className="text-xl md:text-3xl text-gray-400 font-light mb-12 max-w-2xl">
          Transforming ideas into zero-latency experiences. Built for the modern web.
        </p>
        
        <div className="flex gap-6">
          <button className="px-8 py-4 bg-accent text-black font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform">
            Get Started
          </button>
          <button className="px-8 py-4 border border-white/20 hover:border-accent text-white font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform flex items-center gap-2">
            <Heart size={20} /> Like
          </button>
        </div>
      </motion.div>
    </div>
  );
}
