import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, ReactNode, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Portfolio from './pages/Portfolio';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import Order from './pages/Order';
import Auth from './pages/Auth';
import AdminDashboard from './pages/AdminDashboard';
import ClientDashboard from './pages/ClientDashboard';
import Invoice from './pages/Invoice';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import CaseStudies from './pages/CaseStudies';
import { supabase } from './lib/supabase';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const PageTransition = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/order" element={<Order />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<ClientDashboard />} />
          <Route path="/invoice/:id" element={<Invoice />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const ThemeProviderAny = ThemeProvider as any;
  return (
    <ThemeProviderAny attribute="class" defaultTheme="dark">
      <Router>
        <AppContent />
      </Router>
    </ThemeProviderAny>
  );
}

function AppContent() {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(`Auth System: Global State Change [${event}]`, session?.user?.email || 'No Active Session');
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen selection:bg-accent selection:text-black transition-colors duration-500 overflow-x-hidden relative">
      <ScrollToTop />
      {/* Persistent High-Tech Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[var(--background)]">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-accent/10 blur-[150px] rounded-full animate-pulse opacity-60 dark:opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-secondary/10 blur-[150px] rounded-full animate-pulse delay-1000 opacity-50 dark:opacity-50" />
        <div className="absolute top-[40%] left-[60%] w-[50%] h-[50%] bg-accent/5 blur-[100px] rounded-full tech-glow opacity-30 dark:opacity-30" />
      </div>

      <Navbar />
      
      <main className="flex-grow z-10 relative pb-20">
        <AnimatedRoutes />
      </main>

      <Footer />
      <WhatsAppButton />
      <Analytics />
    </div>
  );
}
