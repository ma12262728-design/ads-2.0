import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { BUSINESS_INFO } from '../constants/data';

export default function WhatsAppButton() {
  return (
    <motion.a
      href={BUSINESS_INFO.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <div className="absolute right-full mr-4 bg-white text-gray-800 py-2 px-4 rounded-lg shadow-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block border border-gray-100">
        Hi! How can I help you?
      </div>
      <MessageCircle size={28} fill="currentColor" />
    </motion.a>
  );
}
