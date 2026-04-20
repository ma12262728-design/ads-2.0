import { motion } from 'motion/react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({ title, subtitle, centered = true, light = false }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-20 ${centered ? 'text-center' : 'text-left'}`}
    >
      {subtitle && (
        <span className={`block text-[10px] font-black uppercase tracking-[0.4em] mb-6 animate-pulse ${
          light ? 'text-accent' : 'text-accent'
        }`}>
          {subtitle}
        </span>
      )}
      <h2 className={`text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6 font-display ${
        light ? 'text-white' : 'text-primary dark:text-white'
      }`}>
        {title}
      </h2>
      <div className={`h-1.5 w-24 bg-accent rounded-full mb-10 ${centered ? 'mx-auto' : ''}`} />
    </motion.div>
  );
}
