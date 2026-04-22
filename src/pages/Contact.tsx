import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Clock, ShieldCheck, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import SectionHeader from '../components/SectionHeader';
import { BUSINESS_INFO } from '../constants/data';
import { useSEO } from '../hooks/useSEO';

const ContactInfoCard = ({ icon: Icon, title, value, label }: any) => (
  <div className="flex items-start gap-6 p-6 glass-card rounded-[32px] group hover:scale-[1.02] transition-all border border-foreground/5 shadow-xl hover:border-accent/30">
    <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent shrink-0 group-hover:bg-accent group-hover:text-black transition-colors shadow-lg shadow-accent/10">
      <Icon size={24} />
    </div>
    <div>
      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-1">{label}</h4>
      <h3 className="text-lg font-black tracking-tight mb-1">{title}</h3>
      <p className="text-sm font-medium text-foreground/60 leading-relaxed uppercase">{value}</p>
    </div>
  </div>
);

export default function Contact() {
  useSEO("Contact Us - Ammar Digital", "Get in touch with Pakistan's premier digital architecture firm. Priority SLA and enterprise secure communications.");

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'' | 'submitting' | 'success' | 'error'>('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        throw new Error("Invalid email format.");
      }
      if (formData.phone.length < 10) {
        throw new Error("Invalid phone number format.");
      }

      const response = await fetch(`https://formsubmit.co/ajax/${BUSINESS_INFO.email}`, {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            _subject: `Enterprise Lead via Ammar Digital: ${formData.name}`,
            _template: 'box'
        })
      });

      if (!response.ok) {
        throw new Error("Transmission failed structure due to endpoint protection. Try WhatsApp.");
      }
      
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      setErrorMessage(err.message);
      setStatus('error');
    }
  };

  return (
     <div className="pt-48 pb-24 min-h-screen relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 blur-[150px] rounded-full pointer-events-none z-0" />
      
      <div className="container-custom relative z-10">
        <SectionHeader title="Global Communications" subtitle="SECURE ENTERPRISE CONNECTION" />
        
        {/* Enterprise SLA Notice */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 bg-accent/5 border border-accent/20 rounded-[32px] p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-8 shadow-[0_0_40px_rgba(0,240,255,0.05)]"
        >
          <div className="w-16 h-16 shrink-0 bg-accent/10 rounded-full flex items-center justify-center relative">
            <div className="absolute inset-0 border-2 border-accent/40 rounded-full animate-ping opacity-20" />
            <Globe className="text-accent w-8 h-8 animate-[spin_10s_linear_infinite]" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <h3 className="text-xl font-black uppercase tracking-widest text-foreground">Priority SLA Pipeline</h3>
              <span className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Channel Active
              </span>
            </div>
            <p className="text-foreground/70 font-medium leading-relaxed max-w-3xl">
              All enterprise correspondence is protected with end-to-end transport layer security. Our standard Service Level Agreement (SLA) guarantees an official response within <strong className="text-accent font-bold">24 hours</strong>. However, due to our synchronized zero-latency operational framework, our account managers typically acknowledge transmissions within <strong className="text-accent font-bold">minutes</strong>.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
               <ShieldCheck className="text-accent w-6 h-6" />
               <h3 className="text-3xl font-black uppercase tracking-tighter">Direct Comm Link</h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="text" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} placeholder="Authorized Representative Name" required className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-5 py-4 focus:border-accent outline-none text-foreground transition-colors shadow-inner" />
              <input type="email" value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} placeholder="Corporate Email Address" required className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-5 py-4 focus:border-accent outline-none text-foreground transition-colors shadow-inner" />
              <input type="tel" value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} placeholder="Direct Phone / Mobile Line" required className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-5 py-4 focus:border-accent outline-none text-foreground transition-colors shadow-inner" />
              <textarea value={formData.message} onChange={e=>setFormData({...formData, message: e.target.value})} placeholder="Enter brief project overview, technical requirements, or inquiry..." required rows={5} className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-5 py-4 focus:border-accent outline-none text-foreground transition-colors shadow-inner resize-none"></textarea>
              
              {errorMessage && <p className="text-red-500 text-xs font-bold text-center bg-red-500/10 p-3 rounded-lg">{errorMessage}</p>}
              
              <button type="submit" disabled={status === 'submitting'} className="btn-bold-primary w-full py-5 uppercase font-black tracking-widest overflow-hidden relative group">
                <span className="relative z-10 flex items-center justify-center gap-3">
                    {status === 'submitting' ? (
                        <>Encrypting & Transmitting <Clock className="w-4 h-4 animate-spin" /></>
                    ) : 'Initialize Secure Transmission'}
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
              </button>
              
              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="bg-accent/10 border border-accent/20 p-4 rounded-xl text-center mt-4"
                >
                    <p className="text-accent font-black text-sm tracking-widest uppercase">Payload Received Successfully.</p>
                    <p className="text-xs text-foreground/50 mt-1 uppercase font-bold tracking-wider">Awaiting rapid engineering response.</p>
                </motion.div>
              )}
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 pt-0 lg:pt-14 relative"
          >
            <div className="relative z-10 space-y-6">
              <ContactInfoCard icon={MapPin} title="Global HQ" value={BUSINESS_INFO.address} label="Physical Node" />
              <ContactInfoCard icon={Phone} title="Priority Direct Line" value={BUSINESS_INFO.phone} label="Voice Channel" />
              <ContactInfoCard icon={Mail} title="Encrypted Digital Mail" value={BUSINESS_INFO.email} label="Async Comm" />
            </div>
            
            {/* High-Tech decorative element */}
            <div className="mt-12 p-8 rounded-[32px] border border-foreground/5 bg-[var(--background)] flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent mb-6" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 text-center relative z-10">
                    System Environment Secured via 256-Bit SSL/TLS.
                </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
