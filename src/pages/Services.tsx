import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { SERVICES } from '../constants/data';
import SectionHeader from '../components/SectionHeader';
import * as Icons from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

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

  return (
    <div className="pt-48 pb-24 min-h-screen">
      <div className="container-custom">
        <SectionHeader title="Service Protocols" subtitle="ENGINEERED CAPABILITIES" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const IconComponent = (Icons as any)[service.icon] || Icons.Code;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
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
                <Link
                  to={`/services/${service.slug}`}
                  className="w-full btn-bold-primary py-4 uppercase text-xs text-center tracking-widest mt-auto"
                >
                  Access Protocol
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
