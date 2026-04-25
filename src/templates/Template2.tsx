export function Template2() {
  return (
    <div className="font-['Inter'] min-h-screen bg-[#0A0A0A] text-white selection:bg-[#00E5FF] selection:text-black">
      <nav className="fixed w-full z-50 top-0 border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#00E5FF] to-[#0055FF] rounded-lg" />
            <span className="font-bold text-xl tracking-tight">NEXUS</span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-gray-400">
            <a href="#" className="text-white">Shop</a>
            <a href="#" className="hover:text-white transition-colors">Compare</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
          <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
            Cart (0)
          </button>
        </div>
      </nav>

      <main className="pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#111] to-[#0A0A0A] border border-white/10 rounded-3xl p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00E5FF]/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3" />
            
            <div className="relative z-10 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[#00E5FF] text-xs font-semibold uppercase tracking-wider mb-8">
                <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
                Pre-order Now
              </div>
              <h1 className="text-6xl font-bold tracking-tighter mb-6">Pro Vision X</h1>
              <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                Experience reality augmented. The most advanced spatial computing headset ever created.
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition-colors">
                  Pre-order $3,499
                </button>
                <button className="px-8 py-4 rounded-full font-semibold border border-white/20 hover:bg-white/10 transition-colors">
                  View Specs
                </button>
              </div>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-[#00E5FF]/50 transition-colors cursor-pointer group">
                <div className="aspect-square bg-black/50 rounded-xl mb-6 relative overflow-hidden">
                  {/* Image placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center text-white/20">
                    Image
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-[#00E5FF] transition-colors">Nexus Pods Pro</h3>
                <p className="text-sm text-gray-500 mb-4">Active noise cancellation</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold">$249</span>
                  <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#00E5FF] group-hover:text-black transition-colors">
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
