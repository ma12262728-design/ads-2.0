import { motion } from 'motion/react';
import SectionHeader from '../components/SectionHeader';
import { BUSINESS_INFO } from '../constants/data';
import { ShieldAlert } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="pt-48 pb-24 min-h-screen relative overflow-hidden">
      <div className="absolute top-0 right-[-10%] w-[50%] h-[50%] bg-accent/5 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="container-custom relative z-10">
        <SectionHeader title="Privacy Protocol" subtitle="DATA PROTECTION POLICY" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-card p-8 md:p-16 rounded-[40px] prose dark:prose-invert max-w-none text-foreground/80 border border-foreground/10"
        >
          <div className="flex items-center gap-4 mb-8 text-accent font-black tracking-widest uppercase text-sm bg-accent/10 w-max px-6 py-3 rounded-xl border border-accent/20">
            <ShieldAlert size={20} /> FBR Certified Entity
          </div>

          <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 text-foreground">1. Data Collection & Usage</h2>
          <p className="mb-8 leading-relaxed">
            Welcome to {BUSINESS_INFO.name}. As a registered IT entity in Pakistan (NTN: {BUSINESS_INFO.ntnDisplay}), we take your privacy seriously. We collect minimal information required to deliver our software development, e-commerce, and consultancy services. This includes your name, email, phone number, and project details provided via our secure contact forms.
          </p>

          <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 text-foreground">2. Security Architecture</h2>
          <p className="mb-8 leading-relaxed">
            Our infrastructure is built on zero-trust principles. Any project assets, credentials, or proprietary business logic you share with us remain strictly confidential. We utilize enterprise-grade encryption (SSL/TLS) during transmission and robust secure database environments via Supabase.
          </p>

          <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 text-foreground">3. Third-Party Protocols</h2>
          <p className="mb-8 leading-relaxed">
            We do not sell or distribute your data to third-party marketing entities. Information may only be shared with necessary cloud infrastructure providers (e.g., AWS, Vercel, Supabase, Google Cloud) strictly for the purpose of hosting and running your deployed digital assets.
          </p>

          <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 text-foreground">4. Contact & Compliance</h2>
          <p className="mb-8 leading-relaxed">
            If you have questions regarding this privacy architecture or wish to request data deletion, please initiate contact through our primary channel:
            <br/><br/>
            <strong>Email:</strong> {BUSINESS_INFO.email}<br/>
            <strong>Phone:</strong> {BUSINESS_INFO.phone}<br/>
            <strong>HQ Location:</strong> {BUSINESS_INFO.location}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
