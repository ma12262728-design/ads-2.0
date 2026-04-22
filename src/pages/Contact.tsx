import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { supabase } from '../lib/supabase';
import { sendNotificationEmail } from '../lib/email';
import { BUSINESS_INFO } from '../constants/data';

const ContactInfoCard = ({ icon: Icon, title, value, label }: any) => (
  <div className="flex items-start gap-6 p-6 liquid-glass rounded-[32px] group hover:scale-[1.02] transition-all border border-white/5">
    <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent shrink-0 group-hover:bg-accent group-hover:text-black transition-colors shadow-lg shadow-accent/10">
      <Icon size={24} />
    </div>
    <div>
      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 mb-1">{label}</h4>
      <h3 className="text-lg font-black tracking-tight mb-1 dark:text-white">{title}</h3>
      <p className="text-sm font-medium text-gray-text dark:text-gray-400 opacity-80 leading-relaxed uppercase">{value}</p>
    </div>
  </div>
);

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'' | 'submitting' | 'success' | 'error'>('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      // Basic validation
      if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        throw new Error("Invalid email format.");
      }
      if (formData.phone.length < 10) {
        throw new Error("Invalid phone number format.");
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
            message: formData.message,
            _subject: `New Lead from Ammar Digital: ${formData.name}`,
            _template: 'box'
        })
      });

      if (!response.ok) {
        throw new Error("Failed to transmit message. Please contact directly via WhatsApp.");
      }
      
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      setErrorMessage(err.message);
      setStatus('error');
    }
  };

  return (
     <div className="pt-48 pb-24 min-h-screen">
      <div className="container-custom">
        <SectionHeader title="Contact Protocol" subtitle="ESTABLISH A SECURE CONNECTION" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 dark:text-white">Direct Comm Link</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="text" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} placeholder="Name" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-accent outline-none dark:text-white transition-colors" />
              <input type="email" value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} placeholder="Email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-accent outline-none dark:text-white transition-colors" />
              <input type="tel" value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} placeholder="Phone" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-accent outline-none dark:text-white transition-colors" />
              <textarea value={formData.message} onChange={e=>setFormData({...formData, message: e.target.value})} placeholder="Message" required rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-accent outline-none dark:text-white transition-colors"></textarea>
              {errorMessage && <p className="text-red-500 text-xs font-bold">{errorMessage}</p>}
              <button type="submit" disabled={status === 'submitting'} className="btn-bold-primary w-full py-4 uppercase font-black tracking-widest">{status === 'submitting' ? 'Transmitting...' : 'Send Message'}</button>
              {status === 'success' && <p className="text-accent mt-4 font-bold text-sm tracking-widest uppercase">Message received. We will respond shortly.</p>}
            </form>
          </div>
          <div className="space-y-6 pt-16 lg:pt-0 relative">
            <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] bg-accent/10 blur-[120px] rounded-full pointer-events-none z-0" />
            <div className="relative z-10 space-y-6">
              <ContactInfoCard icon={MapPin} title="HQ Frequency" value={BUSINESS_INFO.address} label="Location" />
              <ContactInfoCard icon={Phone} title="Direct Line" value={BUSINESS_INFO.phone} label="Phone" />
              <ContactInfoCard icon={Mail} title="Digital Mail" value={BUSINESS_INFO.email} label="Email" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
