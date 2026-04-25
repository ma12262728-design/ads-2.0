import React, { useState, useEffect } from 'react';
import { Menu, X, ExternalLink, Code, ArrowLeft, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  Template1, Template2, Template3, Template4, Template5, 
  Template6, Template7, Template8, Template9, Template10, 
  Template11, Template12, Template13, Template14, Template15 
} from '../templates';

const templates = [
  { id: 1, name: 'Luxury Fashion', component: Template1 },
  { id: 2, name: 'Tech Gadgets', component: Template2 },
  { id: 3, name: 'Beauty & Skincare', component: Template3 },
  { id: 4, name: 'Organic Grocery', component: Template4 },
  { id: 5, name: 'Streetwear', component: Template5 },
  { id: 6, name: 'Luxury Jewelry', component: Template6 },
  { id: 7, name: 'Sports & Fitness', component: Template7 },
  { id: 8, name: 'Kids & Baby', component: Template8 },
  { id: 9, name: 'Home Decor', component: Template9 },
  { id: 10, name: 'Perfume & Fragrance', component: Template10 },
  { id: 11, name: 'Watches & Accessories', component: Template11 },
  { id: 12, name: 'Digital Products', component: Template12 },
  { id: 13, name: 'Pet Products', component: Template13 },
  { id: 14, name: 'Sustainable Eco', component: Template14 },
  { id: 15, name: 'Multi-Vendor', component: Template15 },
];

export function TemplateViewer() {
  const location = useLocation();
  const { cart, addToCart } = useCart();
  const [activeTemplate, setActiveTemplate] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSingleView, setIsSingleView] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const templateId = params.get('templateId');
    const viewMode = params.get('viewMode');
    
    if (viewMode === 'single') {
      setIsSingleView(true);
    }

    if (templateId) {
      const id = parseInt(templateId, 10);
      if (!isNaN(id) && id >= 1 && id <= 15) {
        setActiveTemplate(id);
      }
    }
  }, [location.search]);

  const activeTemplateObj = templates.find(t => t.id === activeTemplate);
  const activeName = activeTemplateObj?.name;
  
  const ActiveComponent = activeTemplate <= 2 
    ? activeTemplateObj?.component || Template1
    : () => (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-gray-50 text-black relative z-10 w-full h-full min-h-screen">
        <h3 className="text-4xl font-bold mb-4 mt-20">Premium Template Locked</h3>
        <p className="text-gray-600 mb-8 max-w-md text-lg">
          Please purchase this individual template or the full 15-in-1 pack to unlock its live preview and source code.
        </p>
        <button 
          onClick={() => addToCart(`template-${activeTemplate}`)} 
          className="bg-[#D4FF00] text-black font-bold px-8 py-4 rounded-xl flex items-center gap-2 hover:bg-[#bce600] text-lg shadow-xl"
        >
          <ShoppingCart size={20} />
          Unlock for 499 PKR
        </button>
      </div>
    );

  return (
    <div className="flex h-screen overflow-hidden bg-white font-sans text-slate-900">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      {!isSingleView && (
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[260px] bg-[#0F0F0F] text-white
        transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">TemplateKit Pro</h1>
            <span className="inline-block mt-2 text-xs font-semibold px-2 py-1 bg-white/10 rounded-full text-white/80">
              15 Templates
            </span>
          </div>
          <button className="md:hidden text-white/50 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <ul className="space-y-1 px-3">
            {templates.map((t) => (
              <li key={t.id}>
                <button
                  onClick={() => {
                    setActiveTemplate(t.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors ${
                    activeTemplate === t.id 
                      ? 'bg-white/10 font-medium text-white' 
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {String(t.id).padStart(2, '0')}. {t.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-white/10 text-xs text-white/40">
          <p>by TemplateKit Pro</p>
          <p className="mt-1">v1.0.0</p>
        </div>
      </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 shrink-0 z-10">
          <div className="flex items-center space-x-3">
            {!isSingleView && (
            <button 
              className="md:hidden p-2 -ml-2 text-gray-500 hover:text-black rounded-md"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            )}
            {isSingleView && (
            <button 
              className="p-2 -ml-2 text-gray-500 hover:text-black rounded-md"
              onClick={() => window.history.back()}
            >
              <ArrowLeft size={20} />
            </button>
            )}
            <h2 className="font-semibold text-gray-800">{String(activeTemplate).padStart(2, '0')}. {activeName}</h2>
          </div>
          
          <div className="flex items-center space-x-3">
            {isSingleView ? (
              <button 
                onClick={() => addToCart(`template-${activeTemplate}`)}
                className={`hidden sm:flex items-center px-4 py-1.5 text-sm font-bold shadow-sm rounded-md transition-colors ${
                  cart.includes(`template-${activeTemplate}`) 
                    ? 'bg-green-50 text-green-600 border border-green-200'
                    : 'bg-[#D4FF00] text-black hover:bg-[#bce600] border border-[#D4FF00]'
                }`}
              >
                {cart.includes(`template-${activeTemplate}`) ? (
                  <><CheckCircle2 size={16} className="mr-2" /> Added (499 PKR)</>
                ) : (
                  <><ShoppingCart size={16} className="mr-2" /> Add to Cart (499 PKR)</>
                )}
              </button>
            ) : (
              <button 
                onClick={() => addToCart('template-pack-full')}
                className={`hidden sm:flex items-center px-4 py-1.5 text-sm font-bold shadow-sm rounded-md transition-colors ${
                  cart.includes('template-pack-full') 
                    ? 'bg-green-50 text-green-600 border border-green-200' 
                    : 'bg-[#D4FF00] text-black hover:bg-[#bce600] border border-[#D4FF00]'
                }`}
              >
                {cart.includes('template-pack-full') ? (
                  <><CheckCircle2 size={16} className="mr-2" /> Full Pack Added</>
                ) : (
                  <><ShoppingCart size={16} className="mr-2" /> Buy Full Pack (2999 PKR)</>
                )}
              </button>
            )}

            {activeTemplate <= 2 && (
              <>
                <button className="hidden sm:flex items-center px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
                  <Code size={16} className="mr-2" />
                  Copy HTML
                </button>
                <button className="flex items-center px-3 py-1.5 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-md transition-colors">
                  <ExternalLink size={16} className="mr-2 hidden sm:block" />
                  <span className="hidden sm:block">Open Full Screen</span>
                  <span className="sm:hidden"><ExternalLink size={16} /></span>
                </button>
              </>
            )}
          </div>
        </header>

        {/* Template Render Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50 relative animate-in fade-in duration-500">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
}
