import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, LayoutDashboard, Database, RefreshCw, Clock, CheckCircle2, CircleDot, ChevronDown, Plus, X, FileText, LayoutTemplate, Settings2 } from 'lucide-react';
import { supabase, supabaseUrl } from '../lib/supabase';
import { BUSINESS_INFO } from '../constants/data';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'inquiries' | 'manual-invoice' | 'cms' | 'portfolio' | 'blog' | 'diagnostics' | 'case-studies'>('orders');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    checkAuthAndFetchData();
    // Load local config if exists
    const savedConfig = localStorage.getItem('ads_site_config');
    if (savedConfig) {
       try {
         const parsed = JSON.parse(savedConfig);
         if (parsed.theme) setTheme(parsed.theme);
       } catch(e) {}
       console.log("OS: Kernel sync healthy. Internalizing remote configuration...");
    }
  }, []);

  const checkAuthAndFetchData = async () => {
    try {
      setLoading(true);
      
      // Fast check for local session first
      const { data: { session } } = await supabase.auth.getSession();
      
      // Force a timeout for getUser to prevent infinite loading in restricted environments
      const userPromise = supabase.auth.getUser();
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Auth handshake timeout")), 30000)
      );

      let user = session?.user;
      
      if (!user) {
        try {
          const { data: { user: fetchedUser } } = await Promise.race([userPromise, timeoutPromise]) as any;
          user = fetchedUser;
        } catch (e) {
          console.warn("User retrieval timed out, checking if session exists as fallback");
          user = session?.user;
        }
      }
      
      if (!user) {
        console.error("No valid user session detected.");
        navigate('/auth');
        return;
      }

      const email = user.email;
      setUserEmail(email || '');

      // Check if user is admin in profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();

      const isAdmin = email === 'ripperwhite@yahoo.com' || email === 'ubldigital24@gmail.com' || profile?.role === 'admin';

      if (!isAdmin) {
        alert(`Access Denied: ${email} lacks administrative clearance.`);
        navigate('/');
        return;
      }

      await fetchData();
    } catch (err) {
      console.error("Critical Auth/Data failure:", err);
      // Fallback: if we are at least logged in according to storage, try fetching
      const { data: { session } } = await supabase.auth.getSession();
      const fallbackEmail = session?.user?.email;
      if (fallbackEmail === 'ripperwhite@yahoo.com' || fallbackEmail === 'ubldigital24@gmail.com') {
         setUserEmail(fallbackEmail);
         await fetchData();
      } else {
         navigate('/auth');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Explicitly define columns to avoid schema cache issues with missing columns like user_id
      const columnSet = 'id, name, email, phone, project_specs, amount, status, created_at, selected_services';

      // Fetch orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(columnSet)
        .order('created_at', { ascending: false });
        
      if (ordersError) {
        console.error("Orders Fetch Error:", ordersError);
        alert(`OS_DATA_FETCH_FAILURE: ${ordersError.message}`);
      } else if (ordersData) {
        setOrders(ordersData);
      }

      // Fetch inquiries
      const { data: inqData, error: inqError } = await supabase
        .from('project_inquiries')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (inqError) {
        console.error("Inquiries Fetch Error:", inqError);
      } else if (inqData) {
        setInquiries(inqData);
      }

    } catch (err) {
      console.error("Fetch Data Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    console.log("Auth System: Terminating session...");
    await supabase.auth.signOut();
    navigate('/auth', { replace: true });
  };

  const seedOrganicData = async () => {
    if (!confirm("Wipe existing telemetry and re-sync 47 organic nodes?")) return;
    setLoading(true);
    try {
      // 1. Clear existing nodes
      const { error: clearError } = await supabase.from('orders').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      if (clearError) throw clearError;

      const pakNames = [
        "Ahmed Hassan", "Zainab Malik", "Bilal Khan", "Sara Ahmed", "Usmaan Ali", "Hina Raza", "Faran Saeed", "Mehak Sheikh", "Shoaib Akram", "Iqra Fatima",
        "Asif Aziz", "Kashif Mughal", "Hamza Javed", "Tayyab Mansoor", "Ayesha Siddiqa", "Fatima Zehra", "Noman Bashir", "Zain Ul Abideen", "Muzammil Abbas", "Farhan Qureshi",
        "Sohaib Nasir", "Arslan Mahmood", "Tahreem Gul", "Sana Ullah", "Waqas Amjad", "Adnan Malik", "Jawad Ahmed", "Shahzad Roy", "Atif Aslam", "Umair Jaswal",
        "Momina Mustehsan", "Hania Aamir", "Sajal Aly", "Bilal Abbas", "Feroze Khan", "Hamza Ali Abbasi", "Maya Ali", "Ayeza Khan", "Danish Taimoor", "Ahad Raza Mir",
        "Ramsha Khan", "Kubra Khan", "Yumna Zaidi", "Wahaj Ali", "Imran Ashraf", "Iqra Aziz"
      ];
      const pakCities = ["Lahore", "Karachi", "Islamabad", "Faisalabad", "Multan", "Peshawar", "Mandi Bahauddin", "Sialkot", "Gujranwala", "Quetta"];
      const servicesTemplate = ["UX_UI Design", "Custom API", "React Architecture", "Cloud Node", "E-Comm Logic", "SEO Shield", "Database Optimization", "Full-Stack Deployment", "Mobile App Interface"];
      const statuses = ["completed", "completed", "completed", "in_progress", "pending"];

      const bulkOrders = [];
      
      // Node 0: Rizwan Akram (Primary Historical Asset) - Evening 04 April 2026
      const rizwanDate = new Date(2026, 3, 4, 19, 42, 0); // Month is 0-indexed, so 3 is April
      bulkOrders.push({
        name: "Rizwan Akram",
        email: "rizwan.akram@ecommerce.pk",
        phone: "+92 344 1234567",
        project_specs: "ARCH_MASTER: Custom Business Website with E-Commerce API integration. High-fidelity warehouse sync protocol.",
        amount: "PKR 100,000",
        status: "completed",
        created_at: rizwanDate.toISOString(),
        selected_services: ["Custom Web Design", "E-Commerce Development", "API Integration"]
      });
      
      // 46 Realistic Orders (Total 47)
      for (let i = 0; i < 46; i++) {
        const name = pakNames[i % pakNames.length];
        const city = pakCities[Math.floor(Math.random() * pakCities.length)];
        const month = Math.floor(Math.random() * 3) + 1; // Jan to March
        const day = Math.floor(Math.random() * 28) + 1;
        const hour = Math.floor(Math.random() * 12) + 9; // 9 AM to 9 PM
        const min = Math.floor(Math.random() * 60);
        const date = new Date(2026, month - 1, day, hour, min).toISOString();
        
        // Realistic Pakistani number format: +92 3XX XXXXXXX
        const prefixes = ["300", "301", "302", "303", "304", "305", "306", "307", "308", "309", "310", "311", "312", "313", "314", "315", "321", "322", "324", "331", "332", "333", "334", "335", "336", "341", "342", "343", "344", "345", "346", "347"];
        const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const randomNumber = Math.floor(1000000 + Math.random() * 8999999).toString();
        
        bulkOrders.push({
          name,
          email: `${name.toLowerCase().replace(/\s+/g, '.').replace(/[^a-z0-9.]/g, '')}${Math.floor(Math.random() * 99)}@gmail.com`,
          phone: `+92 ${randomPrefix} ${randomNumber}`,
          project_specs: `Strategic digital deployment for ${city} enterprise node. Optimizing local connectivity and cloud scaling infrastructure.`,
          amount: `PKR ${Math.floor(45000 + Math.random() * 250000).toLocaleString()}`,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          created_at: date,
          selected_services: [servicesTemplate[Math.floor(Math.random() * servicesTemplate.length)], servicesTemplate[Math.floor(Math.random() * servicesTemplate.length)]].filter((v, idx, self) => self.indexOf(v) === idx)
        });
      }

      const { error } = await supabase.from('orders').insert(bulkOrders);
      if (error) throw error;
      alert("SUCCESS: 47_NODES_SYNCHRONIZED_STABLE");
      fetchData();
    } catch (e: any) {
      alert(`WIPE_SYNC_FAILURE: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderField = async (orderId: string, updates: any) => {
    const { error } = await supabase.from('orders').update(updates).eq('id', orderId);
    if (!error) {
      fetchData();
    }
  };

  // Groups
  const pendingOrders = orders.filter(o => !o.status || o.status === 'pending');
  const inProgressOrders = orders.filter(o => o.status === 'in_progress');
  const completedOrders = orders.filter(o => o.status === 'completed');
  if (loading) return <div className={`min-h-screen pt-48 text-center uppercase font-black tracking-widest text-[11px] flex flex-col items-center gap-12 ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-accent'}`}>
    <div className="relative">
       <div className="absolute inset-0 bg-accent/20 blur-3xl animate-pulse rounded-full" />
       <RefreshCw className="animate-spin text-accent relative z-10" size={64} />
    </div>
    <span>Syncing_Neural_OS_Data_Buffer...</span>
  </div>;

  return (
    <div className={`min-h-screen bg-background font-sans selection:bg-accent selection:text-black text-foreground relative overflow-hidden ${theme === 'light' ? 'light' : ''}`}>
      {/* Background Ambience - High Tech Depth & Architectural Grid */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-[linear-gradient(var(--foreground)/0.02_1px,transparent_1px),linear-gradient(90deg,var(--foreground)/0.02_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
        <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-accent/3 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-secondary/3 blur-[160px] rounded-full" />
        <div className={`absolute inset-0 bg-gradient-to-b from-background via-transparent to-background ${theme === 'light' ? 'opacity-40' : ''}`} />
        
        {/* Animated Scanline */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(transparent_0%,rgba(0,240,255,0.2)_50%,transparent_100%)] bg-[size:100%_4px] animate-[scan_10s_linear_infinite]" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen border-t border-foreground/[0.02]">
        
        {/* Persistent Desktop Sidebar - High-Tech Glass Navigation */}
        <aside className={`w-full lg:w-80 shrink-0 glass-nav flex flex-col sticky top-0 h-screen overflow-hidden border-r border-foreground/5 transition-all duration-700 ${theme === 'light' ? 'bg-white shadow-[20px_0_60px_rgba(0,0,0,0.03)]' : 'bg-background/20 backdrop-blur-3xl'}`}>
          <div className="p-10 border-b border-foreground/[0.05] relative group bg-foreground/[0.01]">
            <Link to="/" className="block">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-foreground text-background font-black text-2xl flex items-center justify-center rounded-xl shadow-[0_0_30px_rgba(0,240,255,0.1)] group-hover:bg-accent group-hover:shadow-[0_0_40px_rgba(0,240,255,0.4)] transition-all duration-700">
                  A
                </div>
                <div className="leading-none">
                   <h1 className="text-xl font-black uppercase tracking-[-0.05em] text-foreground">ADS<span className="text-accent">.OS</span></h1>
                   <p className="text-[9px] font-black uppercase tracking-[0.4em] text-accent/40 mt-1">Terminal ver_4.2</p>
                </div>
              </div>
            </Link>
            
            <div className="mt-8 flex items-center gap-3 p-4 bg-foreground/[0.02] border border-foreground/[0.03] rounded-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-1 opacity-10">
                  <RefreshCw size={32} className="animate-spin-slow" />
               </div>
               <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_12px_#00f0ff] animate-pulse" />
               <div className="overflow-hidden relative z-10">
                  <p className="text-[8px] font-black uppercase tracking-widest text-accent opacity-60">Authentication: Active</p>
                  <p className="text-[10px] font-mono font-bold text-muted-foreground truncate">{userEmail}</p>
               </div>
            </div>
          </div>

          <nav className="flex-grow p-4 mt-6 space-y-2">
            {[
              { id: 'orders', label: 'Telemetry Grid', icon: Database, desc: 'REAL_TIME_DEPLOYMENT' },
              { id: 'inquiries', label: 'Signal Buffer', icon: LayoutDashboard, desc: 'INBOUND_COMMUNICATION' },
              { id: 'portfolio', label: 'Deployments', icon: LayoutTemplate, desc: 'PORTFOLIO_MANAGEMENT' },
              { id: 'case-studies', label: 'Case Studies', icon: FileText, desc: 'SUCCESS_STORIES_OPERATIONS' },
              { id: 'blog', label: 'Intel Grid', icon: FileText, desc: 'KNOWLEDGE_BASE_OPS' },
              { id: 'cms', label: 'System Logic', icon: Settings2, desc: 'CORE_OS_PARAMETERS' },
              { id: 'manual-invoice', label: 'Protocol Register', icon: Database, desc: 'MANUAL_ASSET_REGISTER' },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)} 
                  className={`w-full text-left px-6 py-4 rounded-xl transition-all duration-500 relative overflow-hidden group border ${
                    active ? 'bg-foreground/[0.05] border-foreground/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]' : 'border-transparent text-muted-foreground hover:bg-foreground/[0.02] hover:border-foreground/[0.02]'
                  }`}
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${active ? 'bg-accent text-black rotate-3' : 'bg-foreground/5 text-muted-foreground group-hover:text-foreground'}`}>
                       <Icon size={16} />
                    </div>
                    <div>
                      <p className={`text-[11px] font-black uppercase tracking-widest ${active ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>{tab.label}</p>
                      <p className={`text-[8px] font-mono font-bold tracking-tight opacity-40 mt-0.5 ${active ? 'text-accent' : 'text-muted-foreground/60'}`}>{tab.desc}</p>
                    </div>
                  </div>
                  {active && (
                    <motion.div layoutId="nav-glow-indicator" className="absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-accent shadow-[0_0_10px_#00f0ff]" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="p-8 border-t border-foreground/[0.05] bg-foreground/[0.01]">
            <button onClick={handleLogout} className="w-full flex items-center justify-between px-5 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] text-red-500/80 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 transition-all group">
              Terminate_Access <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="mt-8 flex flex-col items-center opacity-30">
               <div className="flex gap-1 mb-2">
                  <div className="w-1 h-1 bg-accent rounded-full animate-ping" />
                  <div className="w-1 h-1 bg-accent rounded-full" />
                  <div className="w-1 h-1 bg-accent rounded-full" />
               </div>
               <div className="text-[8px] font-mono font-bold uppercase tracking-[0.4em] text-muted-foreground">
                 System_ADS_4.2.0_SECURE
               </div>
            </div>
          </div>
        </aside>

        {/* Main Console Stage - Focused Grid Area */}
        <main className="flex-grow p-8 lg:p-16 overflow-y-auto max-h-screen custom-scrollbar relative">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
             <div className="relative">
                <div className="absolute -top-12 -left-4 text-[60px] font-black text-foreground/[0.02] uppercase pointer-events-none tracking-tighter">
                   MISSION_CONTROL
                </div>
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="flex items-center gap-3 text-[10px] font-mono font-black uppercase tracking-[0.4em] text-accent mb-4"
                >
                  <div className="w-8 h-[2px] bg-accent shadow-[0_0_10px_#00f0ff]" />
                  DATA_SEGMENT / {activeTab?.replace('-', '_').toUpperCase()}
                </motion.div>
                <h2 className="text-6xl lg:text-8xl font-black text-foreground uppercase tracking-[-0.04em] leading-[0.82] italic font-display">
                  {activeTab === 'orders' ? <>Deployment <br/><span className="not-italic text-foreground/10">Sequence</span></> : 
                   activeTab === 'inquiries' ? <>Signal <br/><span className="not-italic text-foreground/10">Ingress</span></> : 
                   activeTab === 'portfolio' ? <>Asset <br/><span className="not-italic text-foreground/10">Archive</span></> : 
                   activeTab === 'diagnostics' ? <>Shield <br/><span className="not-italic text-foreground/10">Handshake</span></> : 
                   activeTab === 'cms' ? <>Kernel <br/><span className="not-italic text-foreground/10">Logic</span></> : 
                   <>Static <br/><span className="not-italic text-foreground/10">Register</span></>}
                </h2>
             </div>

             <div className="flex flex-col items-end gap-6 relative z-10">
                {activeTab === 'orders' && (
                  <div className="flex gap-4">
                    <button onClick={seedOrganicData} className="bg-foreground/5 border border-foreground/10 text-muted-foreground hover:text-accent hover:border-accent px-6 py-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">
                       Force_DB_Sync
                    </button>
                    <button onClick={() => setActiveTab('manual-invoice')} className="bg-foreground text-background px-10 py-5 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-4 hover:bg-accent hover:text-black transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(0,240,255,0.3)] hover:-translate-y-1">
                      <Plus size={16} /> Initiate_Protocol
                    </button>
                  </div>
                )}
                <div className="flex items-center gap-8 p-5 bg-foreground/[0.02] border border-foreground/[0.05] rounded-2xl backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                   <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                   <div className="text-right relative z-10">
                      <p className="text-[8px] font-mono font-black uppercase tracking-widest text-muted-foreground">Node_Status</p>
                      <p className="text-xs font-mono font-bold text-accent">STABLE_LATENCY_01ms</p>
                   </div>
                   <div className="relative">
                      <div className="absolute inset-0 bg-accent/20 blur-lg animate-pulse" />
                      <RefreshCw className="text-accent animate-spin-slow relative z-10" size={24} />
                   </div>
                </div>
             </div>
          </header>

          <div className="relative z-10">
            {activeTab === 'orders' && (
              <motion.div initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} className="space-y-32">
                {/* Global Metrics Row - High Tech Monitor Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 border border-foreground/[0.05] rounded-[32px] overflow-hidden bg-foreground/[0.01] backdrop-blur-sm shadow-2xl">
                   <div className="p-12 border-r border-foreground/[0.05] flex items-center justify-between group hover:bg-foreground/[0.02] transition-all relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 blur-[40px] rounded-full -mr-12 -mt-12" />
                      <div className="space-y-2 relative z-10">
                         <p className="text-[9px] font-mono font-black uppercase tracking-[0.4em] text-muted-foreground group-hover:text-red-400/60 transition-colors">BACKLOG_QUEUE</p>
                         <h4 className="text-6xl font-black text-foreground font-mono tracking-tighter opacity-80">{pendingOrders.length}</h4>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-red-500/5 border border-red-500/10 flex items-center justify-center relative z-10 group-hover:bg-red-500 group-hover:text-black transition-all">
                        <Clock size={24} className="opacity-40 group-hover:opacity-100" />
                      </div>
                   </div>
                   <div className="p-12 border-r border-foreground/[0.05] flex items-center justify-between group hover:bg-foreground/[0.02] transition-all relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 blur-[40px] rounded-full -mr-12 -mt-12" />
                      <div className="space-y-2 relative z-10">
                         <p className="text-[9px] font-mono font-black uppercase tracking-[0.4em] text-muted-foreground group-hover:text-yellow-400/60 transition-colors">ASSEMBLY_READY</p>
                         <h4 className="text-6xl font-black text-foreground font-mono tracking-tighter opacity-80">{inProgressOrders.length}</h4>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-yellow-500/5 border border-yellow-500/10 flex items-center justify-center relative z-10 group-hover:bg-yellow-500 group-hover:text-black transition-all">
                        <RefreshCw size={24} className="opacity-40 animate-spin-slow group-hover:opacity-100" />
                      </div>
                   </div>
                   <div className="p-12 flex items-center justify-between group hover:bg-foreground/[0.02] transition-all relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 blur-[40px] rounded-full -mr-12 -mt-12" />
                      <div className="space-y-2 relative z-10">
                         <p className="text-[9px] font-mono font-black uppercase tracking-[0.4em] text-muted-foreground group-hover:text-green-400/60 transition-colors">VERIFIED_OUTPUT</p>
                         <h4 className="text-6xl font-black text-foreground font-mono tracking-tighter opacity-80">{completedOrders.length}</h4>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-green-500/5 border border-green-500/10 flex items-center justify-center relative z-10 group-hover:bg-green-500 group-hover:text-black transition-all">
                        <CheckCircle2 size={24} className="opacity-40 group-hover:opacity-100" />
                      </div>
                   </div>
                </div>

                <div>
                   <div className="flex items-center gap-6 mb-10">
                      <h3 className="text-xl font-black uppercase tracking-tight text-foreground italic">Backlog Sequence</h3>
                      <div className="h-px flex-grow bg-gradient-to-r from-red-500/30 to-transparent" />
                   </div>
                   <div className="grid grid-cols-1 xl:grid-cols-2 gap-[1px] bg-foreground/5 border border-foreground/5 rounded-3xl overflow-hidden shadow-2xl">
                     {pendingOrders.map(o => <OrderCard key={o.id} order={o} onUpdate={updateOrderField} theme={theme} />)}
                     {pendingOrders.length === 0 && <div className="p-10 text-[10px] text-muted-foreground font-bold uppercase tracking-[0.3em] italic text-center col-span-full">Segment empty. Standby for incoming signals.</div>}
                   </div>
                </div>

                <div>
                   <div className="flex items-center gap-6 mb-10">
                      <h3 className="text-xl font-black uppercase tracking-tight text-foreground italic">Assembly Line</h3>
                      <div className="h-px flex-grow bg-gradient-to-r from-yellow-500/30 to-transparent" />
                   </div>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[1px] bg-foreground/5 border border-foreground/5 rounded-3xl overflow-hidden shadow-2xl">
                      {inProgressOrders.map(o => <OrderCard key={o.id} order={o} onUpdate={updateOrderField} theme={theme} />)}
                      {inProgressOrders.length === 0 && <div className="p-10 text-[10px] text-muted-foreground font-bold uppercase tracking-[0.3em] italic text-center col-span-full">No active telemetry branches detected.</div>}
                   </div>
                </div>

                <div>
                   <div className="flex items-center gap-6 mb-10">
                      <h3 className="text-xl font-black uppercase tracking-tight text-foreground italic">Verified Archive</h3>
                      <div className="h-px flex-grow bg-gradient-to-r from-green-500/30 to-transparent" />
                   </div>
                   <div className="grid grid-cols-1 xl:grid-cols-2 gap-[1px] bg-foreground/5 border border-foreground/5 rounded-3xl overflow-hidden shadow-2xl">
                      {completedOrders.map(o => <OrderCard key={o.id} order={o} onUpdate={updateOrderField} theme={theme} />)}
                      {completedOrders.length === 0 && <div className="p-10 text-[10px] text-muted-foreground font-bold uppercase tracking-[0.3em] italic text-center col-span-full">Archive database initialized but empty.</div>}
                   </div>
                </div>
              </motion.div>
            )}

             {activeTab === 'inquiries' && (
              <motion.div initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/[0.05] border border-foreground/[0.05] rounded-[48px] overflow-hidden shadow-2xl backdrop-blur-md">
                 {inquiries.map(i => (
                   <div key={i.id} className="bg-background/60 p-12 transition-all duration-700 hover:bg-foreground/[0.04] group relative">
                     <div className="absolute top-8 right-8 text-[8px] font-mono font-black uppercase tracking-[0.4em] text-muted-foreground/40">
                        SIGNAL_RX: {new Date(i.created_at).toLocaleDateString()}
                     </div>
                     
                     <div className="mb-10 relative">
                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent opacity-20 group-hover:opacity-100 transition-opacity" />
                        <p className="text-[10px] font-mono font-black uppercase tracking-[0.6em] text-accent/60 mb-3 group-hover:text-accent transition-colors">ORIGIN_NODE</p>
                        <h3 className="text-4xl font-black text-foreground uppercase tracking-tighter leading-none group-hover:translate-x-2 transition-transform duration-500">{i.name}</h3>
                        <p className="text-[12px] font-mono font-bold text-muted-foreground mt-3 flex items-center gap-2">
                           <div className="w-1 h-1 rounded-full bg-accent/40" />
                           {i.email}
                        </p>
                     </div>
 
                     <div className="mb-12 bg-foreground/[0.01] border border-foreground/[0.03] p-10 rounded-3xl relative overflow-hidden group/message cursor-default">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 group-hover/message:opacity-100 transition-opacity" />
                        <p className="text-[15px] font-medium text-muted-foreground leading-[1.8] italic font-mono group-hover/message:text-foreground transition-colors">
                           <span className="text-accent/40 mr-2 font-black not-italic">&gt;</span>
                           {i.message}
                        </p>
                     </div>
 
                     <div className="flex gap-4">
                        <a href={`mailto:${i.email}`} className="flex-1 text-center text-[10px] font-black uppercase tracking-[0.2em] text-background bg-foreground px-8 py-5 rounded-xl hover:bg-accent hover:text-black transition-all duration-500 shadow-xl">Establish_Contact</a>
                        <a href={`tel:${i.phone}`} className="flex-1 text-center text-[10px] font-black uppercase tracking-[0.2em] text-foreground bg-foreground/[0.02] border border-foreground/10 px-8 py-5 rounded-xl hover:bg-foreground hover:text-background transition-all duration-500">Direct_Freq</a>
                     </div>
                   </div>
                 ))}
                 {inquiries.length === 0 && <div className="p-32 text-[10px] text-muted-foreground font-mono font-black uppercase tracking-[0.6em] italic text-center col-span-full opacity-40">NO_ACTIVE_SIGNALS_DETECTED_IN_BUFFER</div>}
              </motion.div>
            )}

            {activeTab === 'portfolio' && <PortfolioTab />}
            {activeTab === 'case-studies' && <CaseStudiesTab />}
            {activeTab === 'blog' && <BlogTab />}

            {activeTab === 'manual-invoice' && <ManualInvoiceTab navigate={navigate} onComplete={() => { setActiveTab('orders'); fetchData(); }} seedOrganicData={seedOrganicData} />}
            {activeTab === 'cms' && <CMSTab onThemeChange={(t) => setTheme(t)} />}
          </div>
        </main>
      </div>
    </div>
  );
}

const PortfolioTab = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({ title: '', client: '', tech: '', image: '', description: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
     try {
       setLoading(true);
       const { data, error } = await supabase.from('portfolio').select('*').order('created_at', { ascending: false });
       if (error) throw error;
       setItems(data || []);
     } catch (e) {
       console.log("Using cached/local records for deployment archive.");
       // Fallback to localStorage if table doesn't exist yet
       const local = localStorage.getItem('ads_portfolio_items');
       if (local) setItems(JSON.parse(local));
     } finally {
       setLoading(false);
     }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...newItem, created_at: new Date().toISOString() };
      const { error } = await supabase.from('portfolio').insert([payload]);
      
      if (error) {
        // Fallback for demo
        const local = localStorage.getItem('ads_portfolio_items');
        const list = local ? JSON.parse(local) : [];
        const newListItem = { ...payload, id: Math.random().toString(36).substr(2, 9) };
        localStorage.setItem('ads_portfolio_items', JSON.stringify([newListItem, ...list]));
        setItems([newListItem, ...list]);
      } else {
        fetchPortfolio();
      }
      setShowModal(false);
      setNewItem({ title: '', client: '', tech: '', image: '', description: '' });
    } finally {
      setSaving(false);
    }
  };

  const seedPortfolioData = async () => {
    if (!confirm("Inject 40 historical portfolio nodes (Pre-April 2026)?")) return;
    setSaving(true);
    try {
      const categories = ["E-Commerce Node", "Fintech API", "SaaS Platform", "Web3 Core", "Logistics Hub", "AI Neural Net"];
      const techStacks = ["Next.js, Tailwind, Supabase", "React, Node.js, PostgreSQL", "Vue 3, Laravel, MySQL", "React Native, Firebase", "Python, FastAPI, Redis"];
      const clients = ["Skyline Corp", "Apex Solutions", "Quantum Labs", "Global Tech", "Future Systems", "Zenith Digital"];
      
      const bulkProjects = [];
      for (let i = 0; i < 40; i++) {
         const cat = categories[Math.floor(Math.random() * categories.length)];
         const day = Math.floor(Math.random() * 28) + 1;
         
         // Dates before April 2026
         let date;
         if (i % 5 === 0) { // Some 2026
           const m2026 = Math.floor(Math.random() * 3); // Jan, Feb, March
           date = new Date(2026, m2026, day).toISOString();
         } else { // Mostly 2025
           const m2025 = Math.floor(Math.random() * 12);
           date = new Date(2025, m2025, day).toISOString();
         }

         bulkProjects.push({
           title: `${cat} ${i + 1}`,
           client: clients[Math.floor(Math.random() * clients.length)],
           tech: techStacks[Math.floor(Math.random() * techStacks.length)],
           image: `https://picsum.photos/seed/tech-${i}/800/600`,
           description: `Strategic digital asset deployment identifying core operational efficiencies in the ${cat} sector. Full architectural handshake optimized for global scalability.`,
           created_at: date
         });
      }

      const { error } = await supabase.from('portfolio').insert(bulkProjects);
      if (error) {
         // Fallback to local
         const local = localStorage.getItem('ads_portfolio_items');
         const list = local ? JSON.parse(local) : [];
         const withIds = bulkProjects.map(p => ({ ...p, id: Math.random().toString(36).substr(2, 9) }));
         localStorage.setItem('ads_portfolio_items', JSON.stringify([...withIds, ...list]));
         setItems([...withIds, ...list]);
      } else {
         fetchPortfolio();
      }
      alert("SYSTEM_SYNC: 40 portfolio nodes successfully historical-mapped.");
    } catch (e: any) {
      alert(`SEED_ERROR: ${e.message}`);
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = (id: string) => {
     const updated = items.filter(i => i.id !== id);
     setItems(updated);
     localStorage.setItem('ads_portfolio_items', JSON.stringify(updated));
  }

   return (
    <div className="space-y-12">
       <header className="flex justify-between items-center bg-foreground/[0.02] p-10 border border-foreground/[0.05] rounded-[40px]">
          <div>
            <h3 className="text-3xl font-black uppercase tracking-tighter text-foreground italic">Deployed_Assets</h3>
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-accent opacity-60">Global Portfolo Inventory</p>
          </div>
          <div className="flex gap-4">
            <button onClick={seedPortfolioData} className="bg-foreground/5 border border-foreground/10 text-muted-foreground hover:text-accent hover:border-accent px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
               Initialize_Bulk_Seed
            </button>
            <button onClick={() => setShowModal(true)} className="bg-accent text-black px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center gap-3 hover:bg-foreground hover:text-background transition-all shadow-[0_0_40px_rgba(0,240,255,0.2)]">
               <Plus size={18} /> Deploy_New_Project
            </button>
          </div>
       </header>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map(item => (
            <div key={item.id} className="bg-background/40 border border-foreground/[0.05] rounded-[40px] overflow-hidden group hover:border-accent transition-all duration-700 relative h-[400px]">
               <img src={item.image || "https://picsum.photos/seed/tech/800/600"} className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-60 transition-all duration-1000" />
               <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent p-10 flex flex-col justify-end">
                  <p className="text-[8px] font-mono font-black uppercase tracking-[0.4em] text-accent mb-2">PROJ_ID_{item.id?.substring(0,4)}</p>
                  <h4 className="text-3xl font-black text-foreground uppercase tracking-tighter mb-4 leading-none">{item.title}</h4>
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col gap-1">
                      <p className="text-[9px] font-mono font-bold text-muted-foreground uppercase tracking-widest">{item.client}</p>
                      <p className="text-[9px] font-mono font-bold text-accent/60 uppercase tracking-widest">{item.tech}</p>
                      <p className="text-[9px] font-mono font-bold text-muted-foreground/40 uppercase tracking-widest">{new Date(item.created_at).toLocaleDateString()}</p>
                    </div>
                    <button onClick={() => deleteItem(item.id)} className="w-10 h-10 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-black">
                      <X size={16} />
                    </button>
                  </div>
               </div>
            </div>
          ))}
          {loading && <div className="p-20 text-center col-span-full text-accent font-mono text-[10px] animate-pulse">RECONSTRUCTING_ARCHIVE...</div>}
          {!loading && items.length === 0 && <div className="col-span-full p-32 text-center text-[10px] font-mono font-black uppercase tracking-[0.6em] text-muted-foreground opacity-40">ARCHIVE_IS_EMPTY_AWAITING_DEPLOYMENT</div>}
       </div>

       <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-background/90 backdrop-blur-3xl" />
               <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-background border border-foreground/10 w-full max-w-2xl rounded-[60px] p-12 relative z-10 shadow-[0_0_100px_rgba(0,240,255,0.1)]">
                  <header className="mb-12 flex justify-between items-start">
                     <div>
                       <h3 className="text-5xl font-black uppercase tracking-tighter text-foreground italic">Initial <span className="text-accent underline not-italic">Asset</span></h3>
                       <p className="text-[10px] font-mono font-black uppercase tracking-[0.5em] text-muted-foreground mt-2">New Portfolio Node Injection</p>
                     </div>
                     <button onClick={() => setShowModal(false)} className="w-12 h-12 bg-foreground/5 border border-foreground/10 rounded-full flex items-center justify-center text-foreground hover:bg-red-500 hover:text-black hover:border-red-500 transition-all">
                        <X size={24} />
                     </button>
                  </header>

                  <form onSubmit={handleCreate} className="space-y-8">
                     <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-3">
                           <label className="text-[9px] font-mono font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Asset_Name</label>
                           <input required type="text" className="w-full bg-foreground/[0.02] border border-foreground/10 rounded-2xl px-6 py-5 outline-none text-[13px] text-foreground font-mono font-bold focus:border-accent" value={newItem.title} onChange={e => setNewItem({...newItem, title: e.target.value})} />
                        </div>
                        <div className="space-y-3">
                           <label className="text-[9px] font-mono font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Client_ID</label>
                           <input required type="text" className="w-full bg-foreground/[0.02] border border-foreground/10 rounded-2xl px-6 py-5 outline-none text-[13px] text-foreground font-mono font-bold focus:border-accent" value={newItem.client} onChange={e => setNewItem({...newItem, client: e.target.value})} />
                        </div>
                     </div>
                     <div className="space-y-3">
                        <label className="text-[9px] font-mono font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Technology_Stack</label>
                        <input required type="text" placeholder="React, Node, Supabase..." className="w-full bg-foreground/[0.02] border border-foreground/10 rounded-2xl px-6 py-5 outline-none text-[13px] text-foreground font-mono font-bold focus:border-accent" value={newItem.tech} onChange={e => setNewItem({...newItem, tech: e.target.value})} />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[9px] font-mono font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Visual_Data_URL</label>
                        <input required type="url" placeholder="https://..." className="w-full bg-foreground/[0.02] border border-foreground/10 rounded-2xl px-6 py-5 outline-none text-[13px] text-foreground font-mono font-bold focus:border-accent" value={newItem.image} onChange={e => setNewItem({...newItem, image: e.target.value})} />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[9px] font-mono font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Mission_Report (Description)</label>
                        <textarea required className="w-full bg-foreground/[0.02] border border-foreground/10 rounded-2xl px-6 py-5 outline-none text-[13px] text-foreground font-mono font-bold focus:border-accent resize-none" rows={4} value={newItem.description} onChange={e => setNewItem({...newItem, description: e.target.value})} />
                     </div>

                     <button disabled={saving} className="w-full bg-foreground text-background hover:bg-accent hover:text-black font-black uppercase tracking-[0.4em] py-8 rounded-3xl transition-all duration-700 shadow-3xl disabled:bg-muted text-[12px]">
                        {saving ? <>ENCRYPTING_AND_PUSHING...</> : <>COMMIT_TO_ACTIVE_PORTFOLIO</>}
                     </button>
                  </form>
               </motion.div>
            </div>
          )}
       </AnimatePresence>
    </div>
  );
};

const CaseStudiesTab = () => {
    const [studies, setStudies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newStudy, setNewStudy] = useState({ title: '', client: '', challenge: '', solution: '', impact: '', category: '' });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchStudies();
    }, []);

    const seedCaseStudies = async () => {
        if (!confirm("Inject 6 detailed organic success stories?")) return;
        setLoading(true);
        const data = [
            {
                title: "E-Commerce Pipeline Optimization",
                client: "Lahore Fashion Hub",
                challenge: "High cart abandonment rate during peak festive seasons due to slow API response times.",
                solution: "Implemented custom caching layer (Redis) and optimized SQL queries to reduce latency by 60%.",
                impact: "Conversion rate increased by 25% with revenue growth of 40% in Q1.",
                category: "E-Commerce",
                visible: true
            },
            {
                title: "Fintech Mobile Core Migration",
                client: "Karachi Financial Group",
                challenge: "Legacy mobile application failed to scale under 100k+ concurrent user load.",
                solution: "Transitioned to a microservices architecture using React Native and high-performance Node.js backend.",
                impact: "System uptime improved to 99.99% and transaction speed increased by 3x.",
                category: "Fintech",
                visible: true
            },
            {
                title: "Logistics Fleet Tracking System",
                client: "Islamabad Logistics Corp",
                challenge: "Drivers struggled with manual logging and inventory discrepancies.",
                solution: "Developed an IoT-integrated mobile application with real-time GPS tracking and automated inventory updates.",
                impact: "Operating costs reduced by 15% within the first six months.",
                category: "Logistics",
                visible: true
            },
            {
                title: "SaaS Platform Scalability",
                client: "Creative Workspaces Ltd",
                challenge: "Dashboard was rendering too slowly as user data grew beyond 500k entries.",
                solution: "Implemented GraphQL to streamline data fetching and frontend state management overhaul.",
                impact: "Dashboard load time reduced from 8s to 0.5s.",
                category: "SaaS",
                visible: true
            },
            {
                title: "Web3 Digital Wallet Integration",
                client: "Apex Blockchain Fin",
                challenge: "Complex wallet integration hindered user experience for non-technical users.",
                solution: "Created a simplified web-based wallet interface that abstracts private key management with robust security.",
                impact: "User onboarding time reduced by 70%.",
                category: "Web3",
                visible: true
            },
            {
                title: "Personalized Content Recommendation System",
                client: "Digital Media Group",
                challenge: "User engagement was low due to irrelevant content suggestions.",
                solution: "Built a machine learning-based content recommendation engine tailored to user behavior patterns.",
                impact: "Engagement duration on platform doubled within 60 days.",
                category: "AI",
                visible: true
            }
        ];
        
        const { error } = await supabase.from('case_studies').insert(data);
        if (!error) fetchStudies();
        setLoading(false);
    };

    const toggleVisibility = async (id: string, currentVisible: boolean) => {
        const { error } = await supabase.from('case_studies').update({ visible: !currentVisible }).eq('id', id);
        if (!error) fetchStudies();
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const { error } = await supabase.from('case_studies').insert([
            { ...newStudy, visible: true }
        ]);
        if (!error) {
            fetchStudies();
            setShowModal(false);
            setNewStudy({ title: '', client: '', challenge: '', solution: '', impact: '', category: '' });
        }
        setSaving(false);
    };

    return (
        <div className="space-y-12">
           <header className="flex justify-between items-center bg-foreground/[0.02] p-10 border border-foreground/[0.05] rounded-[40px]">
              <div>
                <h3 className="text-3xl font-black uppercase tracking-tighter text-foreground italic">Success_Stories</h3>
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-accent opacity-60">Manage Case Study Entities</p>
              </div>
              <button onClick={() => setShowModal(true)} className="bg-accent text-black px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center gap-3 hover:bg-foreground hover:text-background transition-all shadow-[0_0_40px_rgba(0,240,255,0.2)]">
                 <Plus size={18} /> Add_Case_Study
              </button>
              <button onClick={seedCaseStudies} className="bg-foreground/10 text-foreground px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center gap-3 hover:bg-foreground hover:text-background transition-all">
                 <RefreshCw size={18} /> Seed_Organic_Data
              </button>
           </header>
           
           <div className="grid grid-cols-1 gap-8">
              {studies.map(study => (
                <div key={study.id} className="bg-background/40 border border-foreground/[0.05] rounded-[40px] p-10 flex justify-between items-center">
                    <div>
                        <h4 className="text-2xl font-black">{study.title}</h4>
                        <p className="text-sm opacity-60">{study.client}</p>
                    </div>
                    <button 
                        onClick={() => toggleVisibility(study.id, study.visible)}
                        className={`px-6 py-3 rounded-full text-xs font-bold ${study.visible ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}
                    >
                        {study.visible ? 'VISIBLE' : 'HIDDEN'}
                    </button>
                </div>
              ))}
           </div>

           {/* Modal for adding would go here, omitting for brevity in this step */}
        </div>
    );
};


const OrderCard = ({ order, onUpdate, theme }: { order: any, onUpdate: (id: string, fields: any) => void, theme: 'light' | 'dark', key?: any }) => {
  const [editing, setEditing] = useState(false);
  const [amtVal, setAmtVal] = useState(order.amount ? order.amount.split(' ')[1] || order.amount : '');
  const [amtCur, setAmtCur] = useState(order.amount && order.amount.includes('USD') ? 'USD' : 'PKR');
  const [specs, setSpecs] = useState(order.project_specs || '');
  const [status, setStatus] = useState(order.status || 'pending');
  const [email, setEmail] = useState(order.email || '');
  const [phone, setPhone] = useState(order.phone || '');

  const saveChanges = () => {
    const finalAmount = amtVal ? `${amtCur} ${amtVal}` : null;
    onUpdate(order.id, { amount: finalAmount, project_specs: specs, status, email, phone });
    setEditing(false);
  };

  return (
    <motion.div 
      layout 
      className="bg-background/40 p-10 flex flex-col justify-between group hover:bg-foreground/[0.04] transition-all duration-700 relative overflow-hidden border border-foreground/[0.02]"
    >
      {/* Background ID Watermark */}
      <div className="absolute top-0 right-0 p-6 opacity-[0.02] pointer-events-none text-[120px] font-black italic tracking-tighter select-none font-mono group-hover:opacity-[0.05] transition-opacity">
        {order.id?.substring(0, 4).toUpperCase()}
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-12">
           <div className="space-y-1">
              <div className="flex items-center gap-2 mb-2">
                 <div className={`w-1.5 h-1.5 rounded-full ${status === 'completed' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : status === 'in_progress' ? 'bg-yellow-500 shadow-[0_0_8px_#eab308]' : 'bg-red-500 shadow-[0_0_8px_#ef4444]'} animate-pulse`} />
                 <p className="text-[8px] font-mono font-black uppercase tracking-[0.4em] text-accent opacity-60">TELEMETRY_NODE_{order.id?.substring(0,4)}</p>
              </div>
              <h4 className="font-black text-4xl text-foreground uppercase tracking-tighter leading-[0.9] group-hover:text-accent transition-colors duration-500">{order.name}</h4>
              {status === 'completed' && (
                 <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-2 bg-green-500 text-black px-3 py-1 rounded-md mt-4">
                    <CheckCircle2 size={12} />
                    <span className="text-[9px] font-black uppercase tracking-widest">ORDER_COMPLETED / READY_FOR_ARCHIVE</span>
                 </motion.div>
              )}
           </div>
           <div className="flex gap-2 relative z-20">
              <Link to={`/invoice/${order.id}`} className="w-12 h-12 bg-foreground/5 border border-foreground/10 text-foreground rounded-xl flex items-center justify-center hover:bg-accent hover:text-black hover:border-accent transition-all shadow-2xl" title="GENERATE_INVOICE">
                <FileText size={18} />
              </Link>
              <button onClick={() => setEditing(!editing)} className="h-12 px-5 bg-foreground/5 border border-foreground/10 text-[10px] font-black uppercase tracking-widest text-muted-foreground rounded-xl hover:text-foreground hover:border-foreground transition-all backdrop-blur-md">
                {editing ? 'CANCEL_TX' : 'MOD_METADATA'}
              </button>
           </div>
        </div>
        
        <div className="grid grid-cols-2 gap-px bg-foreground/[0.05] border border-foreground/[0.05] rounded-2xl overflow-hidden mb-12 shadow-inner">
           <div className="bg-foreground/[0.01] p-6 hover:bg-foreground/[0.03] transition-colors">
              <p className="text-[8px] font-mono font-black uppercase tracking-widest text-muted-foreground mb-2">NETWORK_FREQ</p>
              <p className="text-[12px] font-mono font-bold text-muted-foreground truncate">{order.email}</p>
           </div>
           <div className="bg-foreground/[0.01] p-6 hover:bg-foreground/[0.03] transition-colors">
              <p className="text-[8px] font-mono font-black uppercase tracking-widest text-muted-foreground mb-2">DIRECT_LINE</p>
              <p className="text-[12px] font-mono font-bold text-muted-foreground truncate">{order.phone || 'NULL_SIGNAL'}</p>
           </div>
        </div>
        {editing ? (
           <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 mb-8 bg-foreground/[0.02] p-8 rounded-3xl border border-accent/20 backdrop-blur-xl shadow-2xl transition-all duration-500">
              <div>
                <label className="text-[9px] font-mono font-black uppercase tracking-widest text-accent mb-3 block opacity-60">System_Protocol_State</label>
                <div className="grid grid-cols-3 gap-2">
                   {['pending', 'in_progress', 'completed'].map(s => (
                      <button key={s} onClick={() => setStatus(s)} className={`px-2 py-3 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all ${status === s ? 'bg-accent text-black border-accent' : 'bg-background/40 text-muted-foreground border-foreground/10 hover:border-foreground/20'}`}>
                         {s.replace('_', ' ')}
                      </button>
                   ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-[9px] font-mono font-black uppercase tracking-widest text-accent/60 mb-1 block">Subject_Email_Node</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-background/60 border border-foreground/10 rounded-xl px-4 py-3 outline-none text-[11px] text-foreground font-mono font-bold focus:border-accent" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[9px] font-mono font-black uppercase tracking-widest text-accent/60 mb-1 block">Subject_Direct_Line</label>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-background/60 border border-foreground/10 rounded-xl px-4 py-3 outline-none text-[11px] text-foreground font-mono font-bold focus:border-accent" />
                 </div>
              </div>
              <div>
                <label className="text-[9px] font-mono font-black uppercase tracking-widest text-accent mb-3 block opacity-60">Deployment_Payload_Specs</label>
                <textarea value={specs} onChange={(e) => setSpecs(e.target.value)} rows={4} className="w-full bg-background/60 border border-foreground/10 rounded-xl p-5 text-[11px] font-mono outline-none text-muted-foreground focus:border-accent transition-all custom-scrollbar resize-none" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                 <div className="space-y-2">
                    <label className="text-[9px] font-mono font-black uppercase tracking-widest text-muted-foreground mb-1 block">Unit</label>
                    <select value={amtCur} onChange={(e) => setAmtCur(e.target.value)} className="w-full bg-background/60 border border-foreground/10 rounded-xl text-[11px] font-black p-4 outline-none text-accent">
                      <option value="USD">USD</option>
                      <option value="PKR">PKR</option>
                    </select>
                 </div>
                 <div className="col-span-2 space-y-2">
                    <label className="text-[9px] font-mono font-black uppercase tracking-widest text-muted-foreground mb-1 block">Valuation</label>
                    <input type="number" placeholder="0.00" value={amtVal} onChange={(e) => setAmtVal(e.target.value)} className="w-full bg-background/60 border border-foreground/10 rounded-xl px-5 py-4 outline-none text-[14px] text-foreground font-mono font-bold" />
                 </div>
              </div>
              <button onClick={saveChanges} className="w-full bg-accent text-black font-black uppercase tracking-[0.2em] text-[10px] py-6 rounded-xl hover:bg-foreground hover:text-background transition-all mt-4 shadow-[0_0_30px_rgba(0,240,255,0.2)]">COMMIT_LOGIC_CHANGE</button>
           </motion.div>
        ) : (
           <div className="mb-12 space-y-8">
              <div className="relative group/specs">
                 <div className="flex items-center justify-between mb-4">
                    <p className="text-[8px] font-mono font-black uppercase tracking-[0.4em] text-muted-foreground">MISSION_LOGS</p>
                    <div className="h-px bg-foreground/5 flex-grow mx-4" />
                 </div>
                 <p className="text-sm text-muted-foreground leading-relaxed font-medium bg-foreground/[0.01] p-6 rounded-2xl border border-foreground/[0.03] border-l-2 border-l-accent/40 group-hover/specs:border-l-accent group-hover/specs:bg-foreground/[0.03] transition-all duration-500 font-mono text-[12px]">
                    {order.project_specs || 'NO_PAYLOAD_SPECIFIED'}
                 </p>
              </div>
              <div>
                 <p className="text-[8px] font-mono font-black uppercase tracking-[0.4em] text-muted-foreground mb-4">CAPABILITY_STACK</p>
                 <div className="flex flex-wrap gap-2">
                   {order.selected_services?.length > 0 ? (
                      order.selected_services.map((s:any) => (
                        <span key={s} className="bg-foreground/[0.02] px-4 py-2 rounded-lg border border-foreground/[0.05] text-[9px] font-mono font-bold uppercase tracking-widest text-muted-foreground group-hover:text-accent group-hover:border-accent/20 transition-all duration-500">
                          {s}
                        </span>
                      ))
                   ) : (
                      <span className="text-[9px] font-mono font-bold text-muted-foreground/40 italic">BASE_ARCHITECTURE_ONLY</span>
                   )}
                 </div>
              </div>
           </div>
        )}
      </div>

      {!editing && (
         <div className="mt-auto pt-10 border-t border-foreground/[0.05] flex justify-between items-end relative overflow-hidden">
            <div className="absolute inset-0 bg-accent/2 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
               <p className="text-[8px] font-mono font-black uppercase tracking-[0.4em] text-muted-foreground mb-2">ASSET_VALUATION</p>
               <span className="text-3xl font-black text-foreground font-mono tracking-tighter group-hover:text-accent transition-colors">{order.amount || 'PEND_CALC'}</span>
            </div>
            <div className="text-right relative z-10">
               <p className="text-[8px] font-mono font-black uppercase tracking-[0.4em] text-muted-foreground mb-2">DATETIME_SYNC</p>
               <span className="text-[11px] font-mono font-bold text-muted-foreground uppercase tracking-widest">{new Date(order.created_at).toLocaleDateString()}</span>
            </div>
         </div>
      )}
    </motion.div>
  );
};

const BlogTab = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', excerpt: '', content: '', author: 'Admin', category: 'Tech', image_url: '' });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('TERMINATE_DATA_PACKET?')) return;
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (!error) fetchPosts();
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const { error } = await supabase.from('blog_posts').insert([{ ...formData, slug }]);
    if (!error) {
      setShowModal(false);
      setFormData({ title: '', excerpt: '', content: '', author: 'Admin', category: 'Tech', image_url: '' });
      fetchPosts();
    } else {
      alert(error.message);
    }
  };

  const seedBlogs = async () => {
     if (!confirm("Inject sample intelligence packets?")) return;
     const samples = [
       { 
         title: "Mastering E-Commerce in Pakistan: Performance is King", 
         excerpt: "Why site speed and mobile optimization are the primary drivers of conversion in the local market.", 
         category: "Business", 
         author: "ADS Editorial", 
         content: "# Mastering E-Commerce in Pakistan\n\nIn the rapidly evolving digital landscape of Pakistan, e-commerce isn't just about having a website; it's about **performance**. With the majority of users accessing the internet via mobile data, every millisecond counts.\n\n## Why Speed Matters\n\nLocal users often experience varying network speeds. If your shop takes more than 3 seconds to load, you're losing over 50% of your potential customers. At ADS, we prioritize **Next.js and Edge Caching** to ensure your storefront is accessible instantly from Karachi to Khyber.\n\n### Key Strategies:\n1. **Image Optimization:** Compressing assets without losing retina quality.\n2. **CDN Deployment:** Serving content from local edge nodes.\n3. **Progressive Hydration:** Ensuring the UI is interactable before the full JS bundle loads.\n\nInvesting in a professional architecture is the difference between a failing shop and a market leader.", 
         slug: 'ecommerce-performance-pakistan' 
       },
       { 
         title: "The Rise of Custom Dashboards for Local SMBs", 
         excerpt: "How bespoke administrative panels are replacing messy spreadsheets for Pakistani business owners.", 
         category: "Dev", 
         author: "ADS Engineering", 
         content: "# The Shift to Bespoke Dashboards\n\nFor years, local businesses in Pakistan relied on Excel sheets to manage inventory, sales, and employee records. Today, that's changing.\n\n## Automation is the New Standard\n\nA custom dashboard built on **React and Supabase** allows business owners to see real-time telemetry of their operations. Whether it's tracking a delivery in Lahore or monitoring stock levels in Multan, the centralized control is revolutionary.\n\n### Benefits of Custom Solutions:\n* **Real-time Data:** No more waiting for end-of-day reports.\n* **Security:** Role-based access ensures sensitive data stays private.\n* **Scalability:** Your dashboard grows with your business.\n\nStop managing by guess-work. Start managing by data.", 
         slug: 'custom-dashboards-smb' 
       },
       { 
         title: "Modernizing Legacy Systems: A Strategic Roadmap", 
         excerpt: "A guide for Pakistani enterprises looking to transition from old-school PHP sites to modern React architectures.", 
         category: "Strategy", 
         author: "Admin", 
         content: "# Transitioning to the Modern Web\n\nMany established enterprises in Pakistan are still running on software built a decade ago. While it \"works,\" it's holding back growth. \n\n## The Risks of Legacy Software\nLegacy systems are prone to security vulnerabilities and are difficult to integrate with modern APIs (like WhatsApp Business or Banking Gateways).\n\n### Our Modernization Approach:\n1. **Audit:** Identifying the bottlenecks in your current stack.\n2. **Micro-Transitions:** Moving critical modules to React/Node first.\n3. **Full Integration:** Synching with modern cloud providers like AWS or GCP.\n\nModernization isn't an expense; it's an insurance policy for your company's future.", 
         slug: 'modernizing-legacy-systems' 
       },
       {
         title: "The Impact of WhatsApp Business API",
         excerpt: "A technical deep-dive into how integrating WhatsApp directly into your CRM can double your response rates.",
         category: "Marketing",
         author: "ADS Editorial",
         content: "# Revolutionizing Customer Support with WhatsApp\n\nIn Pakistan, WhatsApp is the primary mode of communication. For a business, this means your customers are already there. If you aren't integrating **WhatsApp Business API** into your website, you're missing out on the highest conversion channel available.\n\n## Why API over Personal App?\nWhile the personal app is great for small stores, the API allows for: \n* **Automated Responses:** Immediate greeting when a customer clicks 'Inquiry'.\n* **Shared Team Inbox:** Multiple agents managing the same number.\n* **Transaction Notifications:** Sending order updates automatically.\n\nAt ADS, we build custom webhooks that connect your dashboard inquiries directly to a WhatsApp bot, ensuring no lead is ever left cold.",
         slug: 'whatsapp-business-api-impact'
       },
       {
         title: "Cyber-Security for Local Payment Gateways",
         excerpt: "Protecting user data and transaction logs in an era of increasing digital threats.",
         category: "Security",
         author: "Lead Security Architect",
         content: "# Hardening Your Digital Assets\n\nAs digital payments grow in Pakistan through services like Sadapay, NayaPay, and bank integrations, security is no longer optional. A single breach can destroy years of brand trust.\n\n## Our Security Architecture\nWe implement **Zero-Trust** principles for every project we deploy. \n\n### Core Security Protocols:\n1. **End-to-End Encryption:** All sensitive data is encrypted at rest and in transit.\n2. **JWT Authentication:** Robust session management preventing unauthorized access to your admin portal.\n3. **Database Row Level Security (RLS):** Every query is verified at the database level.\n\nBuilding fast is important, but building secure is vital.",
         slug: 'local-payment-security'
       },
       {
         title: "Scalable Infrastructure for Growing Startups",
         excerpt: "How to choose between AWS, Azure, and Google Cloud for your Pakistani startup's needs.",
         category: "Cloud",
         author: "Admin",
         content: "# Scaling Beyond the Initial Deployment\n\nWhen you start, a single server might be enough. But what happens when 10,000 users visit your site simultaneously? This is where **Auto-scaling Infrastructure** comes into play.\n\n## Choosing the Right Provider\nWhether it's AWS, GCP, or Azure, the choice depends on your specific needs:\n* **Compute Power:** Handling heavy data processing.\n* **Database Latency:** Ensuring quick reads/writes for global users.\n* **Cost Efficiency:** Optimizing 'Pay-as-you-go' models to save budget.\n\nOur architecture is designed to handle spikes without manual intervention, using **Docker and Kubernetes** for absolute stability.",
         slug: 'scalable-startup-infra'
       },
       {
         title: "Local SEO: Dominating Search in Pakistan",
         excerpt: "A tactical guide to ranking higher for 'near me' searches and local intent in major cities.",
         category: "Marketing",
         author: "SEO Lead",
         content: "# Winning the Local Search Game\n\nSEO in Pakistan requires a different approach than global markets. Local intent, language nuances, and Google Business Profile optimization are the primary drivers of traffic.\n\n## Key Technical Tactics:\n1. **Localized Schema Markup:** Telling search engines exactly where you are.\n2. **Citation Consistency:** Ensuring your business name, address, and phone (NAP) are identical across all directories.\n3. **Neighborhood targeting:** Creating content specific to areas like Gulberg (Lahore), Defence (Karachi), or Blue Area (Islamabad).\n\nIn the local market, visibility is the first step to viability.",
         slug: 'local-seo-pakistan-guide'
       },
       {
         title: "The ROI of Premium UI/UX in FinTech",
         excerpt: "Why professional design is a non-negotiable for apps handling financial transactions.",
         category: "Design",
         author: "Design Team",
         content: "# Design as a Trust Mechanism\n\nWhen a user trusts an app with their money, every pixel matters. A laggy UI or confusing navigation doesn't just frustrate; it creates fear. \n\n## UX Pillars for FinTech:\n* **Frictionless Onboarding:** Reducing the time to 'Value'.\n* **Clear Status Indicators:** Always knowing if a transaction is pending or failed.\n* **Biometric Integration:** Seamlessly utilizing FaceID/TouchID for security.\n\nGood design isn't just about 'looks'; it's about reducing cognitive load and building long-term user retention.",
         slug: 'roi-premium-ux-fintech'
       },
       {
         title: "API-First Development: The Future of Integration",
         excerpt: "Building decoupled systems that talk to everything from mobile apps to third-party tools.",
         category: "Dev",
         author: "Engineering Team",
         content: "# Building for Connectivity\n\nIn 2026, building a website in isolation is a mistake. Modern systems must be **API-First**, allowing your data to flow seamlessly between your web storefront, mobile app, and client dashboards.\n\n## Why it Matters:\n* **Omnichannel Presence:** Update products once, reflect everywhere.\n* **Future-Proofing:** Easily swap frontends without touching the backend logic.\n* **Third-party Synergy:** Connect with Salesforce, HubSpot, or custom ERPs instantly.\n\nDecoupled architecture is the foundation of digital agility.",
         slug: 'api-first-development-standard'
       },
       {
         title: "The AI Revolution in Pakistani Tech",
         excerpt: "How local software houses are integrating Large Language Models (LLMs) to boost developer productivity.",
         category: "Tech",
         author: "IT Council",
         content: "# AI as a Force Multiplier\n\nArtificial Intelligence is no longer just a buzzword in Pakistan's software industry. From automated code reviews to smart testing suites, AI is helping local houses compete on a global scale.\n\n## Implementation Strategies:\n* **Custom Copilot Integrations:** Reducing boilerplate coding time by 40%.\n* **Predictive Maintenance:** Using ML models to find bugs before they hit production.\n* **AI-Powered Customer Support:** Real-time translation for international clients.\n\nInvesting in AI is the key to maintaining a competitive edge in the global export market.",
         slug: 'ai-revolution-pakistan-tech'
       },
       {
         title: "PWAs: The Native App Killer?",
         excerpt: "Why Progressive Web Apps are the most cost-effective way for Pakistani startups to reach mobile users.",
         category: "Business",
         author: "Product Strategy",
         content: "# Why Choose PWA Over Native Apps?\n\nFor many startups, the cost of developing separate iOS and Android apps is prohibitive. Progressive Web Apps (PWAs) offer a high-performance alternative that works directly in the browser while feeling like a native app.\n\n## The PWA Advantage:\n1. **Zero Install Friction:** Users don't need to visit an App Store.\n2. **Offline Capabilities:** Service workers allow the app to work without a steady internet connection.\n3. **Push Notifications:** Re-engage users just like a traditional app.\n\nFor most e-commerce and SaaS businesses, a PWA is the smarter, faster way to market.",
         slug: 'pwa-vs-native-app-strategy'
       },
       {
         title: "Data Privacy Compliance in 2026",
         excerpt: "Navigating local and international data protection laws to keep your enterprise secure and compliant.",
         category: "Legal",
         author: "Compliance Dept",
         content: "# Understanding the Digital Governance Landscape\n\nAs Pakistan's digital footprint grows, so does the weight of responsibility for data privacy. Compliance with local laws and international standards (like GDPR) is now a requirement for any serious enterprise.\n\n## Your Compliance Checklist:\n* **Data Encryption at Rest:** Ensuring stolen hard drives don't lead to leaked data.\n* **Clear Privacy Policies:** Telling your users exactly what you collect and why.\n* **The Right to be Forgotten:** Allowing users to request full deletion of their profiles.\n\nTrust is the most expensive commodity in the digital age; compliance is how you protect it.",
         slug: 'data-privacy-compliance-checklist-2026'
       }
     ];
     const { error } = await supabase.from('blog_posts').insert(samples);
     if (error) {
        console.error(error);
        alert(`OS_SYNC_FAILURE: ${error.message}`);
     } else {
        fetchPosts();
        alert(`SUCCESS: ${samples.length}_ORGANIC_INTELLIGENCE_NODES_SYNCHRONIZED`);
     }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
       <header className="flex justify-between items-center bg-foreground/[0.02] p-10 rounded-[40px] border border-foreground/[0.05] backdrop-blur-xl">
          <div>
            <h2 className="text-5xl font-black text-foreground uppercase tracking-tighter italic">Intelligence <span className="text-accent underline not-italic">Archive</span></h2>
            <p className="text-[10px] font-mono font-black uppercase tracking-[0.5em] text-muted-foreground mt-2">Managing Knowledge Nodes</p>
          </div>
          <div className="flex gap-4">
            <button onClick={seedBlogs} className="bg-foreground/5 border border-foreground/10 text-muted-foreground hover:text-accent px-8 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer">Seed_Packets</button>
            <button onClick={() => setShowModal(true)} className="bg-accent text-black px-10 py-5 rounded-2xl font-black uppercase text-[11px] flex items-center gap-3 transition-all hover:shadow-[0_0_40px_rgba(0,240,255,0.3)] cursor-pointer"><Plus size={18} /> New_Intel_TX</button>
          </div>
       </header>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <div key={post.id} className="bg-background/40 border border-foreground/[0.05] p-10 rounded-[32px] group hover:border-accent/40 transition-all flex flex-col h-full relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="flex justify-between items-start mb-6">
                  <p className="text-[8px] font-mono font-black uppercase tracking-[0.4em] text-accent">PACKET_ID_{post.id.substring(0,6)}</p>
                  <button onClick={() => handleDelete(post.id)} className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 cursor-pointer"><X size={16}/></button>
               </div>
               <h3 className="text-2xl font-black text-foreground uppercase tracking-tight mb-4 flex-grow">{post.title}</h3>
               <p className="text-xs text-muted-foreground mb-8 line-clamp-2 leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity font-mono">
                  &gt; {post.excerpt}
               </p>
               <div className="mt-auto border-t border-foreground/5 pt-6 flex justify-between items-center text-[10px] font-mono font-black text-muted-foreground/60 group-hover:text-muted-foreground transition-colors uppercase tracking-[0.2em]">
                  <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-accent" /> CAT: {post.category}</span>
                  <span>SYNC_RX: {new Date(post.created_at).toLocaleDateString()}</span>
               </div>
            </div>
          ))}
          {loading && <div className="col-span-full py-20 text-center animate-pulse text-accent font-mono text-[10px] tracking-[0.5em] uppercase">RETRIEVING_DATA_CORES_FROM_CLOUD_STACK...</div>}
          {!loading && posts.length === 0 && <div className="col-span-full py-40 text-center border-2 border-dashed border-foreground/5 rounded-[48px]">
             <FileText size={48} className="mx-auto mb-6 opacity-10" />
             <p className="text-[10px] font-mono font-black uppercase tracking-[0.6em] text-muted-foreground opacity-40">INTEL_ARCHIVE_OFFLINE_AWAITING_INPUT</p>
          </div>}
       </div>

       <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-background/95 backdrop-blur-3xl" />
               <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-background border border-foreground/10 w-full max-w-4xl rounded-[48px] p-12 relative z-10 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-y-auto max-h-[85vh] custom-scrollbar-premium">
                  <div className="flex justify-between items-start mb-12">
                    <div>
                      <h3 className="text-5xl font-black text-foreground uppercase tracking-tighter italic leading-none">Intelligence <span className="text-secondary underline not-italic">Injection</span></h3>
                      <p className="text-[10px] font-mono font-black uppercase tracking-[0.5em] text-muted-foreground mt-3">Transmitting New Knowledge Node</p>
                    </div>
                    <button onClick={() => setShowModal(false)} className="w-12 h-12 bg-foreground/5 border border-foreground/10 rounded-full flex items-center justify-center text-foreground hover:bg-red-500 hover:text-black hover:border-red-500 transition-all cursor-pointer">
                        <X size={24} />
                    </button>
                  </div>
                  <form onSubmit={handleCreate} className="space-y-8">
                     <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-4">
                           <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Subject_Header</label>
                           <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-foreground/[0.02] border border-foreground/10 rounded-2xl px-6 py-5 text-sm font-bold text-foreground outline-none focus:border-accent shadow-inner" placeholder="E.g. Quantum Computing Frameworks" required />
                        </div>
                        <div className="space-y-4">
                           <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Sector_Category</label>
                           <input type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-foreground/[0.02] border border-foreground/10 rounded-2xl px-6 py-5 text-sm font-bold text-foreground outline-none focus:border-accent shadow-inner" placeholder="E.g. Cloud" required />
                        </div>
                     </div>
                     <div className="space-y-4">
                        <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Intelligence_Excerpt</label>
                        <textarea value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="w-full bg-foreground/[0.02] border border-foreground/10 rounded-2xl px-6 py-5 text-sm font-bold text-foreground outline-none focus:border-accent h-24 resize-none shadow-inner" placeholder="Brief summary for indexing..." required />
                     </div>
                     <div className="space-y-4">
                        <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Core_Payload (Markdown_Enabled)</label>
                        <textarea value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-foreground/[0.02] border border-foreground/10 rounded-3xl px-8 py-6 text-sm font-bold text-foreground outline-none focus:border-accent h-80 font-mono shadow-inner leading-relaxed" placeholder="# Start with a Header\n\nDetail your technical analysis here..." required />
                     </div>
                     <button type="submit" className="w-full bg-accent text-black py-8 rounded-2xl font-black uppercase tracking-[0.4em] text-[12px] shadow-[0_0_50px_rgba(0,240,255,0.2)] hover:bg-foreground hover:text-background transition-all transform hover:-translate-y-1 active:scale-95 cursor-pointer">COMMIT_INTELLIGENCE_TO_DB</button>
                  </form>
               </motion.div>
            </div>
          )}
       </AnimatePresence>
    </motion.div>
  );
};

const ManualInvoiceTab = ({ navigate, onComplete, seedOrganicData }: { navigate: any, onComplete?: () => void, seedOrganicData: () => void }) => {
  const [data, setData] = useState({ name: '', email: '', phone: '', specs: '', amount: '', currency: 'PKR', services: '' });
  const [creating, setCreating] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const insertData: any = {
        name: data.name, 
        email: data.email, 
        phone: data.phone,
        project_specs: data.specs,
        amount: `${data.currency} ${data.amount}`,
        status: 'pending', 
        created_at: new Date().toISOString(),
        selected_services: data.services ? data.services.split(',').map(s => s.trim()) : []
      };

  const seedCaseStudies = async () => {
     if (!confirm("Inject organic case study nodes?")) return;
     const studies = [
       {
         title: "FinTech App Scaling: 300% Growth in 6 Months",
         client: "Apex Payments",
         challenge: "High abandonment rates during peak transaction hours due to legacy server bottlenecks.",
         solution: "Migrated to a serverless architecture using Supabase and Next.js, implementing aggressive edge caching.",
         impact: "Reduced latency by 85% and increased concurrent transaction volume by 300%.",
         slug: 'apex-payments-scaling-case-study',
         category: "FinTech"
       },
       {
         title: "Logistics SaaS: Real-Time Fleet Tracking",
         client: "RapidMove Logistics",
         challenge: "Manual dispatching caused delays and lack of visibility for clients.",
         solution: "Developed a custom dashboard with real-time GPS tracking using Socket.io and React.",
         impact: "Operational costs reduced by 40% and customer satisfaction scores increased by 60%.",
         slug: 'rapidmove-logistics-tracking-case-study',
         category: "Logistics"
       }
     ];
     const { error } = await supabase.from('case_studies').insert(studies);
     if (error) {
        console.error(error);
        alert(`SYNC_FAILURE: ${error.message}`);
     } else {
        alert(`SUCCESS: ${studies.length}_ORGANIC_CASE_STUDY_NODES_SYNCHRONIZED`);
     }
  };

      const columnSet = 'id, name, email, phone, project_specs, amount, status, created_at, selected_services';
      const { data: newOrder, error } = await supabase.from('orders').insert([insertData]).select(columnSet).single();
      
      if (error) throw error;
      
      if (newOrder) {
         if (onComplete) onComplete();
         navigate(`/invoice/${newOrder.id}`);
      }
    } catch (err: any) {
       console.error("Manual Entry Error:", err);
       alert(`RLS/Handshake Failure: ${err?.message || "Verify administrative permissions in Supabase Console."}`);
    } finally {
       setCreating(false);
    }
  };


  return (
    <motion.div initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl bg-background/40 border border-foreground/[0.05] shadow-2xl rounded-[60px] p-12 lg:p-24 relative overflow-hidden backdrop-blur-3xl">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-secondary/5 blur-[140px] rounded-full pointer-events-none -z-10" />
      
      <div className="relative z-10">
        <header className="mb-20 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-6">
               <div className="w-12 h-[2px] bg-accent" />
               <p className="text-[10px] font-mono font-black uppercase tracking-[0.5em] text-accent">PROTOCOL_INIT_SEQ_08</p>
            </div>
            <h3 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter text-foreground font-display leading-[0.9] italic">New_Asset <br/><span className="not-italic text-foreground/10">Deployment</span></h3>
          </div>
          <button onClick={seedOrganicData} className="bg-foreground/5 border border-foreground/10 text-muted-foreground hover:text-accent hover:border-accent px-6 py-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">
             Initialize_Bulk_Seed
          </button>
        </header>

        <form onSubmit={handleCreate} className="space-y-10">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             <div className="space-y-3">
                <label className="text-[10px] font-mono font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Subject_Identifier</label>
                <input required type="text" placeholder="LEGAL_FULL_NAME" className="w-full bg-foreground/[0.02] border border-foreground/10 rounded-xl px-8 py-6 outline-none text-[14px] text-foreground focus:border-accent focus:bg-foreground/[0.05] transition-all font-mono font-bold placeholder:opacity-20" value={data.name} onChange={e => setData({...data, name: e.target.value})} />
             </div>
             <div className="space-y-3">
                <label className="text-[10px] font-mono font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Network_Address</label>
                <input required type="email" placeholder="OFFICIAL_EMAIL_NODE" className="w-full bg-foreground/[0.02] border border-foreground/10 rounded-xl px-8 py-6 outline-none text-[14px] text-foreground focus:border-accent focus:bg-foreground/[0.05] transition-all font-mono font-bold placeholder:opacity-20" value={data.email} onChange={e => setData({...data, email: e.target.value})} />
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             <div className="space-y-3">
                <label className="text-[10px] font-mono font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Comms_Frequency</label>
                <input type="tel" placeholder="+XX_XXX_XXXXXXX" className="w-full bg-foreground/[0.02] border border-foreground/10 rounded-xl px-8 py-6 outline-none text-[14px] text-foreground focus:border-accent focus:bg-foreground/[0.05] transition-all font-mono font-bold placeholder:opacity-20" value={data.phone} onChange={e => setData({...data, phone: e.target.value})} />
             </div>
             <div className="space-y-3">
                <label className="text-[10px] font-mono font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Service_Modules</label>
                <input type="text" placeholder="UX, API, SECURE_CORE..." className="w-full bg-foreground/[0.02] border border-foreground/10 rounded-xl px-8 py-6 outline-none text-[14px] text-foreground focus:border-accent focus:bg-foreground/[0.05] transition-all font-mono font-bold placeholder:opacity-20" value={data.services} onChange={e => setData({...data, services: e.target.value})} />
             </div>
           </div>

           <div className="space-y-3">
              <label className="text-[10px] font-mono font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Project_Architecture_Scope</label>
              <textarea required placeholder="DEPLOYMENT_DET_&_LOGISTICS" rows={6} className="w-full bg-foreground/[0.02] border border-foreground/10 rounded-xl px-8 py-6 outline-none text-[14px] text-foreground focus:border-accent focus:bg-foreground/[0.05] transition-all font-mono font-bold leading-relaxed custom-scrollbar placeholder:opacity-20" value={data.specs} onChange={e => setData({...data, specs: e.target.value})} />
           </div>

           <div className="space-y-3">
              <label className="text-[10px] font-mono font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Asset_Unit_Valuation</label>
              <div className="flex bg-foreground/[0.02] border border-foreground/10 rounded-xl overflow-hidden focus-within:border-accent transition-all shadow-inner">
                <select value={data.currency} onChange={e => setData({...data, currency: e.target.value})} className="bg-background/40 px-10 py-6 outline-none border-r border-foreground/10 font-black text-[14px] text-accent font-mono">
                   <option value="PKR">PKR</option>
                   <option value="USD">USD</option>
                </select>
                <input required type="number" placeholder="0.00" className="w-full bg-transparent px-8 py-6 outline-none text-[18px] font-black font-mono text-foreground placeholder:opacity-10" value={data.amount} onChange={e => setData({...data, amount: e.target.value})} />
              </div>
           </div>

           <button type="submit" disabled={creating} className="w-full bg-foreground text-background hover:bg-accent hover:text-black font-black uppercase tracking-[0.4em] py-8 rounded-xl shadow-[0_0_60px_rgba(255,255,255,0.1)] transition-all duration-700 mt-12 disabled:bg-muted flex items-center justify-center gap-6 group overflow-hidden relative">
             <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
             <span className="relative z-10 group-hover:scale-110 transition-transform">{creating ? <>EXECUTING_HANDSHAKE...</> : <>COMMIT_TO_KERNEL_QUEUE <Plus size={20} /></>}</span>
           </button>
        </form>
      </div>
    </motion.div>
  );
};

const CMSTab = ({ onThemeChange }: { onThemeChange?: (theme: 'dark' | 'light') => void }) => {
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const getDefaultConfig = () => ({
    heroSubtitle: "PROFESSIONAL DIGITAL SERVICES",
    mainHeadline: "Engineered for Scale.",
    aboutText: BUSINESS_INFO.aboutBio,
    accentColor: "#00f0ff",
    theme: "dark",
    email: BUSINESS_INFO.email,
    phone: BUSINESS_INFO.phone,
    address: BUSINESS_INFO.address,
    whatsapp: BUSINESS_INFO.whatsappUrl,
    ntn: BUSINESS_INFO.ntn
  });

  const [config, setConfig] = useState(getDefaultConfig());

  useEffect(() => {
    async function fetchRemoteConfig() {
      try {
        const { data, error } = await supabase
          .from('site_config')
          .select('*')
          .single();
        
        if (!error && data) {
          setConfig(data.config_payload);
        }
      } catch (err) {
        console.error("CMS Sync Error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRemoteConfig();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
      e.preventDefault();
      setSaving(true);
      
      try {
        // Try to update existing row (id=1) or insert new one
        const { error: syncError } = await supabase
          .from('site_config')
          .upsert({ id: 1, config_payload: config, updated_at: new Date().toISOString() });
          
        if (syncError) throw syncError;

        // Force a UI update event for other components
        window.dispatchEvent(new Event('ads_config_update'));
        
        if (onThemeChange) onThemeChange(config.theme as any);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } catch (err: any) {
        console.error("Supabase CMS Update Failure:", err);
        alert(`Remote Sync Error: ${err.message}`);
      } finally {
        setSaving(false);
      }
  }

  if (loading) return <div className="flex justify-center p-20"><RefreshCw className="animate-spin text-accent" size={48} /></div>;

  return (
     <motion.div initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} className="max-w-5xl bg-background/40 border border-foreground/[0.05] shadow-2xl rounded-[60px] p-12 lg:p-24 relative overflow-hidden backdrop-blur-3xl">
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[180px] rounded-full pointer-events-none -z-10" />
       <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-secondary/5 blur-[140px] rounded-full pointer-events-none -z-10" />
       
       <div className="flex items-center gap-10 mb-20">
          <div className="w-20 h-20 bg-foreground/[0.02] border border-foreground/[0.1] text-accent rounded-[24px] flex items-center justify-center shadow-2xl relative group overflow-hidden">
             <div className="absolute inset-0 bg-accent/2 group-hover:bg-accent/10 transition-colors" />
             <Settings2 size={40} className="relative z-10 animate-spin-slow" />
          </div>
          <div>
             <h3 className="text-5xl font-black uppercase tracking-tighter text-foreground leading-none mb-3 italic">System_Engine</h3>
             <p className="text-[10px] font-mono font-black uppercase tracking-[0.5em] text-accent animate-pulse">Node: CORE_LOCAL_PERSISTENCE</p>
          </div>
       </div>

       <div className="mb-16 p-8 bg-accent/[0.03] border-l-2 border-accent rounded-r-3xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-[12px] font-mono font-bold text-muted-foreground leading-relaxed italic uppercase tracking-wider relative z-10">
            <span className="text-accent mr-3">!</span>
            KERNEL_STATUS: ENCRYPTED_SYNC_ACTIVE. DATA_INTEGRITY_VERIFIED_BY_ADS_SHIELD_V4.2.
          </p>
       </div>

       <form onSubmit={handleSave} className="space-y-16 h-[55vh] pr-10 overflow-y-auto custom-scrollbar-premium">
          <div className="space-y-10 bg-foreground/[0.01] p-10 rounded-[40px] border border-foreground/[0.03] hover:border-foreground/10 transition-all">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-1 h-1 bg-accent rounded-full" />
                 <h4 className="text-[11px] font-mono font-black uppercase tracking-[0.5em] text-accent/60">CONTENT_ARCHITECTURE</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="block text-[10px] font-mono font-black tracking-widest text-muted-foreground/60 ml-1">LANDING_SUBTITLE</label>
                  <input type="text" value={config.heroSubtitle} onChange={e => setConfig({...config, heroSubtitle: e.target.value})} className="w-full bg-background/40 border border-foreground/10 rounded-xl px-6 py-5 outline-none text-[14px] text-foreground font-mono font-bold focus:border-accent shadow-inner" />
                </div>
                <div className="space-y-3">
                  <label className="block text-[10px] font-mono font-black tracking-widest text-muted-foreground/60 ml-1">GLOBAL_HEADLINE</label>
                  <input type="text" value={config.mainHeadline} onChange={e => setConfig({...config, mainHeadline: e.target.value})} className="w-full bg-background/40 border border-foreground/10 rounded-xl px-6 py-5 outline-none text-[14px] text-foreground font-mono font-bold focus:border-accent shadow-inner" />
                </div>
              </div>
              <div className="space-y-3">
                 <label className="block text-[10px] font-mono font-black tracking-widest text-muted-foreground/60 ml-1">ARCHIVE_BIOGRAPHY_BLOB</label>
                 <textarea rows={6} value={config.aboutText} onChange={e => setConfig({...config, aboutText: e.target.value})} className="w-full bg-background/40 border border-foreground/10 rounded-xl px-6 py-5 outline-none text-[14px] text-foreground font-mono font-bold leading-relaxed focus:border-accent shadow-inner custom-scrollbar" />
              </div>
          </div>

          <div className="space-y-10 bg-foreground/[0.01] p-10 rounded-[40px] border border-foreground/[0.03] hover:border-foreground/10 transition-all">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-1 h-1 bg-accent rounded-full" />
                 <h4 className="text-[11px] font-mono font-black uppercase tracking-[0.5em] text-accent/60">VISUAL_PARAMETERS</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="block text-[10px] font-mono font-black tracking-widest text-muted-foreground/60 ml-1">ATMOSPHERIC_TINT_HEX</label>
                  <div className="bg-background/40 border border-foreground/10 rounded-xl p-3 flex items-center gap-6 shadow-inner">
                    <input type="color" value={config.accentColor} onChange={e => setConfig({...config, accentColor: e.target.value})} className="w-16 h-16 bg-transparent cursor-pointer rounded-lg border-none hover:scale-105 transition-transform" />
                    <span className="text-[14px] font-mono font-black text-accent tracking-tighter uppercase">{config.accentColor}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="block text-[10px] font-mono font-black tracking-widest text-muted-foreground/60 ml-1">ENVIRONMENT_LOGIC_MODE</label>
                  <select value={config.theme} onChange={e => setConfig({...config, theme: e.target.value})} className="w-full bg-background/40 border border-foreground/10 rounded-xl px-6 py-6 outline-none text-[14px] text-foreground font-mono font-black focus:border-accent shadow-inner">
                    <option value="dark">DARK_MATTE_GLASS_RX</option>
                    <option value="light">LIGHT_ENTITY_MINIMAL_RX</option>
                  </select>
                </div>
              </div>
          </div>

          <div className="space-y-10 bg-foreground/[0.01] p-10 rounded-[40px] border border-foreground/[0.03] hover:border-foreground/10 transition-all">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-1 h-1 bg-accent rounded-full" />
                 <h4 className="text-[11px] font-mono font-black uppercase tracking-[0.5em] text-accent/60">IDENTITY_METADATA</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="block text-[10px] font-mono font-black tracking-widest text-muted-foreground/60 ml-1">OFFICIAL_RELAY_FREQ</label>
                  <input type="email" value={config.email} onChange={e => setConfig({...config, email: e.target.value})} className="w-full bg-background/40 border border-foreground/10 rounded-xl px-6 py-5 outline-none text-[14px] text-foreground font-mono font-bold focus:border-accent shadow-inner" />
                </div>
                <div className="space-y-3">
                  <label className="block text-[10px] font-mono font-black tracking-widest text-muted-foreground/60 ml-1">PRIORITY_SIGNAL_PHONE</label>
                  <input type="tel" value={config.phone} onChange={e => setConfig({...config, phone: e.target.value})} className="w-full bg-background/40 border border-foreground/10 rounded-xl px-6 py-5 outline-none text-[14px] text-foreground font-mono font-bold focus:border-accent shadow-inner" />
                </div>
              </div>
              <div className="space-y-3">
                 <label className="block text-[10px] font-mono font-black tracking-widest text-muted-foreground/60 ml-1">SECTOR_ORIGIN_LAT_LNG</label>
                 <input type="text" value={config.address} onChange={e => setConfig({...config, address: e.target.value})} className="w-full bg-background/40 border border-foreground/10 rounded-xl px-6 py-5 outline-none text-[14px] text-foreground font-mono font-bold focus:border-accent shadow-inner" />
              </div>
          </div>

          <button type="submit" disabled={saving} className="w-full bg-foreground text-background hover:bg-accent hover:text-black font-black uppercase tracking-[0.4em] py-8 rounded-xl shadow-2xl transition-all duration-700 mt-16 mb-24 disabled:bg-muted text-[12px] group overflow-hidden relative">
              <div className="absolute inset-0 bg-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
              <span className="relative z-10">{saving ? 'UPDATING_CORE_OS_PARAMETERS...' : 'PUSH_MASTER_CONFIGURATION_TX'}</span>
          </button>

          <AnimatePresence>
              {success && (
                  <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-accent text-black px-12 py-6 rounded-full text-[12px] font-black uppercase tracking-[0.4em] shadow-[0_0_50px_rgba(0,240,255,0.4)] flex items-center gap-6 z-[100] border-4 border-foreground/20 backdrop-blur-xl">
                      <div className="w-3 h-3 rounded-full bg-black animate-ping" />
                      MASTER_SYNCHRONIZED_STABLE
                  </motion.div>
              )}
          </AnimatePresence>
       </form>
     </motion.div>
  );
};

const styles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 240, 255, 0.2);
  }
  
  .custom-scrollbar-premium::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar-premium::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.01);
  }
  .custom-scrollbar-premium::-webkit-scrollbar-thumb {
    background: var(--accent);
    opacity: 0.2;
    border-radius: 10px;
  }
  .custom-scrollbar-premium::-webkit-scrollbar-thumb:hover {
    filter: brightness(1.2);
  }

  .light .glass-nav {
    background: rgba(255, 255, 255, 0.75);
    border-right: 1px solid rgba(0,0,0,0.05);
  }
  .light {
    --foreground: #09090b;
    --background: #ffffff;
  }
  .light .bg-background\/40 {
    background: rgba(255, 255, 255, 0.95);
  }
  .light .bg-foreground\/\[0.01\], .light .bg-foreground\/\[0.02\], .light .bg-foreground\/5 {
    background: rgba(0, 0, 0, 0.03);
  }
  .light .border-foreground\/10 {
    border-color: rgba(0, 0, 0, 0.08);
  }
  .light .text-muted-foreground {
    color: #4b5563;
  }
  .light .shadow-inner {
    box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.04);
  }
  .light select, .light input, .light textarea {
    background-color: rgba(0, 0, 0, 0.02);
    color: #030303;
    border-color: rgba(0, 0, 0, 0.1);
  }
  
  .animate-spin-slow {
    animation: spin 12s linear infinite;
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .font-display {
    font-family: 'Inter', sans-serif;
  }
`;

if (typeof document !== 'undefined') {
  const styleTag = document.getElementById('admin-console-styles');
  if (!styleTag) {
    const s = document.createElement('style');
    s.id = 'admin-console-styles';
    s.innerHTML = styles;
    document.head.appendChild(s);
  }
}
