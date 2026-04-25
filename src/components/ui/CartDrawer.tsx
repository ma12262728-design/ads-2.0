import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { SERVICES, TEMPLATES_CATALOG } from '../../constants/data';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { cart, removeFromCart, isCartOpen, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/order');
  };

  const getCartItems = () => {
    return cart.map(slug => {
      const serviceObj = SERVICES.find(s => s.slug === slug);
      if (serviceObj) return { ...serviceObj, type: 'Service', price: null };
      
      const templateObj = TEMPLATES_CATALOG.find(t => t.slug === slug);
      if (templateObj) return { ...templateObj, type: 'Template', price: templateObj.price };

      return { slug, title: slug, type: 'Item', price: null };
    });
  };

  const cartItems = getCartItems();
  const totalPrice = cartItems.reduce((acc, curr) => curr.price ? acc + curr.price : acc, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[99]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-background border-l border-foreground/10 z-[100] flex flex-col shadow-2xl glass-card"
          >
            <div className="flex items-center justify-between p-6 border-b border-foreground/10">
              <div className="flex items-center gap-3 text-accent font-black tracking-widest uppercase text-sm">
                <ShoppingCart className="w-5 h-5" />
                Service Cart
                <span className="bg-accent/20 px-2 py-0.5 rounded-full text-[10px]">{cart.length}</span>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="text-foreground/50 hover:text-foreground transition-colors p-2 rounded-full hover:bg-foreground/5">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-50 space-y-4">
                  <ShoppingCart className="w-12 h-12 mb-2" />
                  <p className="text-xs uppercase tracking-widest font-bold">Your cart is empty</p>
                  <button onClick={() => setIsCartOpen(false)} className="px-4 py-2 text-[10px] border border-foreground/20 rounded uppercase font-bold hover:bg-foreground/5 transition-colors">
                    Explore Services
                  </button>
                </div>
              ) : (
                cartItems.map(item => (
                  <motion.div layout key={item.slug} className="flex flex-col gap-2 p-4 rounded-xl border border-foreground/10 bg-foreground/5 shadow-inner">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-bold">{item.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-[10px] text-foreground/50 uppercase tracking-widest">{item.type}</p>
                          {item.price && (
                             <p className="text-[10px] text-accent font-bold uppercase tracking-widest">PKR {item.price}</p>
                          )}
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.slug)} className="text-red-400 hover:text-red-300 transition-colors p-1 rounded-full hover:bg-red-400/10">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-foreground/10 bg-background space-y-4">
                {totalPrice > 0 && (
                  <div className="flex items-center justify-between font-bold text-sm">
                    <span className="Tracking-widest uppercase">Total</span>
                    <span className="text-accent">PKR {totalPrice}</span>
                  </div>
                )}
                <button onClick={handleCheckout} className="w-full py-4 btn-bold-primary flex items-center justify-center gap-3 text-xs tracking-widest uppercase relative overflow-hidden group rounded-xl">
                  <span className="relative z-10 flex items-center gap-2">
                    Checkout & Deploy <ArrowRight className="w-4 h-4" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
