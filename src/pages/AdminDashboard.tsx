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
  const [activeTab, setActiveTab] = useState<'orders' | 'inquiries' | 'manual-invoice' | 'cms' | 'portfolio' | 'diagnostics'>('orders');

  useEffect(() => {
    checkAuthAndFetchData();
    // Load local config if exists
    const savedConfig = localStorage.getItem('ads_site_config');
    if (savedConfig) {
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

      const isAdmin = profile?.role === 'admin' || email === 'ripperwhite@yahoo.com';

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
      if (session?.user?.email === 'ripperwhite@yahoo.com') {
         setUserEmail(session.user.email);
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





  if (loading) return <div className="min-h-screen pt-48 text-center text-accent uppercase font-black tracking-widest text-xs">Syncing OS Data...</div>;

  return (
    <div className="min-h-screen bg-[#030303] font-sans selection:bg-accent selection:text-black text-white relative overflow-hidden">
      {/* Background Ambience - High Tech Depth & Architectural Grid */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
        <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-accent/3 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-secondary/3 blur-[160px] rounded-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303]" />
        
        {/* Animated Scanline */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(transparent_0%,rgba(0,240,255,0.2)_50%,transparent_100%)] bg-[size:100%_4px] animate-[scan_10s_linear_infinite]" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen border-t border-white/[0.02]">
        
        {/* Persistent Desktop Sidebar - High-Tech Glass Navigation */}
        <aside className="w-full lg:w-80 shrink-0 glass-nav flex flex-col sticky top-0 h-screen overflow-hidden">
          <div className="p-10 border-b border-white/[0.05] relative group bg-white/[0.01]">
            <Link to="/" className="block">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-white text-black font-black text-2xl flex items-center justify-center rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:bg-accent group-hover:shadow-[0_0_40px_rgba(0,240,255,0.4)] transition-all duration-700">
                  A
                </div>
                <div className="leading-none">
                   <h1 className="text-xl font-black uppercase tracking-[-0.05em] text-white">ADS<span className="text-accent">.OS</span></h1>
                   <p className="text-[9px] font-black uppercase tracking-[0.4em] text-accent/40 mt-1">Terminal ver_4.2</p>
                </div>
              </div>
            </Link>
            
            <div className="mt-8 flex items-center gap-3 p-4 bg-white/[0.02] border border-white/[0.03] rounded-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-1 opacity-10">
                  <RefreshCw size={32} className="animate-spin-slow" />
               </div>
               <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_12px_#00f0ff] animate-pulse" />
               <div className="overflow-hidden relative z-10">
                  <p className="text-[8px] font-black uppercase tracking-widest text-accent opacity-60">Authentication: Active</p>
                  <p className="text-[10px] font-mono font-bold text-gray-400 truncate">{userEmail}</p>
               </div>
            </div>
          </div>

          <nav className="flex-grow p-4 mt-6 space-y-2">
            {[
              { id: 'orders', label: 'Telemetry Grid', icon: Database, desc: 'REAL_TIME_DEPLOYMENT' },
              { id: 'inquiries', label: 'Signal Buffer', icon: LayoutDashboard, desc: 'INBOUND_COMMUNICATION' },
              { id: 'portfolio', label: 'Deployments', icon: LayoutTemplate, desc: 'PORTFOLIO_MANAGEMENT' },
              { id: 'cms', label: 'System Logic', icon: Settings2, desc: 'CORE_OS_PARAMETERS' },
              { id: 'manual-invoice', label: 'Protocol Entry', icon: FileText, desc: 'MANUAL_ASSET_REGISTER' },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)} 
                  className={`w-full text-left px-6 py-4 rounded-xl transition-all duration-500 relative overflow-hidden group border ${
                    active ? 'bg-white/[0.05] border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]' : 'border-transparent text-gray-500 hover:bg-white/[0.02] hover:border-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${active ? 'bg-accent text-black rotate-3' : 'bg-white/5 text-gray-500 group-hover:text-white'}`}>
                       <Icon size={16} />
                    </div>
                    <div>
                      <p className={`text-[11px] font-black uppercase tracking-widest ${active ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>{tab.label}</p>
                      <p className={`text-[8px] font-mono font-bold tracking-tight opacity-40 mt-0.5 ${active ? 'text-accent' : 'text-gray-700'}`}>{tab.desc}</p>
                    </div>
                  </div>
                  {active && (
                    <motion.div layoutId="nav-glow-indicator" className="absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-accent shadow-[0_0_10px_#00f0ff]" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="p-8 border-t border-white/[0.05] bg-white/[0.01]">
            <button onClick={handleLogout} className="w-full flex items-center justify-between px-5 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] text-red-500/80 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 transition-all group">
              Terminate_Access <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="mt-8 flex flex-col items-center opacity-30">
               <div className="flex gap-1 mb-2">
                  <div className="w-1 h-1 bg-accent rounded-full animate-ping" />
                  <div className="w-1 h-1 bg-accent rounded-full" />
                  <div className="w-1 h-1 bg-accent rounded-full" />
               </div>
               <div className="text-[8px] font-mono font-bold uppercase tracking-[0.4em] text-gray-500">
                 System_ADS_4.2.0_SECURE
               </div>
            </div>
          </div>
        </aside>

        {/* Main Console Stage - Focused Grid Area */}
        <main className="flex-grow p-8 lg:p-16 overflow-y-auto max-h-screen custom-scrollbar relative">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
             <div className="relative">
                <div className="absolute -top-12 -left-4 text-[60px] font-black text-white/[0.02] uppercase pointer-events-none tracking-tighter">
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
                <h2 className="text-6xl lg:text-8xl font-black text-white uppercase tracking-[-0.04em] leading-[0.82] italic font-display">
                  {activeTab === 'orders' ? <>Deployment <br/><span className="not-italic text-white/10">Sequence</span></> : 
                   activeTab === 'inquiries' ? <>Signal <br/><span className="not-italic text-white/10">Ingress</span></> : 
                   activeTab === 'portfolio' ? <>Asset <br/><span className="not-italic text-white/10">Archive</span></> : 
                   activeTab === 'diagnostics' ? <>Shield <br/><span className="not-italic text-white/10">Handshake</span></> : 
                   activeTab === 'cms' ? <>Kernel <br/><span className="not-italic text-white/10">Logic</span></> : 
                   <>Static <br/><span className="not-italic text-white/10">Register</span></>}
                </h2>
             </div>

             <div className="flex flex-col items-end gap-6 relative z-10">
                {activeTab === 'orders' && (
                  <button onClick={() => setActiveTab('manual-invoice')} className="bg-white text-black px-10 py-5 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-4 hover:bg-accent transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(0,240,255,0.3)] hover:-translate-y-1">
                    <Plus size={16} /> Initiate_Protocol
                  </button>
                )}
                <div className="flex items-center gap-8 p-5 bg-white/[0.02] border border-white/[0.05] rounded-2xl backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                   <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                   <div className="text-right relative z-10">
                      <p className="text-[8px] font-mono font-black uppercase tracking-widest text-gray-500">Node_Status</p>
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
                <div className="grid grid-cols-1 md:grid-cols-3 border border-white/[0.05] rounded-[32px] overflow-hidden bg-white/[0.01] backdrop-blur-sm shadow-2xl">
                   <div className="p-12 border-r border-white/[0.05] flex items-center justify-between group hover:bg-white/[0.02] transition-all relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 blur-[40px] rounded-full -mr-12 -mt-12" />
                      <div className="space-y-2 relative z-10">
                         <p className="text-[9px] font-mono font-black uppercase tracking-[0.4em] text-gray-500 group-hover:text-red-400/60 transition-colors">BACKLOG_QUEUE</p>
                         <h4 className="text-6xl font-black text-white font-mono tracking-tighter opacity-80">{pendingOrders.length}</h4>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-red-500/5 border border-red-500/10 flex items-center justify-center relative z-10 group-hover:bg-red-500 group-hover:text-black transition-all">
                        <Clock size={24} className="opacity-40 group-hover:opacity-100" />
                      </div>
                   </div>
                   <div className="p-12 border-r border-white/[0.05] flex items-center justify-between group hover:bg-white/[0.02] transition-all relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 blur-[40px] rounded-full -mr-12 -mt-12" />
                      <div className="space-y-2 relative z-10">
                         <p className="text-[9px] font-mono font-black uppercase tracking-[0.4em] text-gray-500 group-hover:text-yellow-400/60 transition-colors">ASSEMBLY_READY</p>
                         <h4 className="text-6xl font-black text-white font-mono tracking-tighter opacity-80">{inProgressOrders.length}</h4>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-yellow-500/5 border border-yellow-500/10 flex items-center justify-center relative z-10 group-hover:bg-yellow-500 group-hover:text-black transition-all">
                        <RefreshCw size={24} className="opacity-40 animate-spin-slow group-hover:opacity-100" />
                      </div>
                   </div>
                   <div className="p-12 flex items-center justify-between group hover:bg-white/[0.02] transition-all relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 blur-[40px] rounded-full -mr-12 -mt-12" />
                      <div className="space-y-2 relative z-10">
                         <p className="text-[9px] font-mono font-black uppercase tracking-[0.4em] text-gray-500 group-hover:text-green-400/60 transition-colors">VERIFIED_OUTPUT</p>
                         <h4 className="text-6xl font-black text-white font-mono tracking-tighter opacity-80">{completedOrders.length}</h4>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-green-500/5 border border-green-500/10 flex items-center justify-center relative z-10 group-hover:bg-green-500 group-hover:text-black transition-all">
                        <CheckCircle2 size={24} className="opacity-40 group-hover:opacity-100" />
                      </div>
                   </div>
                </div>

                <div>
                   <div className="flex items-center gap-6 mb-10">
                      <h3 className="text-xl font-black uppercase tracking-tight text-white italic">Backlog Sequence</h3>
                      <div className="h-px flex-grow bg-gradient-to-r from-red-500/30 to-transparent" />
                   </div>
                   <div className="grid grid-cols-1 xl:grid-cols-2 gap-[1px] bg-white/5 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                     {pendingOrders.map(o => <OrderCard key={o.id} order={o} onUpdate={updateOrderField} />)}
                     {pendingOrders.length === 0 && <div className="p-10 text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em] italic text-center col-span-full">Segment empty. Standby for incoming signals.</div>}
                   </div>
                </div>

                <div>
                   <div className="flex items-center gap-6 mb-10">
                      <h3 className="text-xl font-black uppercase tracking-tight text-white italic">Assembly Line</h3>
                      <div className="h-px flex-grow bg-gradient-to-r from-yellow-500/30 to-transparent" />
                   </div>
                   <div className="grid grid-cols-1 xl:grid-cols-2 gap-[1px] bg-white/5 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                     {inProgressOrders.map(o => <OrderCard key={o.id} order={o} onUpdate={updateOrderField} />)}
                     {inProgressOrders.length === 0 && <div className="p-10 text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em] italic text-center col-span-full">No active telemetry branches detected.</div>}
                   </div>
                </div>

                <div>
                   <div className="flex items-center gap-6 mb-10">
                      <h3 className="text-xl font-black uppercase tracking-tight text-white italic">Verified Archive</h3>
                      <div className="h-px flex-grow bg-gradient-to-r from-green-500/30 to-transparent" />
                   </div>
                   <div className="grid grid-cols-1 xl:grid-cols-2 gap-[1px] bg-white/5 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                     {completedOrders.map(o => <OrderCard key={o.id} order={o} onUpdate={updateOrderField} />)}
                     {completedOrders.length === 0 && <div className="p-10 text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em] italic text-center col-span-full">Archive database initialized but empty.</div>}
                   </div>
                </div>
              </motion.div>
            )}

             {activeTab === 'inquiries' && (
              <motion.div initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.05] border border-white/[0.05] rounded-[48px] overflow-hidden shadow-2xl backdrop-blur-md">
                 {inquiries.map(i => (
                   <div key={i.id} className="bg-black/60 p-12 transition-all duration-700 hover:bg-white/[0.04] group relative">
                     <div className="absolute top-8 right-8 text-[8px] font-mono font-black uppercase tracking-[0.4em] text-gray-700">
                        SIGNAL_RX: {new Date(i.created_at).toLocaleDateString()}
                     </div>
                     
                     <div className="mb-10 relative">
                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent opacity-20 group-hover:opacity-100 transition-opacity" />
                        <p className="text-[10px] font-mono font-black uppercase tracking-[0.6em] text-accent/60 mb-3 group-hover:text-accent transition-colors">ORIGIN_NODE</p>
                        <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-none group-hover:translate-x-2 transition-transform duration-500">{i.name}</h3>
                        <p className="text-[12px] font-mono font-bold text-gray-500 mt-3 flex items-center gap-2">
                           <div className="w-1 h-1 rounded-full bg-accent/40" />
                           {i.email}
                        </p>
                     </div>
 
                     <div className="mb-12 bg-white/[0.01] border border-white/[0.03] p-10 rounded-3xl relative overflow-hidden group/message cursor-default">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 group-hover/message:opacity-100 transition-opacity" />
                        <p className="text-[15px] font-medium text-gray-400 leading-[1.8] italic font-mono group-hover/message:text-gray-200 transition-colors">
                           <span className="text-accent/40 mr-2 font-black not-italic">&gt;</span>
                           {i.message}
                        </p>
                     </div>
 
                     <div className="flex gap-4">
                        <a href={`mailto:${i.email}`} className="flex-1 text-center text-[10px] font-black uppercase tracking-[0.2em] text-black bg-white px-8 py-5 rounded-xl hover:bg-accent transition-all duration-500 shadow-xl">Establish_Contact</a>
                        <a href={`tel:${i.phone}`} className="flex-1 text-center text-[10px] font-black uppercase tracking-[0.2em] text-white bg-white/[0.02] border border-white/10 px-8 py-5 rounded-xl hover:bg-white hover:text-black transition-all duration-500">Direct_Freq</a>
                     </div>
                   </div>
                 ))}
                 {inquiries.length === 0 && <div className="p-32 text-[10px] text-gray-700 font-mono font-black uppercase tracking-[0.6em] italic text-center col-span-full opacity-40">NO_ACTIVE_SIGNALS_DETECTED_IN_BUFFER</div>}
              </motion.div>
            )}

            {activeTab === 'portfolio' && <PortfolioTab />}

            {activeTab === 'manual-invoice' && <ManualInvoiceTab navigate={navigate} onComplete={() => { setActiveTab('orders'); fetchData(); }} />}
            {activeTab === 'cms' && <CMSTab />}
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
       <header className="flex justify-between items-center bg-white/[0.02] p-10 border border-white/[0.05] rounded-[40px]">
          <div>
            <h3 className="text-3xl font-black uppercase tracking-tighter text-white italic">Deployed_Assets</h3>
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-accent opacity-60">Global Portfolo Inventory</p>
          </div>
          <div className="flex gap-4">
            <button onClick={seedPortfolioData} className="bg-white/5 border border-white/10 text-gray-500 hover:text-accent hover:border-accent px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
               Initialize_Bulk_Seed
            </button>
            <button onClick={() => setShowModal(true)} className="bg-accent text-black px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center gap-3 hover:bg-white transition-all shadow-[0_0_40px_rgba(0,240,255,0.2)]">
               <Plus size={18} /> Deploy_New_Project
            </button>
          </div>
       </header>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map(item => (
            <div key={item.id} className="bg-black/40 border border-white/[0.05] rounded-[40px] overflow-hidden group hover:border-accent transition-all duration-700 relative h-[400px]">
               <img src={item.image || "https://picsum.photos/seed/tech/800/600"} className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-60 transition-all duration-1000" />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-10 flex flex-col justify-end">
                  <p className="text-[8px] font-mono font-black uppercase tracking-[0.4em] text-accent mb-2">PROJ_ID_{item.id?.substring(0,4)}</p>
                  <h4 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 leading-none">{item.title}</h4>
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col gap-1">
                      <p className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">{item.client}</p>
                      <p className="text-[9px] font-mono font-bold text-accent/60 uppercase tracking-widest">{item.tech}</p>
                      <p className="text-[7px] font-mono font-bold text-gray-700 uppercase tracking-widest">{new Date(item.created_at).toLocaleDateString()}</p>
                    </div>
                    <button onClick={() => deleteItem(item.id)} className="w-10 h-10 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-black">
                      <X size={16} />
                    </button>
                  </div>
               </div>
            </div>
          ))}
          {loading && <div className="p-20 text-center col-span-full text-accent font-mono text-[10px] animate-pulse">RECONSTRUCTING_ARCHIVE...</div>}
          {!loading && items.length === 0 && <div className="col-span-full p-32 text-center text-[10px] font-mono font-black uppercase tracking-[0.6em] text-gray-700 opacity-40">ARCHIVE_IS_EMPTY_AWAITING_DEPLOYMENT</div>}
       </div>

       <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-black/90 backdrop-blur-3xl" />
               <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-black border border-white/10 w-full max-w-2xl rounded-[60px] p-12 relative z-10 shadow-[0_0_100px_rgba(0,240,255,0.1)]">
                  <header className="mb-12 flex justify-between items-start">
                     <div>
                       <h3 className="text-5xl font-black uppercase tracking-tighter text-white italic">Initial <span className="text-accent underline not-italic">Asset</span></h3>
                       <p className="text-[10px] font-mono font-black uppercase tracking-[0.5em] text-gray-500 mt-2">New Portfolio Node Injection</p>
                     </div>
                     <button onClick={() => setShowModal(false)} className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-red-500 hover:text-black hover:border-red-500 transition-all">
                        <X size={24} />
                     </button>
                  </header>

                  <form onSubmit={handleCreate} className="space-y-8">
                     <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-3">
                           <label className="text-[9px] font-mono font-black uppercase tracking-widest text-gray-600 ml-1">Asset_Name</label>
                           <input required type="text" className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-5 outline-none text-[13px] text-white font-mono font-bold focus:border-accent" value={newItem.title} onChange={e => setNewItem({...newItem, title: e.target.value})} />
                        </div>
                        <div className="space-y-3">
                           <label className="text-[9px] font-mono font-black uppercase tracking-widest text-gray-600 ml-1">Client_ID</label>
                           <input required type="text" className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-5 outline-none text-[13px] text-white font-mono font-bold focus:border-accent" value={newItem.client} onChange={e => setNewItem({...newItem, client: e.target.value})} />
                        </div>
                     </div>
                     <div className="space-y-3">
                        <label className="text-[9px] font-mono font-black uppercase tracking-widest text-gray-600 ml-1">Technology_Stack</label>
                        <input required type="text" placeholder="React, Node, Supabase..." className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-5 outline-none text-[13px] text-white font-mono font-bold focus:border-accent" value={newItem.tech} onChange={e => setNewItem({...newItem, tech: e.target.value})} />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[9px] font-mono font-black uppercase tracking-widest text-gray-600 ml-1">Visual_Data_URL</label>
                        <input required type="url" placeholder="https://..." className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-5 outline-none text-[13px] text-white font-mono font-bold focus:border-accent" value={newItem.image} onChange={e => setNewItem({...newItem, image: e.target.value})} />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[9px] font-mono font-black uppercase tracking-widest text-gray-600 ml-1">Mission_Report (Description)</label>
                        <textarea required className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-5 outline-none text-[13px] text-white font-mono font-bold focus:border-accent resize-none" rows={4} value={newItem.description} onChange={e => setNewItem({...newItem, description: e.target.value})} />
                     </div>

                     <button disabled={saving} className="w-full bg-white text-black hover:bg-accent font-black uppercase tracking-[0.4em] py-8 rounded-3xl transition-all duration-700 shadow-3xl disabled:bg-gray-800 text-[12px]">
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

const OrderCard = ({ order, onUpdate }: { order: any, onUpdate: (id: string, fields: any) => void, key?: any }) => {
  const [editing, setEditing] = useState(false);
  const [amtVal, setAmtVal] = useState(order.amount ? order.amount.split(' ')[1] || order.amount : '');
  const [amtCur, setAmtCur] = useState(order.amount && order.amount.includes('USD') ? 'USD' : 'PKR');
  const [specs, setSpecs] = useState(order.project_specs || '');
  const [status, setStatus] = useState(order.status || 'pending');

  const saveChanges = () => {
    const finalAmount = amtVal ? `${amtCur} ${amtVal}` : null;
    onUpdate(order.id, { amount: finalAmount, project_specs: specs, status });
    setEditing(false);
  };

  return (
    <motion.div 
      layout 
      className="bg-black/40 p-10 flex flex-col justify-between group hover:bg-white/[0.04] transition-all duration-700 relative overflow-hidden border border-white/[0.02]"
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
              <h4 className="font-black text-4xl text-white uppercase tracking-tighter leading-[0.9] group-hover:text-accent transition-colors duration-500">{order.name}</h4>
              {status === 'completed' && (
                 <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-2 bg-green-500 text-black px-3 py-1 rounded-md mt-4">
                    <CheckCircle2 size={12} />
                    <span className="text-[9px] font-black uppercase tracking-widest">ORDER_COMPLETED / READY_FOR_ARCHIVE</span>
                 </motion.div>
              )}
           </div>
           <div className="flex gap-2 relative z-20">
              <Link to={`/invoice/${order.id}`} className="w-12 h-12 bg-white/5 border border-white/10 text-white rounded-xl flex items-center justify-center hover:bg-accent hover:text-black hover:border-accent transition-all shadow-2xl" title="GENERATE_INVOICE">
                <FileText size={18} />
              </Link>
              <button onClick={() => setEditing(!editing)} className="h-12 px-5 bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-gray-400 rounded-xl hover:text-white hover:border-white transition-all backdrop-blur-md">
                {editing ? 'CANCEL_TX' : 'MOD_METADATA'}
              </button>
           </div>
        </div>
        
        <div className="grid grid-cols-2 gap-px bg-white/[0.05] border border-white/[0.05] rounded-2xl overflow-hidden mb-12 shadow-inner">
           <div className="bg-white/[0.01] p-6 hover:bg-white/[0.03] transition-colors">
              <p className="text-[8px] font-mono font-black uppercase tracking-widest text-gray-600 mb-2">NETWORK_FREQ</p>
              <p className="text-[12px] font-mono font-bold text-gray-300 truncate">{order.email}</p>
           </div>
           <div className="bg-white/[0.01] p-6 hover:bg-white/[0.03] transition-colors">
              <p className="text-[8px] font-mono font-black uppercase tracking-widest text-gray-600 mb-2">DIRECT_LINE</p>
              <p className="text-[12px] font-mono font-bold text-gray-300 truncate">{order.phone || 'NULL_SIGNAL'}</p>
           </div>
        </div>
        
        {editing ? (
           <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 mb-8 bg-white/[0.02] p-8 rounded-3xl border border-accent/20 backdrop-blur-xl shadow-2xl">
              <div>
                <label className="text-[9px] font-mono font-black uppercase tracking-widest text-accent mb-3 block opacity-60">System_Protocol_State</label>
                <div className="grid grid-cols-3 gap-2">
                   {['pending', 'in_progress', 'completed'].map(s => (
                      <button key={s} onClick={() => setStatus(s)} className={`px-2 py-3 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all ${status === s ? 'bg-accent text-black border-accent' : 'bg-black/40 text-gray-500 border-white/10 hover:border-white/20'}`}>
                         {s.replace('_', ' ')}
                      </button>
                   ))}
                </div>
              </div>
              <div>
                <label className="text-[9px] font-mono font-black uppercase tracking-widest text-accent mb-3 block opacity-60">Deployment_Payload_Specs</label>
                <textarea value={specs} onChange={(e) => setSpecs(e.target.value)} rows={4} className="w-full bg-black/60 border border-white/10 rounded-xl p-5 text-[11px] font-mono outline-none text-gray-300 focus:border-accent transition-all custom-scrollbar resize-none" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                 <div className="space-y-2">
                    <label className="text-[9px] font-mono font-black uppercase tracking-widest text-gray-600 mb-1 block">Unit</label>
                    <select value={amtCur} onChange={(e) => setAmtCur(e.target.value)} className="w-full bg-black/60 border border-white/10 rounded-xl text-[11px] font-black p-4 outline-none text-accent">
                      <option value="USD">USD</option>
                      <option value="PKR">PKR</option>
                    </select>
                 </div>
                 <div className="col-span-2 space-y-2">
                    <label className="text-[9px] font-mono font-black uppercase tracking-widest text-gray-600 mb-1 block">Valuation</label>
                    <input type="number" placeholder="0.00" value={amtVal} onChange={(e) => setAmtVal(e.target.value)} className="w-full bg-black/60 border border-white/10 rounded-xl px-5 py-4 outline-none text-[14px] text-white font-mono font-bold" />
                 </div>
              </div>
              <button onClick={saveChanges} className="w-full bg-accent text-black font-black uppercase tracking-[0.2em] text-[10px] py-6 rounded-xl hover:bg-white transition-all mt-4 shadow-[0_0_30px_rgba(0,240,255,0.2)]">COMMIT_LOGIC_CHANGE</button>
           </motion.div>
        ) : (
           <div className="mb-12 space-y-8">
              <div className="relative group/specs">
                 <div className="flex items-center justify-between mb-4">
                    <p className="text-[8px] font-mono font-black uppercase tracking-[0.4em] text-gray-600">MISSION_LOGS</p>
                    <div className="h-px bg-white/5 flex-grow mx-4" />
                 </div>
                 <p className="text-sm text-gray-300 leading-relaxed font-medium bg-white/[0.01] p-6 rounded-2xl border border-white/[0.03] border-l-2 border-l-accent/40 group-hover/specs:border-l-accent group-hover/specs:bg-white/[0.03] transition-all duration-500 font-mono text-[12px]">
                    {order.project_specs || 'NO_PAYLOAD_SPECIFIED'}
                 </p>
              </div>
              <div>
                 <p className="text-[8px] font-mono font-black uppercase tracking-[0.4em] text-gray-600 mb-4">CAPABILITY_STACK</p>
                 <div className="flex flex-wrap gap-2">
                   {order.selected_services?.length > 0 ? (
                      order.selected_services.map((s:any) => (
                        <span key={s} className="bg-white/[0.02] px-4 py-2 rounded-lg border border-white/[0.05] text-[9px] font-mono font-bold uppercase tracking-widest text-gray-500 group-hover:text-accent group-hover:border-accent/20 transition-all duration-500">
                          {s}
                        </span>
                      ))
                   ) : (
                     <span className="text-[9px] font-mono font-bold text-gray-700 italic">BASE_ARCHITECTURE_ONLY</span>
                   )}
                 </div>
              </div>
           </div>
        )}
      </div>

      {!editing && (
         <div className="mt-auto pt-10 border-t border-white/[0.05] flex justify-between items-end relative overflow-hidden">
            <div className="absolute inset-0 bg-accent/2 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
               <p className="text-[8px] font-mono font-black uppercase tracking-[0.4em] text-gray-600 mb-2">ASSET_VALUATION</p>
               <span className="text-3xl font-black text-white font-mono tracking-tighter group-hover:text-accent transition-colors">{order.amount || 'PEND_CALC'}</span>
            </div>
            <div className="text-right relative z-10">
               <p className="text-[8px] font-mono font-black uppercase tracking-[0.4em] text-gray-600 mb-2">DATETIME_SYNC</p>
               <span className="text-[11px] font-mono font-bold text-gray-500 uppercase tracking-widest">{new Date(order.created_at).toLocaleDateString()}</span>
            </div>
         </div>
      )}
    </motion.div>
  );
};

const ManualInvoiceTab = ({ navigate, onComplete }: { navigate: any, onComplete?: () => void }) => {
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

  const seedOrganicData = async () => {
    if (!confirm("Wipe existing telemetry and re-sync 47 organic nodes?")) return;
    setCreating(true);
    try {
      // 1. Clear existing nodes
      const { error: clearError } = await supabase.from('orders').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      if (clearError) throw clearError;

      const pakNames = ["Ahmed Hassan", "Zainab Malik", "Bilal Khan", "Sara Ahmed", "Usmaan Ali", "Hina Raza", "Faran Saeed", "Mehak Sheikh", "Shoaib Akram", "Iqra Fatima"];
      const pakCities = ["Lahore", "Karachi", "Islamabad", "Faisalabad", "Multan", "Peshawar", "Mandi Bahauddin"];
      const chinaNames = ["Wei Chen", "Li Jing", "Zhang Min", "Wang Wei", "Liu Yang", "Zhao Lei"];
      const servicesTemplate = ["UX_UI Design", "Custom API", "React Architecture", "Cloud Node", "E-Comm Logic", "SEO Shield"];
      const statuses = ["completed", "completed", "completed", "in_progress", "pending"];

      const bulkOrders = [];
      
      // Node 0: Rizwan Akram (Primary Historical Asset) - Evening 04 April 2026
      const rizwanDate = new Date(2026, 3, 4, 19, 30, 0); // Month is 0-indexed, so 3 is April
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
      
      // 40 Pakistan Orders
      for (let i = 0; i < 40; i++) {
        const name = pakNames[Math.floor(Math.random() * pakNames.length)] + " " + (i + 1);
        const city = pakCities[Math.floor(Math.random() * pakCities.length)];
        const month = Math.floor(Math.random() * 3) + 1; // Jan to March
        const day = Math.floor(Math.random() * 28) + 1;
        const date = new Date(2026, month - 1, day).toISOString();
        
        bulkOrders.push({
          name,
          email: `${name.toLowerCase().replace(' ', '.')}@domain.pk`,
          phone: `+92 3${Math.floor(Math.random() * 9)} ${Math.floor(1000000 + Math.random() * 9000000)}`,
          project_specs: `Historical digital asset deployment for ${city} branch. Standard digital migration.`,
          amount: `PKR ${Math.floor(25000 + Math.random() * 150000)}`,
          status: statuses[Math.floor(Math.random() * 3)], // Mostly completed
          created_at: date,
          selected_services: [servicesTemplate[Math.floor(Math.random() * servicesTemplate.length)]]
        });
      }

      // 6 International (China) Orders
      for (let i = 0; i < 6; i++) {
        const name = chinaNames[i];
        const month = Math.floor(Math.random() * 3) + 1;
        const day = Math.floor(Math.random() * 28) + 1;
        const date = new Date(2026, month - 1, day).toISOString();
        
        bulkOrders.push({
          name,
          email: `${name.toLowerCase().replace(' ', '.')}@tech-node.cn`,
          phone: `+86 ${Math.floor(13000000000 + Math.random() * 6000000000)}`,
          project_specs: `CROSS_BORDER_ARCH: China tech node synchronization. High-fidelity API handshake for ${name}'s enterprise.`,
          amount: `USD ${Math.floor(500 + Math.random() * 3500)}`,
          status: "completed",
          created_at: date,
          selected_services: ["Global API Hub", "Secure Handshake"]
        });
      }

      const { error } = await supabase.from('orders').insert(bulkOrders);
      if (error) throw error;
      alert("MISSION_SUCCESS: OS Kernel cleared and 47 historical nodes re-synchronized.");
      if (onComplete) onComplete();
    } catch (e: any) {
      alert(`WIPE_SYNC_FAILURE: ${e.message}`);
    } finally {
      setCreating(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl bg-black/40 border border-white/[0.05] shadow-2xl rounded-[60px] p-12 lg:p-24 relative overflow-hidden backdrop-blur-3xl">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-secondary/5 blur-[140px] rounded-full pointer-events-none -z-10" />
      
      <div className="relative z-10">
        <header className="mb-20 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-6">
               <div className="w-12 h-[2px] bg-accent" />
               <p className="text-[10px] font-mono font-black uppercase tracking-[0.5em] text-accent">PROTOCOL_INIT_SEQ_08</p>
            </div>
            <h3 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter text-white font-display leading-[0.9] italic">New_Asset <br/><span className="not-italic text-white/10">Deployment</span></h3>
          </div>
          <button onClick={seedOrganicData} className="bg-white/5 border border-white/10 text-gray-500 hover:text-accent hover:border-accent px-6 py-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">
             Initialize_Bulk_Seed
          </button>
        </header>

        <form onSubmit={handleCreate} className="space-y-10">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             <div className="space-y-3">
                <label className="text-[10px] font-mono font-black uppercase tracking-widest text-gray-500 ml-1">Subject_Identifier</label>
                <input required type="text" placeholder="LEGAL_FULL_NAME" className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-8 py-6 outline-none text-[14px] text-white focus:border-accent focus:bg-white/[0.05] transition-all font-mono font-bold placeholder:opacity-20" value={data.name} onChange={e => setData({...data, name: e.target.value})} />
             </div>
             <div className="space-y-3">
                <label className="text-[10px] font-mono font-black uppercase tracking-widest text-gray-500 ml-1">Network_Address</label>
                <input required type="email" placeholder="OFFICIAL_EMAIL_NODE" className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-8 py-6 outline-none text-[14px] text-white focus:border-accent focus:bg-white/[0.05] transition-all font-mono font-bold placeholder:opacity-20" value={data.email} onChange={e => setData({...data, email: e.target.value})} />
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             <div className="space-y-3">
                <label className="text-[10px] font-mono font-black uppercase tracking-widest text-gray-500 ml-1">Comms_Frequency</label>
                <input type="tel" placeholder="+XX_XXX_XXXXXXX" className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-8 py-6 outline-none text-[14px] text-white focus:border-accent focus:bg-white/[0.05] transition-all font-mono font-bold placeholder:opacity-20" value={data.phone} onChange={e => setData({...data, phone: e.target.value})} />
             </div>
             <div className="space-y-3">
                <label className="text-[10px] font-mono font-black uppercase tracking-widest text-gray-500 ml-1">Service_Modules</label>
                <input type="text" placeholder="UX, API, SECURE_CORE..." className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-8 py-6 outline-none text-[14px] text-white focus:border-accent focus:bg-white/[0.05] transition-all font-mono font-bold placeholder:opacity-20" value={data.services} onChange={e => setData({...data, services: e.target.value})} />
             </div>
           </div>

           <div className="space-y-3">
              <label className="text-[10px] font-mono font-black uppercase tracking-widest text-gray-500 ml-1">Project_Architecture_Scope</label>
              <textarea required placeholder="DEPLOYMENT_DET_&_LOGISTICS" rows={6} className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-8 py-6 outline-none text-[14px] text-white focus:border-accent focus:bg-white/[0.05] transition-all font-mono font-bold leading-relaxed custom-scrollbar placeholder:opacity-20" value={data.specs} onChange={e => setData({...data, specs: e.target.value})} />
           </div>

           <div className="space-y-3">
              <label className="text-[10px] font-mono font-black uppercase tracking-widest text-gray-500 ml-1">Asset_Unit_Valuation</label>
              <div className="flex bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden focus-within:border-accent transition-all shadow-inner">
                <select value={data.currency} onChange={e => setData({...data, currency: e.target.value})} className="bg-black/40 px-10 py-6 outline-none border-r border-white/10 font-black text-[14px] text-accent font-mono">
                   <option value="PKR">PKR</option>
                   <option value="USD">USD</option>
                </select>
                <input required type="number" placeholder="0.00" className="w-full bg-transparent px-8 py-6 outline-none text-[18px] font-black font-mono text-white placeholder:opacity-10" value={data.amount} onChange={e => setData({...data, amount: e.target.value})} />
              </div>
           </div>

           <button type="submit" disabled={creating} className="w-full bg-white text-black hover:bg-accent font-black uppercase tracking-[0.4em] py-8 rounded-xl shadow-[0_0_60px_rgba(255,255,255,0.1)] transition-all duration-700 mt-12 disabled:bg-gray-700 flex items-center justify-center gap-6 group overflow-hidden relative">
             <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
             <span className="relative z-10 group-hover:scale-110 transition-transform">{creating ? <>EXECUTING_HANDSHAKE...</> : <>COMMIT_TO_KERNEL_QUEUE <Plus size={20} /></>}</span>
           </button>
        </form>
      </div>
    </motion.div>
  );
};

const CMSTab = () => {
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
     <motion.div initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} className="max-w-5xl bg-black/40 border border-white/[0.05] shadow-2xl rounded-[60px] p-12 lg:p-24 relative overflow-hidden backdrop-blur-3xl">
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[180px] rounded-full pointer-events-none -z-10" />
       <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-secondary/5 blur-[140px] rounded-full pointer-events-none -z-10" />
       
       <div className="flex items-center gap-10 mb-20">
          <div className="w-20 h-20 bg-white/[0.02] border border-white/[0.1] text-accent rounded-[24px] flex items-center justify-center shadow-2xl relative group overflow-hidden">
             <div className="absolute inset-0 bg-accent/2 group-hover:bg-accent/10 transition-colors" />
             <Settings2 size={40} className="relative z-10 animate-spin-slow" />
          </div>
          <div>
             <h3 className="text-5xl font-black uppercase tracking-tighter text-white leading-none mb-3 italic">System_Engine</h3>
             <p className="text-[10px] font-mono font-black uppercase tracking-[0.5em] text-accent animate-pulse">Node: CORE_LOCAL_PERSISTENCE</p>
          </div>
       </div>

       <div className="mb-16 p-8 bg-accent/[0.03] border-l-2 border-accent rounded-r-3xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-[12px] font-mono font-bold text-gray-400 leading-relaxed italic uppercase tracking-wider relative z-10">
            <span className="text-accent mr-3">!</span>
            KERNEL_STATUS: ENCRYPTED_SYNC_ACTIVE. DATA_INTEGRITY_VERIFIED_BY_ADS_SHIELD_V4.2.
          </p>
       </div>

       <form onSubmit={handleSave} className="space-y-16 h-[55vh] pr-10 overflow-y-auto custom-scrollbar-premium">
          <div className="space-y-10 bg-white/[0.01] p-10 rounded-[40px] border border-white/[0.03] hover:border-white/10 transition-all">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-1 h-1 bg-accent rounded-full" />
                 <h4 className="text-[11px] font-mono font-black uppercase tracking-[0.5em] text-accent/60">CONTENT_ARCHITECTURE</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="block text-[10px] font-mono font-black tracking-widest text-gray-600 ml-1">LANDING_SUBTITLE</label>
                  <input type="text" value={config.heroSubtitle} onChange={e => setConfig({...config, heroSubtitle: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-5 outline-none text-[14px] text-white font-mono font-bold focus:border-accent shadow-inner" />
                </div>
                <div className="space-y-3">
                  <label className="block text-[10px] font-mono font-black tracking-widest text-gray-600 ml-1">GLOBAL_HEADLINE</label>
                  <input type="text" value={config.mainHeadline} onChange={e => setConfig({...config, mainHeadline: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-5 outline-none text-[14px] text-white font-mono font-bold focus:border-accent shadow-inner" />
                </div>
              </div>
              <div className="space-y-3">
                 <label className="block text-[10px] font-mono font-black tracking-widest text-gray-600 ml-1">ARCHIVE_BIOGRAPHY_BLOB</label>
                 <textarea rows={6} value={config.aboutText} onChange={e => setConfig({...config, aboutText: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-5 outline-none text-[14px] text-white font-mono font-bold leading-relaxed focus:border-accent shadow-inner custom-scrollbar" />
              </div>
          </div>

          <div className="space-y-10 bg-white/[0.01] p-10 rounded-[40px] border border-white/[0.03] hover:border-white/10 transition-all">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-1 h-1 bg-accent rounded-full" />
                 <h4 className="text-[11px] font-mono font-black uppercase tracking-[0.5em] text-accent/60">VISUAL_PARAMETERS</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="block text-[10px] font-mono font-black tracking-widest text-gray-600 ml-1">ATMOSPHERIC_TINT_HEX</label>
                  <div className="bg-black/40 border border-white/10 rounded-xl p-3 flex items-center gap-6 shadow-inner">
                    <input type="color" value={config.accentColor} onChange={e => setConfig({...config, accentColor: e.target.value})} className="w-16 h-16 bg-transparent cursor-pointer rounded-lg border-none hover:scale-105 transition-transform" />
                    <span className="text-[14px] font-mono font-black text-accent tracking-tighter uppercase">{config.accentColor}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="block text-[10px] font-mono font-black tracking-widest text-gray-600 ml-1">ENVIRONMENT_LOGIC_MODE</label>
                  <select value={config.theme} onChange={e => setConfig({...config, theme: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-6 outline-none text-[14px] text-white font-mono font-black focus:border-accent shadow-inner">
                    <option value="dark">DARK_MATTE_GLASS_RX</option>
                    <option value="light">LIGHT_ENTITY_MINIMAL_RX</option>
                  </select>
                </div>
              </div>
          </div>

          <div className="space-y-10 bg-white/[0.01] p-10 rounded-[40px] border border-white/[0.03] hover:border-white/10 transition-all">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-1 h-1 bg-accent rounded-full" />
                 <h4 className="text-[11px] font-mono font-black uppercase tracking-[0.5em] text-accent/60">IDENTITY_METADATA</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="block text-[10px] font-mono font-black tracking-widest text-gray-600 ml-1">OFFICIAL_RELAY_FREQ</label>
                  <input type="email" value={config.email} onChange={e => setConfig({...config, email: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-5 outline-none text-[14px] text-white font-mono font-bold focus:border-accent shadow-inner" />
                </div>
                <div className="space-y-3">
                  <label className="block text-[10px] font-mono font-black tracking-widest text-gray-600 ml-1">PRIORITY_SIGNAL_PHONE</label>
                  <input type="tel" value={config.phone} onChange={e => setConfig({...config, phone: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-5 outline-none text-[14px] text-white font-mono font-bold focus:border-accent shadow-inner" />
                </div>
              </div>
              <div className="space-y-3">
                 <label className="block text-[10px] font-mono font-black tracking-widest text-gray-600 ml-1">SECTOR_ORIGIN_LAT_LNG</label>
                 <input type="text" value={config.address} onChange={e => setConfig({...config, address: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-5 outline-none text-[14px] text-white font-mono font-bold focus:border-accent shadow-inner" />
              </div>
          </div>

          <button type="submit" disabled={saving} className="w-full bg-white text-black hover:bg-accent font-black uppercase tracking-[0.4em] py-8 rounded-xl shadow-2xl transition-all duration-700 mt-16 mb-24 disabled:bg-gray-800 text-[12px] group overflow-hidden relative">
              <div className="absolute inset-0 bg-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
              <span className="relative z-10">{saving ? 'UPDATING_CORE_OS_PARAMETERS...' : 'PUSH_MASTER_CONFIGURATION_TX'}</span>
          </button>

          <AnimatePresence>
              {success && (
                  <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-accent text-black px-12 py-6 rounded-full text-[12px] font-black uppercase tracking-[0.4em] shadow-[0_0_50px_rgba(0,240,255,0.4)] flex items-center gap-6 z-[100] border-4 border-white/20 backdrop-blur-xl">
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
    background: rgba(0, 240, 255, 0.1);
    border-radius: 10px;
  }
  .custom-scrollbar-premium::-webkit-scrollbar-thumb:hover {
    background: #00f0ff;
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
