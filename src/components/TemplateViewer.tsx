import React, { Suspense } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const templates: Record<string, React.LazyExoticComponent<any>> = {
  '1': React.lazy(() => import('../templates/Template1')),
  '2': React.lazy(() => import('../templates/Template2')),
};

export function TemplateViewer() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get('id') || '1';

  const TemplateComponent = templates[id];

  if (!TemplateComponent) {
    return (
      <div className="flex h-screen items-center justify-center text-white bg-black flex-col">
        <h1 className="text-2xl font-bold mb-4">Template not found</h1>
        <button onClick={() => navigate('/templates')} className="text-accent underline text-sm">
          Go back to templates
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      <button 
        onClick={() => navigate('/templates')}
        className="fixed top-6 left-6 z-50 text-white flex items-center gap-2 bg-black/50 p-2 px-4 rounded-full border border-white/10 hover:border-accent transition-colors text-xs uppercase tracking-widest font-bold backdrop-blur-md"
      >
        <ArrowLeft size={16} /> Back
      </button>
      
      <Suspense fallback={
        <div className="flex h-screen items-center justify-center text-white bg-black">
          <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <TemplateComponent />
      </Suspense>
    </div>
  );
}
