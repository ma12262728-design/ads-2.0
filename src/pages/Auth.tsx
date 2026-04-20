import { useState, FormEvent, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, Mail, Key, ShieldCheck, AlertCircle, User, Briefcase, Phone } from 'lucide-react';
import { supabase } from '../lib/supabase';
import SectionHeader from '../components/SectionHeader';

export default function Auth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSignIn, setIsSignIn] = useState(searchParams.get('mode') !== 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Extra professional detail fields for signup
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMSG, setErrorMSG] = useState('');

  useEffect(() => {
    const rapidCheck = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (session && !error) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .maybeSingle();

        const isAdmin = profile?.role === 'admin' || session.user.email === 'ripperwhite@yahoo.com';
        navigate(isAdmin ? '/admin' : '/dashboard', { replace: true });
      }
    };
    rapidCheck();
  }, [navigate]);

  useEffect(() => {
    setIsSignIn(searchParams.get('mode') !== 'signup');
    setErrorMSG('');
  }, [searchParams]);

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMSG('');

    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Secure Authentication Handshake is taking longer than expected due to environment latency. Please try once more or open in a direct tab.")), 30000)
    );

    // EMERGENCY SAFETY RELEASE: Force loading false after 31 seconds
    const safetyRelease = setTimeout(() => {
      setLoading(false);
      console.log("Auth System: Emergency safety release triggered.");
    }, 31000);

    try {
      setErrorMSG(''); // Clear any previous errors immediately
      console.log("Auth System: Initiating secure verification for identity...");
      if (isSignIn) {
        const authPromise = supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });

        const result = await Promise.race([authPromise, timeoutPromise]) as any;
        console.log("Auth System: Handshake acknowledged. Processing payload...");
        clearTimeout(safetyRelease);
        const { data, error } = result;
        
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            throw new Error("Invalid credentials. Please verify your identifier and passcode.");
          }
          throw error;
        }
        
        // Check for admin role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .maybeSingle();

        if (profile?.role === 'admin' || data?.user?.email === 'ripperwhite@yahoo.com') {
          navigate('/admin', { replace: true });
        } else {
          navigate('/dashboard', { replace: true });
        }
      } else {
        const signupPromise = supabase.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            data: { full_name: fullName, company, phone }
          }
        });

        const result = await Promise.race([signupPromise, timeoutPromise]) as any;
        clearTimeout(safetyRelease);
        const { data, error } = result;
        
        if (error) throw error;
        
        if (data?.user) {
          // Create profile record
          await supabase.from('profiles').insert([
            { id: data.user.id, full_name: fullName, company, phone, role: 'client' }
          ]);

          if (data.session) {
             navigate(data.user.email === 'ripperwhite@yahoo.com' ? '/admin' : '/dashboard');
          } else {
             alert("Registration request sent. Please check your email for a confirmation link.");
             setIsSignIn(true);
          }
        }
      }
    } catch (err: any) {
      console.error("Auth System Error Trace:", err);
      clearTimeout(safetyRelease);
      const msg = err?.message || "An unexpected system rejection occurred during identity verification.";
      setErrorMSG(msg);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-48 pb-24 min-h-screen flex items-center justify-center">
      <div className="container-custom max-w-md w-full">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="liquid-glass-high rounded-[40px] p-8 relative overflow-hidden"
        >
          <div className="flex justify-center mb-6 text-accent">
            <ShieldCheck size={48} />
          </div>
          
          <h2 className="text-2xl font-black uppercase tracking-tighter text-center mb-8 dark:text-white">
            {isSignIn ? 'Admin Gateway' : 'Create Access'}
          </h2>

          <form onSubmit={handleAuth} className="space-y-6 relative z-10">
            {!isSignIn && (
              <>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-accent opacity-80 flex items-center gap-2">
                     <User size={12} /> Contact Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-accent transition-colors dark:text-white"
                    placeholder="Full Professional Name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black tracking-widest text-accent opacity-80 flex items-center gap-2">
                       <Briefcase size={12} /> Organization
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-white/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-accent transition-colors dark:text-white"
                      placeholder="Company Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black tracking-widest text-accent opacity-80 flex items-center gap-2">
                       <Phone size={12} /> Direct Line
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-accent transition-colors dark:text-white"
                      placeholder="+92 3XX XXXXXXX"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-accent opacity-80 flex items-center gap-2">
                 <Mail size={12} /> Identifier
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-accent transition-colors dark:text-white"
                placeholder="admin@email.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-accent opacity-80 flex items-center gap-2">
                 <Key size={12} /> Passcode
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-accent transition-colors dark:text-white"
                placeholder="••••••••"
              />
            </div>

            {errorMSG && (
               <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-xs font-bold leading-tight">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{errorMSG}</span>
               </div>
            )}

             <button
                type="submit"
                disabled={loading}
                className="w-full btn-bold-primary py-4 font-black uppercase tracking-[0.1em] shadow-xl relative overflow-hidden group disabled:opacity-50"
             >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? 'Authenticating...' : isSignIn ? 'Initiate Login' : 'Register Identity'} 
                  {!loading && <Lock size={16} />}
                </span>
             </button>

             {loading && (
               <div className="text-center mt-2 animate-pulse">
                 <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                   System Latency Detected? <button type="button" onClick={() => setLoading(false)} className="text-accent hover:underline">Manual Reset</button>
                 </p>
               </div>
             )}
            
            <div className="text-center mt-6">
               <button 
                 type="button"
                 onClick={() => { setIsSignIn(!isSignIn); setErrorMSG(''); }}
                 className="text-xs font-bold uppercase tracking-widest text-accent opacity-60 hover:opacity-100 transition-opacity"
               >
                 {isSignIn ? 'Request New Access (Sign Up)' : 'Return to Gateway (Sign In)'}
               </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
