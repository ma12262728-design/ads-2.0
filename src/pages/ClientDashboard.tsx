import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, Package, RefreshCw, AlertCircle, ExternalLink, Download } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ClientDashboard() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthAndFetchOrders();
  }, []);

  const checkAuthAndFetchOrders = async () => {
    try {
      setLoading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      
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
          console.warn("User retrieval timed out, using fallback session data");
          user = session?.user;
        }
      }
      
      if (!user) {
        console.error("Authentication check failed.");
        navigate('/auth');
        return;
      }

      const email = user.email;
      setUserEmail(email || '');

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('email', email)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Orders fetch error:", error);
      } else if (data) {
        setOrders(data);
      }
    } catch (err) {
      console.error("Dashboard critical failure:", err);
      // Fallback: use session data if available locally
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
         setUserEmail(session.user.email || '');
         // Try fetching orders even if getUser failed
         const { data } = await supabase.from('orders').select('*').eq('email', session.user.email).order('created_at', { ascending: false });
         if (data) setOrders(data);
      } else {
         navigate('/auth');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    console.log("Auth System: Terminating session...");
    await supabase.auth.signOut();
    navigate('/auth', { replace: true });
  };

  if (loading) return <div className="min-h-screen pt-48 flex justify-center"><RefreshCw className="animate-spin text-accent" size={32} /></div>;

  return (
    <div className="pt-32 pb-24 min-h-screen px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 bg-white/5 p-6 rounded-2xl border border-white/10 gap-6">
          <div>
            <h2 className="text-2xl font-black uppercase mb-1">Client Interface</h2>
            <p className="text-xs text-accent uppercase font-mono tracking-widest">{userEmail}</p>
          </div>
          <div className="flex gap-4">
             <button onClick={() => checkAuthAndFetchOrders()} className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
               <RefreshCw size={18} />
             </button>
             <button onClick={handleLogout} className="flex items-center gap-2 px-6 py-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors uppercase font-bold text-xs">
               <LogOut size={16} /> Terminate Session
             </button>
          </div>
        </div>

        <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-2"><Package className="text-accent"/> Active Deployments</h3>
        
        {orders.length === 0 ? (
           <div className="text-center p-12 bg-white/5 rounded-2xl border border-white/10">
              <AlertCircle className="mx-auto mb-4 opacity-50" size={32} />
              <p className="opacity-50">No active orders detected for this identifier.</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {orders.map(order => (
              <div key={order.id} className="liquid-glass p-6 md:p-8 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-8 justify-between">
                <div>
                   <p className="text-[10px] font-mono text-accent mb-2">ID: {order.id}</p>
                   <h4 className="text-lg font-black uppercase mb-2">{order.project_specs?.length > 30 ? order.project_specs.substring(0,30)+'...' : order.project_specs || 'Custom Deployment'}</h4>
                   <p className="text-xs opacity-60 mb-4">{new Date(order.created_at).toLocaleDateString()}</p>
                   {order.amount && (
                     <div className="mt-4 p-4 bg-accent/10 border border-accent/20 rounded-xl inline-block">
                        <p className="text-[10px] uppercase tracking-widest text-accent mb-1 font-bold">Outstanding Balance</p>
                        <p className="text-xl font-black">{order.amount}</p>
                     </div>
                   )}
                </div>
                <div className="flex flex-col gap-4 min-w-[200px] justify-center">
                   <div className="p-4 bg-white/5 rounded-xl text-center border border-white/5">
                     <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Status</p>
                     <p className="font-bold text-accent uppercase">{order.status || 'Received'}</p>
                   </div>
                   <Link to={`/invoice/${order.id}`} className="w-full btn-bold-primary py-3 text-xs uppercase text-center flex justify-center items-center gap-2">
                     <Download size={14}/> View Invoice
                   </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
