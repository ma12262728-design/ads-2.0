import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import SectionHeader from '../components/SectionHeader';

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  challenge: string;
  solution: string;
  impact: string;
  category: string;
}

export default function CaseStudies() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);

  useEffect(() => {
    fetchStudies();
  }, []);

  const fetchStudies = async () => {
    const { data } = await supabase.from('case_studies').select('*').eq('visible', true);
    if (!data || data.length === 0) {
       // Manual fallback data
       setStudies([
        {
            id: "1",
            title: "E-Commerce Pipeline Optimization",
            client: "Lahore Fashion Hub",
            challenge: "High cart abandonment rate during peak festive seasons due to slow API response times.",
            solution: "Implemented custom caching layer (Redis) and optimized SQL queries to reduce latency by 60%.",
            impact: "Conversion rate increased by 25% with revenue growth of 40% in Q1.",
            category: "E-Commerce"
        },
        {
            id: "2",
            title: "Fintech Mobile Core Migration",
            client: "Karachi Financial Group",
            challenge: "Legacy mobile application failed to scale under 100k+ concurrent user load.",
            solution: "Transitioned to a microservices architecture using React Native and high-performance Node.js backend.",
            impact: "System uptime improved to 99.99% and transaction speed increased by 3x.",
            category: "Fintech"
        },
        {
            id: "3",
            title: "Logistics Fleet Tracking System",
            client: "Islamabad Logistics Corp",
            challenge: "Drivers struggled with manual logging and inventory discrepancies.",
            solution: "Developed an IoT-integrated mobile application with real-time GPS tracking and automated inventory updates.",
            impact: "Operating costs reduced by 15% within the first six months.",
            category: "Logistics"
        }
       ]);
    } else {
       setStudies(data);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[var(--background)]">
      <div className="container-custom">
        <SectionHeader title="Success Stories" subtitle="PROVEN BUSINESS TRANSFORMATIONS" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {studies.map((study) => (
            <motion.div key={study.id} className="glass-card p-10 rounded-[32px] border border-accent/20">
              <span className="text-accent text-[10px] font-black uppercase tracking-widest">{study.category}</span>
              <h3 className="text-3xl font-black uppercase tracking-tight mt-4 mb-2">{study.title}</h3>
              <p className="text-muted-foreground italic mb-6">Client: {study.client}</p>
              
              <div className="space-y-6">
                <div><h4 className="text-xs font-black uppercase tracking-widest text-secondary">The Challenge</h4><p className="text-sm mt-1 opacity-80">{study.challenge}</p></div>
                <div><h4 className="text-xs font-black uppercase tracking-widest text-accent">The Solution</h4><p className="text-sm mt-1 opacity-80">{study.solution}</p></div>
                <div><h4 className="text-xs font-black uppercase tracking-widest text-white">The Impact</h4><p className="text-xl font-black mt-1 text-accent">{study.impact}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
