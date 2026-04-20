import { Mail, Phone, MapPin, Linkedin, Facebook, Twitter, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BUSINESS_INFO } from '../constants/data';
import { useADSConfig } from '../hooks/useADSConfig';

export default function Footer() {
  const config = useADSConfig();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--background)] text-foreground pt-32 pb-16 relative overflow-hidden transition-colors border-t border-foreground/5">
      {/* Visual accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
      <div className="absolute -bottom-24 left-10 w-96 h-96 bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand Info */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-2xl font-black uppercase tracking-tighter text-foreground">
                Ammar<span className="text-accent underline decoration-accent/20 underline-offset-4">Digital</span>
              </span>
            </Link>
            <p className="text-foreground/40 text-sm font-bold uppercase tracking-tight leading-relaxed">
              Mandi Bahauddin's premier digital architecture firm. Specializing in high-fidelity custom web engineering and strategic digital expansion.
            </p>
            <div className="flex gap-4">
              {[Linkedin, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center hover:bg-accent hover:text-black hover:border-accent transition-all duration-300 shadow-xl text-foreground"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-10">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-accent">Navigation</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-foreground/50">
              {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((link) => (
                <li key={link}>
                  <Link to={link === 'Home' ? '/' : `/${link.toLowerCase()}`} className="hover:text-accent transition-colors flex items-center gap-2 group">
                    <span className="w-0 h-0.5 bg-accent transition-all group-hover:w-3" /> {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-accent">HQ Frequency</h4>
            <ul className="space-y-6 text-xs text-foreground/50 font-bold uppercase tracking-widest">
              <li className="flex items-start gap-4">
                <MapPin className="text-accent mt-0.5 shrink-0" size={18} />
                <span className="leading-relaxed opacity-70">{config.address}</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-accent shrink-0" size={18} />
                <span className="opacity-70">{config.phone}</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-accent shrink-0" size={18} />
                <span className="opacity-70 lowercase">{config.email}</span>
              </li>
            </ul>
          </div>

          {/* Registration */}
          <div className="glass-card p-8 rounded-[40px] space-y-8 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center text-accent">
                <ShieldCheck size={24} />
              </div>
              <h4 className="font-black text-foreground uppercase tracking-tighter">FBR Certified</h4>
            </div>
            <p className="text-[10px] text-foreground/40 leading-relaxed font-black uppercase tracking-widest opacity-60">
              Sole Proprietorship verified by Federal Board of Revenue, Pakistan.
            </p>
            <div className="pt-2">
              <span className="text-[9px] text-accent/60 block uppercase font-black tracking-[0.3em] mb-3">Verification ID</span>
              <div className="bg-foreground/10 border border-foreground/10 px-4 py-3 rounded-xl font-mono text-xs font-black tracking-widest text-center shadow-inner text-foreground">
                 {config.ntn === BUSINESS_INFO.ntn ? BUSINESS_INFO.ntnDisplay : config.ntn}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-16 border-t border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30">
          <p>© {currentYear} {BUSINESS_INFO.name} Protocols. Mandi Bahauddin Division.</p>
          <div className="flex gap-12">
            <Link to="#" className="hover:text-accent transition-colors">Privacy Cloud</Link>
            <Link to="#" className="hover:text-accent transition-colors">Service Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
