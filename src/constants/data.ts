export const BUSINESS_INFO = {
  name: "Ammar Digital Solution",
  owner: "Muhammad Ammar Shahid",
  location: "Pakistan",
  address: "Pakistan",
  phone: "0344 7211118",
  whatsapp: "0344 7211118",
  email: "ma12262728@gmail.com",
  aboutBio: "Muhammad Ammar Shahid founded Ammar Digital Solution to bridge the gap between regional potential and global digital standards. With a focus on high-fidelity custom architectures, he leads Pakistan's most innovative tech entity.",
  ntn: "3440312905295",
  ntnDisplay: "34403****295",
  whatsappUrl: "https://wa.me/923447211118",
  profilePic: "https://i.postimg.cc/Jnp7JB2w/BBF91FA0-1AF4-4877-A1CC-AC597C73E585.jpg"
};

export const SERVICES = [
  {
    slug: "custom-web-design",
    title: "Custom Business Website & UI/UX Design",
    description: "Modern, responsive, and user-centric designs tailored to your brand identity.",
    detailedDescription: "In the digital age, your website is your storefront. We create high-fidelity, high-performance web experiences that don't just look good but drive conversions. Our design process starts with deep research into your target audience and ends with a pixel-perfect, liquid-smooth interface.",
    benefits: ["SEO-friendly structure", "Mobile-first approach", "Fast loading times", "Custom high-tech animations"],
    features: ["Responsive Grid System", "State-of-the-Art blurs and glassmorphism", "Accessibility compliant", "Brand-consistent color theory"],
    icon: "Layout",
    visual: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=75",
  },
  {
    slug: "ecommerce-development",
    title: "E-Commerce Website Development",
    description: "Complete online stores with product management, shopping carts, and secure checkouts.",
    detailedDescription: "Sell globally from Pakistan. We build robust e-commerce platforms that handle thousands of products and secure payments seamlessly. From inventory management to user-friendly checkout flows, we cover everything.",
    benefits: ["Inventory management", "User-friendly dashboard", "Secure cart system", "Multi-currency support"],
    features: ["Dynamic Product Filtering", "Wishlist & User Accounts", "Automated Email Invoicing", "Sales Analytics Dashboard"],
    icon: "ShoppingCart",
    visual: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=75",
  },
  {
    slug: "api-integration",
    title: "API Integration",
    description: "Seamlessly connect your website with payment gateways, CRM, and third-party systems.",
    detailedDescription: "Connect your digital ecosystem. We specialize in tethering your website to powerful 3rd party services like payment gateways, shipping providers, and ERP systems, ensuring data flows without friction.",
    benefits: ["Secure payment processing", "Automated workflows", "System synchronization", "Real-time data feeds"],
    features: ["Restful API Development", "Webhook Implementation", "Robust Auth Security", "Zero-Latency connections"],
    icon: "Puzzle",
    visual: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=75",
  },
  {
    slug: "digital-tools",
    title: "Premium Digital Tools & Subscriptions",
    description: "Access to professional tools and licenses for your digital growth.",
    detailedDescription: "Supercharge your productivity. We provide genuine licenses and subscriptions for the world's leading digital tools, helping you stay ahead of the competition without breaking the bank.",
    benefits: ["Genuine licenses", "Ongoing support", "Cost-effective solutions", "Regular updates"],
    features: ["Premium CMS Plugins", "Design Software Assets", "Marketing Automations", "Cloud resource management"],
    icon: "ShieldCheck",
    visual: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=75",
  },
  {
    slug: "cloud-hosting",
    title: "Cloud Hosting & Server Setup",
    description: "Reliable and high-performance server configurations for your web applications.",
    detailedDescription: "Stop worrying about downtime. We deploy your applications on blazing-fast cloud infrastructure, optimized for Pakistani and global traffic alike.",
    benefits: ["99.9% uptime", "Server monitoring", "Scalable infrastructure", "Daily backups"],
    features: ["AWS/Google Cloud Deployment", "CDN Optimization", "SSL Security Layers", "Database health monitoring"],
    icon: "Server",
    visual: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=75",
  },
  {
    slug: "it-consultancy",
    title: "IT Consultancy Services",
    description: "Expert advice on digital transformation and technical strategy for your business.",
    detailedDescription: "Expert guidance for your digital journey. We help businesses navigate the complexities of digital transformation, choosing the right tech stacks for long-term scalability.",
    benefits: ["Strategic planning", "Problem solving", "Tech stack optimization", "ROI focused growth"],
    features: ["Infrastructure Audits", "Digital Roadmap Creation", "Security Best Practices", "Team Training sessions"],
    icon: "Headphones",
    visual: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=75",
  },
];

export const TEMPLATES_CATALOG = [
  {
    slug: 'template-pack-full',
    title: '15-in-1 E-Commerce Template Pack',
    price: 2999,
  },
  ...Array.from({ length: 15 }).map((_, i) => ({
    slug: `template-${i + 1}`,
    title: `Premium Template ${String(i + 1).padStart(2, '0')}`,
    price: 499,
  }))
];

export const PORTFOLIO = [
  {
    slug: "rizwan-akram-ecommerce",
    title: "Custom Business Website with E-Commerce API",
    client: "Rizwan Akram",
    delivered: "April 2026",
    value: "PKR 100,000",
    tech: "HTML, CSS, JS, API Integration",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=75",
    detailedDescription: "A high-performance business website integrated with custom e-commerce APIs to streamline sales and inventory for Rizwan Akram's growing enterprise.",
    challenge: "The client needed a way to sync their local warehouse inventory with an online frontend in real-time.",
    solution: "We built a custom bridge API that connects their ERP system directly to the website's database.",
  },
  {
    slug: "urbanwear-pk",
    title: "Local Clothing Brand E-Commerce",
    client: "UrbanWear PK",
    delivered: "March 2026",
    tech: "Shopify / Custom Code",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=75",
    detailedDescription: "A visually stunning fashion storefront for UrbanWear PK, focusing on high-quality visuals and mobile responsiveness.",
    challenge: "Fast-loading images were critical without sacrificing quality for a fashion-focused audience.",
    solution: "Implemented advanced lazy loading and WebP image optimization across the entire catalog.",
  },
  {
    slug: "foodies-hub",
    title: "Restaurant Online Ordering System",
    client: "Foodies Hub (Mandi Bahauddin)",
    delivered: "February 2026",
    tech: "React, Node.js",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=75",
    detailedDescription: "A complete digital ordering system for a local restaurant, reducing wait times and increasing order accuracy.",
    challenge: "The system needed to handle peak hour traffic with minimal latency.",
    solution: "Used a serverless architecture with real-time sockets to ensure instant order notifications.",
  },
  {
    slug: "al-rehman-properties",
    title: "Real Estate Property Listing",
    client: "Al-Rehman Properties",
    delivered: "January 2026",
    tech: "Next.js, Tailwind",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=75",
    detailedDescription: "A clean and modern property portal for one of Pakistan's leading real estate agencies.",
    challenge: "Handling large galleries of property photos while maintaining SEO performance.",
    solution: "Utilized Static Site Generation (SSG) with dynamic revalidation for real-time listings.",
  },
  {
    slug: "ali-hassan-portfolio",
    title: "Freelancer Portfolio Website",
    client: "Ali Hassan",
    delivered: "December 2025",
    tech: "Vite, Framer Motion",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=75",
    detailedDescription: "A creative portfolio showcasing the work of a professional designer, utilizing complex animations.",
    challenge: "Creating a unique 'liquid glass' feel that wouldn't feel too heavy on mobile devices.",
    solution: "Optimized GPU-accelerated transforms and lightweight SVG-based noise patterns.",
  },
  {
    slug: "educators-academy",
    title: "School Management System",
    client: "The Educators Academy",
    delivered: "November 2025",
    tech: "Firebase, React",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=75",
    detailedDescription: "A comprehensive management suite for staff, students, and parents to track academic progress.",
    challenge: "Complex permission levels for different user types (Admin, Teacher, Parent).",
    solution: "Implemented custom Firebase Auth claims for granular data access control.",
  },
  {
    slug: "growth-ads-agency",
    title: "Marketing Landing Page",
    client: "Growth Ads Agency",
    delivered: "October 2025",
    tech: "Lucide, Motion",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=75",
    detailedDescription: "A high-conversion landing page for a digital marketing firm, optimized for Google Ads traffic.",
    challenge: "Achieving a Google PageSpeed score of 95+ for better ad quality scores.",
    solution: "Removed all heavy dependencies and used vanilla CSS animations where possible.",
  },
];


export const TESTIMONIALS = [
  {
    name: "Rizwan Akram",
    role: "Proprietor, Rizwan Traders",
    company: "Rizwan Traders",
    review: "Ammar Digital ne humari wholesale inventory ko E-Commerce backend ke sath connect kar diya. Ab stock tally karna pehle se 10x asaan hai. Highly professional IT services in Pakistan."
  },
  {
    name: "Sheikh Umer",
    role: "CEO, UrbanWear PK",
    company: "UrbanWear PK",
    review: "In ki E-Commerce website speed kamal hai. Pura custom design kiya gaya hai or meri sales mein 40% izafa hua hai fast loading times ki waja se. Ek authentic Pakistani software agency."
  },
  {
    name: "Waqas Tariq",
    role: "Managing Director, Tariq Real Estates",
    company: "Tariq Real Estates",
    review: "Ammar and his team built our property listing portal exactly how we envisioned. FBR certified aur bilkul on-time delivery. Best tech team to work with for real estate."
  },
  {
    name: "Dr. Ayesha Noor",
    role: "Head Administrator, Noor Clinics",
    company: "Noor Clinics",
    review: "Data security and API integrations were my biggest concerns for our clinic's management dashboard. Ammar Digital provided a zero-latency, secure infrastructure."
  },
  {
    name: "Ch. Saad Gujjar",
    role: "Operations Manager, Gujjar Logistics",
    company: "Gujjar Logistics",
    review: "We needed a robust fleet reporting system. Ye team actual architecture build karni janti hai. Responsive design banaya aur 2 hafte pehle hi go-live karwa diya."
  },
  {
    name: "Zainab Riaz",
    role: "Founder, Zenith Beauty",
    company: "Zenith Beauty",
    review: "My Shopify store was completely revamped by Ammar. The 'Apple-style' liquid glass design he implemented gave my brand a massively premium feel. Excellent work!"
  },
  {
    name: "Nabeel Chaudhry",
    role: "Director, Chaudhry Associates",
    company: "Chaudhry Associates",
    review: "Bhai ne website k database optimization aesi ki hai ke website kabhi crash nahi hoti. FBR NTN verified hain, so payment transactions mein we had complete trust."
  },
  {
    name: "Hassan Dawood",
    role: "Marketing Head, Elite Marketing",
    company: "Elite Marketing",
    review: "Google Ads conversions scale with site speed. Ammar Digital's custom React setup got us a 99 PageSpeed score, drastically reducing our CPC. Highly recommended."
  }
];
