import { motion } from 'motion/react';
import { ArrowRight, Layout, Monitor, Smartphone, Zap, Code, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import { useCart } from '../context/CartContext';

export default function TemplatesPack() {
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();

  const templatesInfo = [
    { name: 'Luxury Fashion', desc: 'Cinematic hero, lookbook, and cart drawer.' },
    { name: 'Tech Gadgets', desc: 'Dark theme, electric blue, glassmorphism.' },
    { name: 'Beauty & Skincare', desc: 'Step selector, drag slider, skin quiz.' },
    { name: 'Organic Grocery', desc: 'Green/yellow palette, filters, deal timers.' },
    { name: 'Streetwear & Sneaker', desc: 'Marquees, drop counts, waitlist forms.' },
    { name: 'Luxury Jewelry', desc: 'Shimmer animations, 360-view simulation.' },
    { name: 'Sports & Fitness', desc: 'Mega-menu, bundle builder, live prices.' },
    { name: 'Kids & Baby', desc: 'Pastel colors, gift finder, age-range filter.' },
    { name: 'Home Decor', desc: 'Room-visualizer, shop-the-look overlay.' },
    { name: 'Perfume & Fragrance', desc: 'Scent quiz, custom kit builder.' },
    { name: 'Watches & Accessories', desc: 'Watch configurator, CSS live previews.' },
    { name: 'Digital Products', desc: 'License tier tables, live preview modals.' },
    { name: 'Pet Products', desc: 'Pet profile creator, subscription box config.' },
    { name: 'Sustainable Eco', desc: 'Impact scores, carbon offset checker.' },
    { name: 'Multi-Vendor', desc: 'Detailed filters, vendor storefront overlay.' },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent mb-6"
          >
            <Zap size={16} />
            <span className="text-sm font-semibold tracking-wider uppercase">Premium Collection</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            15-in-1 E-Commerce <br />
            <span className="gradient-text">Template Pack</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10"
          >
            The ultimate bundle of high-converting, meticulously designed React templates for every niche. Launch your modern digital storefront today.
          </motion.p>
          
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
             <button 
                onClick={() => navigate('/templates/view')}
                className="bg-[var(--card)] border border-[var(--border)] text-foreground font-medium text-lg px-8 py-4 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:border-accent/50 transition-all flex items-center gap-2"
              >
                <Monitor size={20} /> Preview Templates
             </button>
             <button 
                onClick={() => addToCart('template-pack-full')}
                className={`text-black font-bold text-lg px-8 py-4 rounded-full transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)] hover:shadow-[0_0_40px_rgba(var(--accent-rgb),0.5)] ${
                  cart.includes('template-pack-full') ? 'bg-green-500 hover:bg-green-400' : 'bg-accent hover:bg-accent/90'
                }`}
              >
                {cart.includes('template-pack-full') ? (
                  <><CheckCircle2 size={20} /> Added Full Pack</>
                ) : (
                  <><ShoppingCart size={20} /> Buy Full Pack (2999 PKR)</>
                )}
             </button>
          </motion.div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mb-6">
              <Monitor size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Fully Responsive</h3>
            <p className="text-muted-foreground">Flawless design on desktop, tablet, and mobile devices.</p>
          </div>
          <div className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-accent/20 text-accent rounded-2xl flex items-center justify-center mb-6">
              <Code size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Clean React Code</h3>
            <p className="text-muted-foreground">Built with modern React practices, Tailwind CSS, and Framer Motion.</p>
          </div>
          <div className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-green-500/20 text-green-500 rounded-2xl flex items-center justify-center mb-6">
              <ShoppingCart size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">E-Commerce Ready</h3>
            <p className="text-muted-foreground">Includes carts, filters, checkouts, and advanced product viewers.</p>
          </div>
        </div>

        {/* Templates Grid */}
        <div id="templates-grid" className="scroll-mt-32">
          <SectionHeader 
            title="The Template Arsenal" 
            subtitle="15 unique architectures designed for specific industries and use cases." 
            centered={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {templatesInfo.map((template, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={`group relative bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 overflow-hidden transition-colors ${idx < 2 ? 'hover:border-accent/50 cursor-pointer' : ''}`}
                onClick={() => {
                  if (idx < 2) {
                    navigate(`/templates/view?templateId=${idx + 1}&viewMode=single`);
                  }
                }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full -z-10 group-hover:bg-accent/10 transition-colors" />
                <div className="flex justify-between items-start mb-4">
                  <div className="text-accent font-mono text-sm font-bold">
                    {String(idx + 1).padStart(2, '0')}.
                  </div>
                  <div className="text-accent font-bold">499 PKR</div>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{template.name}</h3>
                <p className="text-sm text-muted-foreground">{template.desc}</p>
                
                <div className="mt-4 pt-4 border-t border-[var(--border)] flex flex-col gap-3">
                  {idx < 2 ? (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/templates/view?templateId=${idx + 1}&viewMode=single`);
                      }}
                      className="flex justify-center items-center text-sm font-medium text-foreground group-hover:text-accent transition-colors btn-secondary py-2 rounded-lg"
                    >
                      Live Preview <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <div className="flex justify-center items-center text-sm font-medium text-muted-foreground bg-foreground/5 py-2 rounded-lg border border-foreground/10">
                      Locked Template (Buy to Unlock)
                    </div>
                  )}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(`template-${idx + 1}`);
                    }}
                    className={`flex justify-center items-center text-sm font-bold py-2 rounded-lg transition-colors ${
                      cart.includes(`template-${idx + 1}`) 
                        ? 'bg-green-500/20 text-green-500' 
                        : 'bg-accent/10 text-accent hover:bg-accent/20'
                    }`}
                  >
                    {cart.includes(`template-${idx + 1}`) ? (
                      <><CheckCircle2 size={16} className="mr-2" /> Added to Cart</>
                    ) : (
                      <><ShoppingCart size={16} className="mr-2" /> Add to Cart</>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-32 text-center bg-gradient-to-b from-[var(--card)] to-[var(--background)] border border-[var(--border)] rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">Ready to build your next store?</h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto relative z-10">
            Get instant access to all 15 templates and start building high-performance e-commerce experiences today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 relative z-10">
            <button 
               onClick={() => addToCart('template-pack-full')}
               className={`text-black font-bold text-lg px-10 py-5 rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)] flex items-center gap-2 ${
                 cart.includes('template-pack-full') ? 'bg-green-500' : 'bg-accent'
               }`}
             >
               {cart.includes('template-pack-full') ? (
                 <><CheckCircle2 className="mb-0.5" /> Pack Added to Cart</>
               ) : (
                 <><ShoppingCart className="mb-0.5" /> Buy Full Pack for 2999 PKR</>
               )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
