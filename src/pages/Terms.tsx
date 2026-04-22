import { motion } from 'motion/react';
import SectionHeader from '../components/SectionHeader';
import { BUSINESS_INFO } from '../constants/data';
import { Scale } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

export default function Terms() {
  useSEO("Terms of Service - Ammar Digital", "Terms and conditions for structural engineering and web deployment services.");

  return (
    <div className="pt-48 pb-24 min-h-screen relative overflow-hidden">
      <div className="absolute top-0 right-[-10%] w-[50%] h-[50%] bg-accent/5 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="container-custom relative z-10">
        <SectionHeader title="Terms of Service" subtitle="LEGAL AGREEMENT" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-card p-8 md:p-16 rounded-[40px] prose dark:prose-invert max-w-none text-foreground/80 border border-foreground/10"
        >
          <div className="flex items-center gap-4 mb-8 text-accent font-black tracking-widest uppercase text-sm bg-accent/10 w-max px-6 py-3 rounded-xl border border-accent/20">
            <Scale size={20} /> Legal Framework
          </div>

          <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 text-foreground">1. Development & Delivery</h2>
          <p className="mb-8 leading-relaxed">
            By engaging {BUSINESS_INFO.name} for digital services, you agree to the scoped architecture and timelines presented in the final project proposal. Any latency caused by delayed client feedback or third-party credential provision will dynamically shift the deployment timeline.
          </p>

          <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 text-foreground">2. Financial Architecture</h2>
          <p className="mb-8 leading-relaxed">
            Standard protocols mandate a 50% upfront retainer before system architecture begins. The remaining 50% is due upon final QA clearance and prior to production deployment (Go-Live). As an FBR-registered entity, all transactions will be transparent.
          </p>

          <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 text-foreground">3. Intellectual Property (IP)</h2>
          <p className="mb-8 leading-relaxed">
            Upon final settlement of the invoice, the bespoke codebase, UI/UX assets, and deployment infrastructure rights are fully transferred to the client. {BUSINESS_INFO.name} retains the right to securely display the public-facing application in our structural portfolio unless a Non-Disclosure Agreement (NDA) is active.
          </p>

          <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 text-foreground">4. Liability & Zero-Latency Clause</h2>
          <p className="mb-8 leading-relaxed">
            We engineer for zero latency and highly concurrent traffic, yet {BUSINESS_INFO.name} shall not be liable for infrastructure downtimes caused by third-party cloud outages (AWS, Google, Vercel). Post-deployment maintenance requires an active SLA (Service Level Agreement).
          </p>
        </motion.div>
      </div>
    </div>
  );
}
