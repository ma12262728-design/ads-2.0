import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const templatesList = [
  { id: '1', name: 'Cinematic Hero', description: 'Immersive fullscreen experience with background glows' },
  { id: '2', name: 'Minimal Digital', description: 'Clean, typography-focused layout' },
];

export default function TemplatesPack() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">Premium Templates</h1>
        <p className="text-gray-400">High performance components ready to deploy.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templatesList.map((tpl, i) => (
          <motion.div 
            key={tpl.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group block rounded-2xl border border-foreground/10 bg-foreground/5 overflow-hidden hover:border-accent/50 transition-colors"
          >
            <div className="aspect-video bg-black/50 p-6 flex flex-col items-center justify-center border-b border-foreground/10 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               <span className="text-4xl font-black text-white/20 group-hover:text-accent/50 transition-colors duration-500">#{tpl.id}</span>
            </div>
            
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{tpl.name}</h2>
              <p className="text-sm text-gray-500 mb-6">{tpl.description}</p>
              
              <Link to={`/templates/view?id=${tpl.id}`} className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-accent hover:text-white transition-colors">
                View Demo &rarr;
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
