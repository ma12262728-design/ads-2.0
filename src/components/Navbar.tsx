import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, Lock, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Contact', path: '/contact' },
  { name: 'Order Now', path: '/order' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const isAdmin = session?.user?.email === 'ripperwhite@yahoo.com';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-4' : 'py-8'
      }`}
    >
      <div className="container-custom">
        <div className={`liquid-glass rounded-full px-8 py-3 flex justify-between items-center transition-all duration-500 ${
           scrolled ? 'shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-white/10' : 'border-transparent shadow-none bg-black/40'
        }`}>
          <Link to="/" className="flex items-center gap-4 group">
            <div className="bg-gradient-to-r from-accent to-secondary p-2.5 rounded-xl group-hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.3)] border border-white/20">
              <span className="text-white font-black text-xs tracking-tighter mix-blend-overlay">ADS</span>
            </div>
            <span className="text-xl font-display font-extrabold text-white tracking-[-0.04em] uppercase">
              Ammar<span className="text-accent underline decoration-accent/50 underline-offset-4 decoration-2 tech-glow">Digital</span> <span className="hidden sm:inline font-sans font-light opacity-50 tracking-widest text-sm align-middle ml-1">SOLUTION</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center bg-white/5 rounded-full p-1.5 gap-1 mr-4 border border-white/10">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-[10px] font-bold px-5 py-2 rounded-full transition-all duration-300 tracking-[0.2em] uppercase ${
                      isActive 
                        ? 'bg-white/10 text-accent shadow-[0_0_10px_rgba(0,240,255,0.2)] border border-accent/20' 
                        : 'text-gray-text hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
            
            <div className="flex gap-2 mr-2">
              {session ? (
                <>
                  <Link to={isAdmin ? "/admin" : "/dashboard"} className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-accent hover:text-white transition-colors rounded-full flex items-center gap-2">
                    <User size={12} /> {isAdmin ? 'Admin' : 'Dashboard'}
                  </Link>
                  <button onClick={handleLogout} className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors rounded-full flex items-center gap-2">
                    <LogOut size={12} /> Exit
                  </button>
                </>
              ) : (
                <>
                  <Link to="/auth?mode=signin" className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-text hover:text-accent transition-colors rounded-full flex items-center">
                    Sign In
                  </Link>
                  <Link to="/auth?mode=signup" className="btn-bold-secondary text-[10px] py-1.5 px-4 font-bold uppercase tracking-widest rounded-full border border-white/10 hover:border-accent flex items-center">
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            <Link
              to="/order"
              className="btn-bold-primary text-[10px] md:text-xs py-2 md:py-2.5 px-6 md:px-8 uppercase tracking-widest rounded-full"
            >
              Initiate Order
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleMenu}
              className="p-2 text-primary dark:text-white hover:text-accent transition-colors"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute top-full left-0 right-0 z-40 container-custom mt-2 md:hidden"
          >
            <div className="liquid-glass-high rounded-3xl p-8 flex flex-col gap-6 shadow-2xl border border-white/10">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `text-lg font-display font-extrabold uppercase tracking-widest transition-colors duration-300 ${
                      isActive ? 'text-accent drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]' : 'text-gray-text hover:text-white'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <Link
                to="/order"
                onClick={() => setIsOpen(false)}
                className="btn-bold-primary text-center py-4 text-sm"
              >
                Initiate Order Protocol
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
