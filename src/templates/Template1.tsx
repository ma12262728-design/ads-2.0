export function Template1() {
  return (
    <div className="font-['Playfair_Display'] min-h-screen bg-[#FDFBF7] text-[#1A1A1A]">
      <header className="fixed top-0 w-full bg-[#FDFBF7]/90 backdrop-blur-md z-50 border-b border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <nav className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase">
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Collections</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Designers</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Editorial</a>
          </nav>
          <div className="text-2xl font-bold tracking-widest uppercase">MAISON</div>
          <div className="flex items-center gap-6 text-sm tracking-widest uppercase">
            <a href="#" className="hidden md:block hover:text-[#D4AF37] transition-colors">Account</a>
            <button className="hover:text-[#D4AF37] transition-colors">Cart (0)</button>
          </div>
        </div>
      </header>
      
      <main className="pt-20">
        <section className="h-[80vh] relative flex items-center justify-center bg-[#1A1A1A] text-[#FDFBF7]">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent z-10" />
          <div className="z-20 text-center space-y-6 px-4">
            <h2 className="text-sm tracking-[0.2em] text-[#D4AF37] uppercase">The Fall Collection</h2>
            <h1 className="text-5xl md:text-7xl font-medium tracking-tight">Silent Luxury</h1>
            <button className="mt-8 px-10 py-4 border border-[#FDFBF7] hover:bg-[#FDFBF7] hover:text-[#1A1A1A] transition-colors uppercase tracking-widest text-xs">
              Explore Collection
            </button>
          </div>
        </section>

        <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h3 className="text-3xl font-medium">Curated Essentials</h3>
            <a href="#" className="text-sm uppercase tracking-widest border-b border-[#1A1A1A] pb-1">Shop All</a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[3/4] bg-[#EAE6DF] mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="bg-white text-black px-6 py-3 uppercase text-xs tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform">
                      Quick View
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-lg">Cashmere Overcoat</h4>
                    <p className="text-sm text-gray-500 mt-1">Wool / Cashmere Blend</p>
                  </div>
                  <span className="font-medium tracking-wide">$1,290</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
