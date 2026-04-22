import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Clock, CheckCircle } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { SERVICES, BUSINESS_INFO } from '../constants/data';
import { useSEO } from '../hooks/useSEO';

export default function Order() {
  useSEO("Order Now - Ammar Digital", "Initialize your deployment protocol. Hire Pakistan's top tech agency for custom web development and digital solutions.");

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', projectSpecs: ''
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [status, setStatus] = useState<'' | 'submitting' | 'success' | 'error'>('');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleService = (slug: string) => {
    setSelectedServices(prev => 
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      if (selectedServices.length === 0) {
        throw new Error("Please select at least one capability.");
      }

      // Using FormSubmit AJAX API to directly email the owner without backend config
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
            services_requested: selectedServices.join(', '),
            project_specifications: formData.projectSpecs,
            _subject: `New Deployment Request from Ammar Digital: ${formData.name}`,
            _template: 'box'
        })
      });

      if (!response.ok) {
        throw new Error("Failed to transmit order securely. Please contact directly via WhatsApp.");
      }
      
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', projectSpecs: '' });
      setSelectedServices([]);
    } catch (err: any) {
       console.error("Order submission err:", err);
       setStatus('error');
       setErrorMessage(err.message);
    }
  };

  return (
    <div className="pt-48 pb-24 min-h-screen relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none z-0" />
      
      <div className="container-custom max-w-4xl relative z-10">
         <SectionHeader title="Initiate Protocol" subtitle="DEPLOYMENT ORDER" />
         
         <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
         >
            <p className="text-foreground/70 text-lg font-medium max-w-3xl mx-auto leading-relaxed">
              Submit your project specifications for an enterprise-level architectural review. All submissions are protected by end-to-end 256-bit encryption.
            </p>
            <div className="mt-8 mb-4 flex flex-col md:flex-row items-center justify-center gap-4 text-xs font-black uppercase tracking-widest">
               <div className="flex items-center gap-2 text-accent bg-accent/10 px-4 py-2 rounded-full border border-accent/20">
                  <ShieldCheck className="w-4 h-4" /> Secure Pipeline
               </div>
               <div className="flex items-center gap-2 text-foreground/80 bg-foreground/5 px-4 py-2 rounded-full border border-foreground/10">
                  <Clock className="w-4 h-4" /> Operations SLA: 24h
               </div>
               <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Responding in Minutes
               </div>
            </div>
         </motion.div>
         
         <motion.form 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit} 
            className="space-y-12 glass-card p-8 md:p-16 rounded-[40px] border border-foreground/10 shadow-2xl relative overflow-hidden"
         >
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
               <h4 className="text-sm font-black uppercase tracking-[0.3em] text-accent flex items-center gap-2">
                 <span className="bg-accent/20 px-2 py-1 rounded">01</span> Entity Identification
               </h4>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <input required type="text" placeholder="Authorized Representative Name" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-5 py-4 focus:border-accent outline-none text-foreground transition-all shadow-inner" />
                 <input required type="email" placeholder="Corporate Email Address" value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-5 py-4 focus:border-accent outline-none text-foreground transition-all shadow-inner" />
                 <input required type="tel" placeholder="Direct Phone / Mobile Line" value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} className="w-full md:col-span-2 bg-foreground/5 border border-foreground/10 rounded-xl px-5 py-4 focus:border-accent outline-none text-foreground transition-all shadow-inner" />
               </div>
            </div>

            <div className="space-y-6 relative z-10">
               <h4 className="text-sm font-black uppercase tracking-[0.3em] text-accent flex items-center gap-2">
                 <span className="bg-accent/20 px-2 py-1 rounded">02</span> Required Capabilities
               </h4>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {SERVICES.map(s => (
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      key={s.slug} 
                      onClick={() => toggleService(s.slug)}
                      className={`cursor-pointer p-5 rounded-xl border flex items-center justify-center text-center transition-all ${selectedServices.includes(s.slug) ? 'bg-accent/10 border-accent font-black text-accent shadow-[0_0_20px_rgba(0,240,255,0.15)] ring-1 ring-accent/50' : 'bg-[var(--background)] border-foreground/10 text-foreground/50 hover:border-accent/40 hover:text-foreground'}`}
                    >
                       <span className="text-xs uppercase tracking-wider leading-tight">{s.title}</span>
                    </motion.div>
                  ))}
               </div>
            </div>

            <div className="space-y-6 relative z-10">
               <h4 className="text-sm font-black uppercase tracking-[0.3em] text-accent flex items-center gap-2">
                 <span className="bg-accent/20 px-2 py-1 rounded">03</span> Architecture Specs
               </h4>
               <textarea required rows={5} placeholder="Describe the deployment parameters, core requirements, technical stack choices, and expected timeline..." value={formData.projectSpecs} onChange={e=>setFormData({...formData, projectSpecs: e.target.value})} className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-5 py-4 focus:border-accent outline-none text-foreground transition-all shadow-inner resize-none"></textarea>
            </div>

            <div className="pt-6 relative z-10">
               {errorMessage && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs font-bold mb-4 text-center bg-red-500/10 py-3 rounded-lg">{errorMessage}</motion.p>}
               
               <button type="submit" disabled={status === 'submitting'} className="w-full py-5 btn-bold-primary flex items-center justify-center gap-4 text-xs tracking-[0.2em] uppercase relative overflow-hidden group">
                 <span className="relative z-10 flex items-center gap-3">
                     {status === 'submitting' ? (
                        <>Processing Architecture Request <Clock className="w-4 h-4 animate-spin" /></>
                     ) : 'Submit Deployment Order'}
                 </span>
                 <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
               </button>
               
               {status === 'success' && (
                 <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="flex flex-col items-center justify-center mt-6 p-6 bg-accent/5 border border-accent/20 rounded-2xl"
                 >
                    <CheckCircle className="text-accent w-10 h-10 mb-3" />
                    <p className="text-center text-accent font-black uppercase tracking-widest text-sm">Order Logged Successfully.</p>
                    <p className="text-center text-foreground/60 font-bold uppercase tracking-widest text-[10px] mt-2">Our engineers are reviewing your specs. Expect an initial handshake within minutes.</p>
                 </motion.div>
               )}
            </div>
         </motion.form>
      </div>
    </div>
  );
}
