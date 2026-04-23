import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';
import { BUSINESS_INFO } from '../constants/data';
import { ArrowLeft, Printer } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

export default function Invoice() {
  const { id } = useParams();
  useSEO("View Invoice - Ammar Digital", "Secure Invoice Server", "website", "https://ammardigital.shop/og-image.jpg", undefined, true);
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMSG, setErrorMSG] = useState<string | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchOrder() {
      try {
        setLoading(true);
        setErrorMSG(null);
        
        if (!id) throw new Error("Missing Identification");

        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (error) throw error;
        if (!data) throw new Error("Invoice Protocol Not Found");

        setOrder(data);
      } catch (err: any) {
        console.error("Invoice System Error:", err);
        setErrorMSG(err.message || "A secure handshake error occurred.");
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen pt-48 flex flex-col items-center justify-center bg-[#030303] text-accent">
      <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4" />
      <p className="font-black uppercase tracking-widest text-xs">Decrypting Secure Data...</p>
    </div>
  );

  if (errorMSG || !order) return (
    <div className="min-h-screen pt-48 flex flex-col items-center justify-center bg-[#030303] text-red-500">
      <h2 className="text-2xl font-black uppercase tracking-tighter mb-4">Identity Verification Failed</h2>
      <p className="text-sm font-bold uppercase tracking-widest opacity-60 mb-8">{errorMSG || "Invoice Protocol Not Found"}</p>
      <Link to="/admin" className="btn-bold-primary px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest">
         Return to Access Portal
      </Link>
    </div>
  );

  let dateStr = "Awaiting Verification";
  try {
    if (order.created_at) {
       dateStr = new Date(order.created_at).toLocaleDateString('en-US', { 
         year: 'numeric', month: 'long', day: 'numeric' 
       });
    }
  } catch (e) {
    console.warn("Date parsing error", e);
  }

  return (
    <div className="pt-32 pb-24 min-h-screen font-sans flex justify-center relative">
       {/* Ensure the wrapper completely overtakes dark mode */}
       <div className="fixed inset-0 bg-gray-50 z-[-1]" />
       
       <div className="container-custom max-w-4xl relative z-10">
         <div className="flex justify-between items-center mb-8 print:hidden">
             <Link to="/admin" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors">
               <ArrowLeft size={16} /> Return to Admin
             </Link>
             <button onClick={() => window.print()} className="flex items-center gap-2 px-8 py-4 bg-black text-white hover:bg-gray-800 transition-all uppercase font-black text-[10px] tracking-widest rounded-xl shadow-2xl">
                <Printer size={16} /> Print Official Invoice
             </button>
         </div>

         {/* Invoice Printable Area - STRICTLY LIGHT & PROFESSIONAL */}
         <div 
           id="invoice-capture" 
           ref={printRef} 
           className="bg-white p-8 md:p-12 relative overflow-hidden text-gray-900 shadow-xl border-t-[12px] border-t-black print:p-0 print:border-none print:shadow-none"
           style={{ width: '100%' }}
         >
            
            <div className="flex justify-between items-start mb-8 border-b border-gray-200 pb-6">
                <div>
                   <h1 className="text-2xl font-black uppercase tracking-tighter mb-1 text-black">Ammar Digital Solution</h1>
                   <p className="text-[8px] uppercase tracking-widest text-gray-400 font-bold mt-1">Reg: {BUSINESS_INFO.ntn}</p>
                </div>
                <div className="text-right">
                   <h2 className="text-4xl font-black text-gray-100 uppercase tracking-widest absolute right-12 top-10 -z-1 opacity-50">INVOICE</h2>
                   <p className="text-sm font-bold text-gray-800 mt-2">Invoice No: #{order.id?.substring(0,8).toUpperCase()}</p>
                   <p className="text-xs text-gray-500 mt-1">Date: {dateStr}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-10 mb-8">
                <div>
                    <h4 className="text-[8px] uppercase font-black tracking-widest text-gray-300 mb-2 border-b border-gray-50 pb-1">From</h4>
                    <p className="font-bold text-base mb-0.5">M. Ammar Shahid</p>
                    <p className="text-xs text-gray-600 mb-0.5">Ammar Digital Solution</p>
                    <p className="text-xs text-gray-600 mb-0.5">{BUSINESS_INFO.address}</p>
                    <p className="text-xs text-gray-600 font-bold mt-2">{BUSINESS_INFO.phone}</p>
                    <p className="text-xs text-gray-600">{BUSINESS_INFO.email}</p>
                </div>
                <div>
                    <h4 className="text-[8px] uppercase font-black tracking-widest text-gray-300 mb-2 border-b border-gray-50 pb-1">Billed To</h4>
                    <p className="font-bold text-base mb-0.5 text-black">{order.name}</p>
                    <p className="text-xs text-gray-600 mb-0.5">{order.email}</p>
                    <p className="text-xs text-gray-600">{order.phone}</p>
                </div>
            </div>

            <table className="w-full text-left mb-8 border-collapse">
                <thead>
                    <tr className="border-b-2 border-black">
                        <th className="py-2 text-[8px] font-black uppercase tracking-widest text-gray-400">Description</th>
                        <th className="py-2 text-[8px] font-black uppercase tracking-widest text-gray-400 text-right w-32">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-gray-50">
                        <td className="py-4 pr-8">
                            <p className="font-bold text-gray-900 mb-1 text-sm">Architecture & Digital Service Provision</p>
                            <div className="text-[11px] text-gray-500 leading-relaxed font-mono bg-gray-50/50 p-3 rounded-md border border-gray-100 whitespace-pre-wrap">{order.project_specs || 'Custom digital service provision as per mutual agreement.'}</div>
                            {order.selected_services && order.selected_services.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-1">
                                    {order.selected_services.map((s:any)=><span key={s} className="bg-gray-50 text-gray-400 px-2 py-0.5 text-[7px] rounded border border-gray-100 font-bold uppercase tracking-widest">{s}</span>)}
                                </div>
                            )}
                        </td>
                        <td className="py-4 text-right font-black text-base align-top text-black">
                            {order.amount || 'TBD'}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="flex justify-end mb-10">
                <div className="w-56 border-t border-gray-100 pt-4">
                    <div className="flex justify-between items-center bg-black p-3 rounded-lg">
                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Grand Total</span>
                        <span className="text-xl font-black text-white">{order.amount || '--'}</span>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-50 text-[9px] text-gray-400">
                <div className="grid grid-cols-2 gap-10">
                   <div>
                      <h5 className="font-black uppercase tracking-widest text-gray-600 mb-2">Terms of Service</h5>
                      <p className="leading-relaxed opacity-70">
                        1. IP release upon full clearance.<br/>
                        2. <strong>No Refund Policy:</strong> Digital artifacts non-reversible.<br/>
                        3. Agreement implied by deployment.
                      </p>
                   </div>
                   <div className="text-right flex flex-col justify-end">
                      <p className="font-black uppercase tracking-[0.2em] text-black mb-1 text-[10px]">Ammar Digital Solution</p>
                      <p className="opacity-50">Authorized Digital Service Provider</p>
                   </div>
                </div>
                <div className="text-center font-bold uppercase tracking-[0.3em] text-[7px] opacity-30 mt-8 pb-2">
                     Generated securely via Ammar Digital Architecture OS
                </div>
            </div>
         </div>
       </div>
       <style>{`
          @media print {
            @page { 
                margin: 0mm !important; 
                size: A4 portrait !important; 
            }
            body { 
                background: white !important; 
                margin: 0 !important; 
                padding: 0 !important;
            }
            /* Correctly isolate the invoice content for printing */
            body * {
                visibility: hidden !important;
            }
            #invoice-capture, #invoice-capture * {
                visibility: visible !important;
            }
            #invoice-capture {
                position: fixed !important;
                left: 0 !important;
                top: 0 !important;
                width: 210mm !important;
                height: 297mm !important;
                margin: 0 !important;
                padding: 20mm !important;
                border: none !important;
                box-shadow: none !important;
                background: white !important;
                z-index: 99999 !important;
            }
            
            .print\\:hidden { display: none !important; }
            
            /* Scaling and layout for one-page fit */
            table { page-break-inside: avoid !important; }
            tr { page-break-inside: avoid !important; }
            
            /* Tiny tweaks to fit on one page if content is long */
            h1 { font-size: 18pt !important; }
            h2 { font-size: 24pt !important; opacity: 0.1 !important; }
            p, td, th { font-size: 9pt !important; }
            .py-4 { padding-top: 0.25rem !important; padding-bottom: 0.25rem !important; }
            .mb-8, .mb-10 { margin-bottom: 0.75rem !important; }
          }
       `}</style>
    </div>
  );
}
