import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

type CartContextType = {
  cart: string[]; // array of service slugs
  addToCart: (slug: string) => void;
  removeFromCart: (slug: string) => void;
  toggleCartItem: (slug: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ammar_digital_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('ammar_digital_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const addToCart = (slug: string) => {
    if (!cart.includes(slug)) {
      setCart((prev) => [...prev, slug]);
      toast.success(`Service Added`);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (slug: string) => {
    setCart((prev) => prev.filter((item) => item !== slug));
    toast.info(`Service Removed`);
  };

  const toggleCartItem = (slug: string) => {
    setCart((prev) => {
      if (prev.includes(slug)) {
        toast.info(`Service Removed`);
        return prev.filter(s => s !== slug);
      } else {
        toast.success(`Service Added`);
        return [...prev, slug];
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, toggleCartItem, clearCart, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
