import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ppfbgytltcxljiufzgzh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwZmJneXRsdGN4bGppdWZ6Z3poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1ODI4NDksImV4cCI6MjA5MjE1ODg0OX0.0_wIqeRObWZi57btg9pkdhn7XpPNXSH6AvLTHcD9Jzk';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const organicBlogs = [
  {
    title: "Mastering E-Commerce in Pakistan: Performance is King",
    excerpt: "Why site speed and mobile optimization are the primary drivers of conversion in the local market.",
    category: "Business",
    author: "ADS Editorial",
    image_url: "https://picsum.photos/seed/pakistan/1200/600",
    slug: "ecommerce-performance-pakistan",
    content: `# Mastering E-Commerce in Pakistan\n\nIn the rapidly evolving digital landscape of Pakistan, e-commerce isn't just about having a website; it's about **performance**. With the majority of users accessing the internet via mobile data, every millisecond counts.\n\n## Why Speed Matters\n\nLocal users often experience varying network speeds. If your shop takes more than 3 seconds to load, you're losing over 50% of your potential customers. At ADS, we prioritize **Next.js and Edge Caching** to ensure your storefront is accessible instantly from Karachi to Khyber.\n\n### Key Strategies:\n1. **Image Optimization:** Compressing assets without losing retina quality.\n2. **CDN Deployment:** Serving content from local edge nodes.\n3. **Progressive Hydration:** Ensuring the UI is interactable before the full JS bundle loads.\n\nInvesting in a professional architecture is the difference between a failing shop and a market leader.`
  },
  {
    title: "The Rise of Custom Dashboards for Local SMBs",
    excerpt: "How bespoke administrative panels are replacing messy spreadsheets for Pakistani business owners.",
    category: "Development",
    author: "ADS Engineering",
    image_url: "https://picsum.photos/seed/dashboard/1200/600",
    slug: "custom-dashboards-smb",
    content: `# The Shift to Bespoke Dashboards\n\nFor years, local businesses in Pakistan relied on Excel sheets to manage inventory, sales, and employee records. Today, that's changing.\n\n## Automation is the New Standard\n\nA custom dashboard built on **React and Supabase** allows business owners to see real-time telemetry of their operations. Whether it's tracking a delivery in Lahore or monitoring stock levels in Multan, the centralized control is revolutionary.\n\n### Benefits of Custom Solutions:\n* **Real-time Data:** No more waiting for end-of-day reports.\n* **Security:** Role-based access ensures sensitive data stays private.\n* **Scalability:** Your dashboard grows with your business.\n\nStop managing by guess-work. Start managing by data.`
  },
  {
    title: "Modernizing Legacy Systems: A Roadmap",
    excerpt: "A strategic guide to transitioning from old-school PHP or static sites to modern React architectures.",
    category: "Strategy",
    author: "Admin",
    image_url: "https://picsum.photos/seed/modern-tech/1200/600",
    slug: "modernizing-legacy-systems",
    content: `# Transitioning to the Modern Web\n\nMany established enterprises in Pakistan are still running on software built a decade ago. While it "works," it's holding back growth. \n\n## The Risks of Legacy Software\nLegacy systems are prone to security vulnerabilities and are difficult to integrate with modern APIs (like WhatsApp Business or Banking Gateways).\n\n### Our Modernization Approach:\n1. **Audit:** Identifying the bottlenecks in your current stack.\n2. **Micro-Transitions:** Moving critical modules to React/Node first.\n3. **Full Integration:** Synching with modern cloud providers like AWS or GCP.\n\nModernization isn't an expense; it's an insurance policy for your company's future.`
  },
  {
    title: "Designing for the Desi Market: UX/UI Principles",
    excerpt: "Exploring the specific design patterns that resonate with Pakistani consumers.",
    category: "Design",
    author: "UX Lead",
    image_url: "https://picsum.photos/seed/design/1200/600",
    slug: "ux-ui-for-pakistan",
    content: `# Designing for Pakistan\n\nUser Experience (UX) in the West doesn't always translate directly to the local market. Cultural nuances, language preferences (Urdu vs. English), and visual density play massive roles.\n\n## Visual Hierarchy & Trust\nIn the local market, "Trust Signals" are vital. Clear contact buttons, visible verified badges, and straightforward pricing are more important than minimalist aesthetics.\n\n### Design Pillars:\n* **Mobile-First:** 90% of your users are on a phone.\n* **Color Psychology:** Utilizing vibrant but professional palettes that resonate culturally.\n* **Direct Action:** Large, clear CTA buttons for WhatsApp or Inquiries.\n\nGreat design is invisible—until it starts winning you customers.`
  }
];

async function seed() {
  console.log("Seeding organic intelligence packets...");
  const { data, error } = await supabase.from('blog_posts').insert(organicBlogs);
  if (error) {
    console.error("Transmission Error:", error);
  } else {
    console.log("Success: 4 Organic Data Packets Synchronized.");
  }
}

seed();
