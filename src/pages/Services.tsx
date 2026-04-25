import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../constants/data';
import SectionHeader from '../components/SectionHeader';
import * as Icons from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Search } from 'lucide-react';

export default function Services() {
  useSEO(
    "Digital Services - Ammar Digital", 
    "Explore our premium digital services including Custom UI/UX, E-Commerce Development, API Integration, and Cloud Hosting in Pakistan.",
    "website",
    "https://ammardigital.shop/og-image.jpg",
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Web Development",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Ammar Digital Solution",
        "url": "https://ammardigital.shop/"
      },
      "areaServed": "PK"
    }
  );

  const { addToCart, cart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = SERVICES.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-48 pb-24 min-h-screen">
      <div className="container-custom">
        <SectionHeader title="Service Protocols" subtitle="ENGINEERED CAPABILITIES" />

        <div className="max-w-xl mx-auto mb-16 relative">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-foreground/40" />
          </div>
          <input
            type="text"
            placeholder="SEARCH CAPABILITIES..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-foreground/5 border border-foreground/10 rounded-full py-4 pl-14 pr-6 focus:border-accent outline-none text-foreground text-xs uppercase tracking-widest font-bold shadow-inner transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredServices.map((service, index) => {
              const IconComponent = (Icons as any)[service.icon] || Icons.Code;
              const inCart = cart.includes(service.slug);
              return (
                <motion.div
                  key={service.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="liquid-glass border border-white/5 rounded-[32px] p-8 hover:bg-white/5 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform shadow-2xl">
                      <IconComponent size={28} className="drop-shadow-[0_0_10px_rgba(0,240,255,0.3)]" />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tighter dark:text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-xs uppercase tracking-widest leading-relaxed text-gray-500 font-bold mb-8">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 mt-auto">
                    <Link
                      to={`/services/${service.slug}`}
                      className="w-full btn-bold-primary py-3 uppercase text-xs text-center tracking-widest"
                    >
                      Access Protocol
                    </Link>
                    <button
                      onClick={() => addToCart(service.slug)}
                      disabled={inCart}
                      className={`w-full py-3 text-xs tracking-widest uppercase font-black transition-all rounded-xl border flex items-center justify-center gap-2 ${inCart ? 'bg-accent/10 border-accent/20 text-accent/50 cursor-not-allowed' : 'bg-[var(--background)] border-foreground/10 text-foreground hover:border-accent hover:text-accent'}`}
                    >
                       <ShoppingCart className="w-4 h-4" />
                       {inCart ? 'In Order' : 'Add to Order'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          {filteredServices.length === 0 && (
            <div className="col-span-full py-12 text-center text-foreground/50 font-bold uppercase tracking-widest text-sm">
              No matching capabilities found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
