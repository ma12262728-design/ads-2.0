import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { sendNotificationEmail } from '../lib/email';
import SectionHeader from '../components/SectionHeader';
import { SERVICES } from '../constants/data';

export default function Order() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', projectSpecs: ''
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [status, setStatus] = useState<'' | 'submitting' | 'success' | 'error'>('');

  const toggleService = (slug: string) => {
    setSelectedServices(prev => 
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
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
      const columnSet = 'id, name, email, phone, project_specs, selected_services, status, created_at';
      const { error } = await supabase.from('orders').insert([{
        name: formData.name, email: formData.email, phone: formData.phone,
        project_specs: formData.projectSpecs,
        selected_services: selectedServices,
        status: 'pending', created_at: new Date().toISOString()
      }]).select(columnSet);
      
      if (error) throw error;
      
      await sendNotificationEmail({ ...formData, services: selectedServices.join(', ') });
      setStatus('success');
    } catch (err) {
       console.error("Order submission err:", err);
       setStatus('error');
    }
  };

  return (
    <div className="pt-48 pb-24 min-h-screen">
      <div className="container-custom max-w-4xl">
         <SectionHeader title="Initiate Protocol" subtitle="DEPLOYMENT ORDER" />
         
         <form onSubmit={handleSubmit} className="space-y-12 bg-white/5 p-8 md:p-16 rounded-[40px] border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
               <h4 className="text-sm font-black uppercase tracking-[0.3em] text-accent">1. Entity Identification</h4>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <input required type="text" placeholder="Full Name" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 focus:border-accent outline-none text-white transition-colors" />
                 <input required type="email" placeholder="Email Address" value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 focus:border-accent outline-none text-white transition-colors" />
                 <input required type="tel" placeholder="Phone Number" value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} className="w-full md:col-span-2 bg-black/40 border border-white/10 rounded-xl px-5 py-4 focus:border-accent outline-none text-white transition-colors" />
               </div>
            </div>

            <div className="space-y-6 relative z-10">
               <h4 className="text-sm font-black uppercase tracking-[0.3em] text-accent">2. Required Capabilities</h4>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {SERVICES.map(s => (
                    <div 
                      key={s.slug} 
                      onClick={() => toggleService(s.slug)}
                      className={`cursor-pointer p-4 rounded-xl border text-center transition-all ${selectedServices.includes(s.slug) ? 'bg-accent/20 border-accent font-bold text-accent' : 'bg-black/40 border-white/10 text-gray-400 hover:border-white/30'}`}
                    >
                       <span className="text-xs uppercase tracking-wider">{s.title.split(' ')[0]} {s.title.split(' ').pop()}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="space-y-6 relative z-10">
               <h4 className="text-sm font-black uppercase tracking-[0.3em] text-accent">3. Architecture Specs</h4>
               <textarea required rows={5} placeholder="Describe the deployment parameters, core requirements, and timeline..." value={formData.projectSpecs} onChange={e=>setFormData({...formData, projectSpecs: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 focus:border-accent outline-none text-white transition-colors"></textarea>
            </div>

            <div className="pt-6 relative z-10">
               <button type="submit" disabled={status === 'submitting'} className="w-full py-5 btn-bold-primary flex items-center justify-center gap-4 text-xs tracking-[0.2em] uppercase">
                 {status === 'submitting' ? 'Transmitting Data...' : 'Submit Order Protocol'}
               </button>
               {status === 'success' && <p className="text-center mt-6 text-accent font-black uppercase tracking-widest text-xs">Order Confirmed. Awaiting processing.</p>}
            </div>
         </form>
      </div>
    </div>
  );
}
