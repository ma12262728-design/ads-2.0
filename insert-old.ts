import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ppfbgytltcxljiufzgzh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwZmJneXRsdGN4bGppdWZ6Z3poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1ODI4NDksImV4cCI6MjA5MjE1ODg0OX0.0_wIqeRObWZi57btg9pkdhn7XpPNXSH6AvLTHcD9Jzk';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const sampleProjects = [
  {
    slug: "rizwan-akram-ecommerce",
    title: "Custom Business Website with E-Commerce API",
    client: "Rizwan Akram",
    delivered: "April 2026",
    value: "PKR 100,000",
    tech: "HTML, CSS, JS, API Integration",
    image: "https://picsum.photos/seed/business/800/600",
    detailed_description: "A high-performance business website integrated with custom e-commerce APIs to streamline sales and inventory for Rizwan Akram's growing enterprise.",
    challenge: "The client needed a way to sync their local warehouse inventory with an online frontend in real-time.",
    solution: "We built a custom bridge API that connects their ERP system directly to the website's database.",
  },
  {
    slug: "urbanwear-pk",
    title: "Local Clothing Brand E-Commerce",
    client: "UrbanWear PK",
    delivered: "March 2026",
    tech: "Shopify / Custom Code",
    image: "https://picsum.photos/seed/fashion/800/600",
    detailed_description: "A visually stunning fashion storefront for UrbanWear PK, focusing on high-quality visuals and mobile responsiveness.",
    challenge: "Fast-loading images were critical without sacrificing quality for a fashion-focused audience.",
    solution: "Implemented advanced lazy loading and WebP image optimization across the entire catalog.",
  },
  // ADD MORE IF NEEDED TO SEED
];

async function seedData() {
  console.log("Seeding data...");
  const { data, error } = await supabase.from('projects').insert(sampleProjects);
  if (error) {
    console.error("Error inserting data:", error);
  } else {
    console.log("Success! Inserted projects:", data);
  }
}

// Uncomment to run automatically if executed via node or similar
// seedData();
