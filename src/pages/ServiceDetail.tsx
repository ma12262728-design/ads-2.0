import { useParams, Link } from 'react-router-dom';
import { SERVICES } from '../constants/data';
import SectionHeader from '../components/SectionHeader';
import { ArrowLeft, CheckCircle2, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = SERVICES.find(s => s.slug === slug);
  const { addToCart, cart } = useCart();

  if (!service) return <div className="pt-48 text-center text-white">Service Protocol Not Found</div>;

  const inCart = cart.includes(service.slug);

  return (
    <div className="pt-48 pb-24 min-h-screen">
      <div className="container-custom max-w-5xl">
        <Link to="/services" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-accent transition-colors mb-12">
          <ArrowLeft size={16} /> Return to Protocols
        </Link>

        <SectionHeader title={service.title} subtitle="CAPABILITY DETAIL" centered={false} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="rounded-[40px] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] mb-8">
              <img src={service.visual} alt={service.title} className="w-full aspect-video object-cover" />
            </div>
            <div className="flex flex-col gap-4">
               <button 
                 onClick={() => addToCart(service.slug)}
                 disabled={inCart}
                 className={`w-full py-5 text-xs tracking-widest uppercase font-black transition-all rounded-xl border flex items-center justify-center gap-3 ${inCart ? 'bg-accent/10 border-accent/20 text-accent/50 cursor-not-allowed' : 'bg-transparent border-accent/50 text-accent hover:bg-accent/10 shadow-[0_0_20px_rgba(0,240,255,0.1)]'}`}
               >
                 <ShoppingCart className="w-5 h-5" />
                 {inCart ? 'Present in Order' : 'Add Capability to Order'}
               </button>
               <Link to="/order" className="w-full btn-bold-primary text-center py-5 text-xs tracking-widest uppercase rounded-xl">
                 Proceed to Checkout
               </Link>
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-accent mb-4">Architecture Overview</h4>
              <p className="text-gray-400 font-medium leading-relaxed">{service.detailedDescription}</p>
            </div>

            <div>
               <h4 className="text-sm font-black uppercase tracking-[0.2em] text-accent mb-6">Core Features</h4>
               <ul className="space-y-4">
                 {service.features.map(f => (
                   <li key={f} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-300">
                     <CheckCircle2 size={16} className="text-accent" /> {f}
                   </li>
                 ))}
               </ul>
            </div>

            <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
               <h4 className="text-sm font-black uppercase tracking-[0.2em] text-secondary mb-6 relative">
                 <span className="relative z-10">Structural Benefits</span>
                 <div className="absolute -left-4 -top-4 w-12 h-12 bg-secondary/20 blur-xl rounded-full" />
               </h4>
               <ul className="space-y-4">
                 {service.benefits.map(b => (
                   <li key={b} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-300">
                     <div className="w-1.5 h-1.5 bg-secondary rounded-full shadow-[0_0_8px_rgba(138,43,226,0.8)]" /> {b}
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
