import { MessageCircle, Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { BUSINESS_INFO } from '../constants/data';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';

export default function WhatsAppButton() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* Liquid Theme Toggle */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className={cn(
          buttonVariants({ variant: "liquid", size: "icon" }), 
          "rounded-full shadow-2xl w-[56px] h-[56px] border border-black/10 dark:border-white/20 bg-white/50 dark:bg-black/30 backdrop-blur-md dark:text-white text-gray-900"
        )}
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </motion.button>
      
      {/* WhatsApp Button */}
      <motion.a
        href={BUSINESS_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <div className="absolute right-full mr-4 bg-white text-gray-800 py-2 px-4 rounded-lg shadow-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block border border-gray-100">
          Hi! How can I help you?
        </div>
        <MessageCircle size={28} fill="currentColor" />
      </motion.a>
    </div>
  );
}
