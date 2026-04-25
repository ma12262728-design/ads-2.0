import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, User, Sun, Moon, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";
import { supabase } from "../lib/supabase";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "../context/CartContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [session, setSession] = useState<any>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { cart, setIsCartOpen } = useCart();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const isAdmin = session?.user?.email === "ripperwhite@yahoo.com";

  if (!mounted) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-4" : "py-8"
      }`}
    >
      <div className="container-custom">
        <div
          className={`backdrop-blur-3xl bg-white/20 dark:bg-black/20 rounded-full px-8 py-3 flex justify-between items-center transition-all duration-500 border border-white/30 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)]`}
        >
          <Link to="/" className="flex items-center gap-4 group">
            <div className="bg-gradient-to-r from-accent to-secondary p-2.5 rounded-xl group-hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.3)] border border-white/20">
              <span className="text-white font-black text-xs tracking-tighter mix-blend-overlay">
                ADS
              </span>
            </div>
            <span className="text-xl font-display font-extrabold text-foreground tracking-[-0.04em] uppercase">
              Ammar
              <span className="text-accent underline decoration-accent/50 underline-offset-4 decoration-2 tech-glow">
                Digital
              </span>{" "}
              <span className="hidden sm:inline font-sans font-light opacity-50 tracking-widest text-sm align-middle ml-1">
                SOLUTION
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center bg-foreground/5 rounded-full p-1.5 gap-1 mr-4 border border-foreground/10">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-[10px] font-bold px-5 py-2 rounded-full transition-all duration-300 tracking-[0.2em] uppercase ${
                      isActive
                        ? "bg-foreground/10 text-accent shadow-[0_0_10px_rgba(0,240,255,0.1)] border border-accent/20"
                        : "text-gray-text hover:text-foreground hover:bg-foreground/5"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="flex gap-2 mr-2">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative px-3 py-2 text-foreground hover:text-accent transition-colors rounded-full flex items-center justify-center border border-foreground/10 hover:border-accent/40 bg-foreground/5"
              >
                <ShoppingCart size={16} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(0,240,255,0.5)]">
                    {cart.length}
                  </span>
                )}
              </button>

              {session ? (
                <>
                  <Link
                    to={isAdmin ? "/admin" : "/dashboard"}
                    className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-accent hover:text-foreground transition-colors rounded-full flex items-center gap-2"
                  >
                    <User size={12} /> {isAdmin ? "Admin" : "Dashboard"}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors rounded-full flex items-center gap-2"
                  >
                    <LogOut size={12} /> Exit
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth?mode=signin"
                    className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-text hover:text-accent transition-colors rounded-full flex items-center"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth?mode=signup"
                    className="btn-bold-secondary text-[10px] py-1.5 px-4 font-bold uppercase tracking-widest rounded-full border border-foreground/10 hover:border-accent flex items-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            <Link
              to="/order"
              className={cn(
                buttonVariants({ variant: "liquid", size: "default" }),
                "text-[10px] md:text-xs py-2 md:py-2.5 px-6 md:px-8 uppercase tracking-widest",
              )}
            >
              Initiate Order
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-foreground hover:text-accent transition-colors mr-2"
            >
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(0,240,255,0.5)]">
                  {cart.length}
                </span>
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 text-foreground hover:text-accent transition-colors"
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
            <div
              className={`liquid-glass-high rounded-3xl p-8 flex flex-col gap-6 shadow-2xl border border-white/10 ${theme === "light" ? "bg-white border-black/5 shadow-xl" : ""}`}
            >
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `text-lg font-display font-extrabold uppercase tracking-widest transition-colors duration-300 ${
                      isActive
                        ? "text-accent drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]"
                        : "text-gray-text hover:text-foreground"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="h-px bg-foreground/10 my-2" />
              {session ? (
                <>
                  <Link
                    to={isAdmin ? "/admin" : "/dashboard"}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-display font-extrabold uppercase tracking-widest text-accent flex items-center gap-2"
                  >
                    <User size={20} /> {isAdmin ? "Admin" : "Dashboard"}
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="text-lg font-display font-extrabold uppercase tracking-widest text-red-500 flex items-center gap-2 justify-start"
                  >
                    <LogOut size={20} /> Exit
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth?mode=signin"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-display font-extrabold uppercase tracking-widest text-gray-text hover:text-accent transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth?mode=signup"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-display font-extrabold uppercase tracking-widest text-gray-text hover:text-accent transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
              <Link
                to="/order"
                onClick={() => setIsOpen(false)}
                className="btn-bold-primary text-center py-4 text-sm mt-2"
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
