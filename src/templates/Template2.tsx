import React from 'react';
import { motion } from 'motion/react';

export default function Template2() {
  return (
    <div className="w-full h-full min-h-screen bg-white text-black flex items-center justify-center p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-3xl"
      >
        <h1 className="text-5xl md:text-7xl font-sans font-medium tracking-tight mb-8">
          Minimalism is not a lack of something. It's simply the perfect amount of something.
        </h1>
        <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">
          — Ammar Digital Design
        </p>
      </motion.div>
    </div>
  );
}
