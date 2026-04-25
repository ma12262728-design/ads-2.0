export function Template5() {
  return (
    <div className="font-['Inter'] font-bold min-h-screen bg-black text-white overflow-hidden uppercase">
      {/* Marquee Header */}
      <div className="w-full bg-[#FF0000] text-black overflow-hidden py-2 whitespace-nowrap border-b-4 border-black box-content relative z-50">
        <div className="animate-marquee inline-block text-xl tracking-tight">
          FREE SHIPPING ON ALL ORDERS OVER $200 /// NEW DROP LIVE /// LIMITED QUANTITIES /// NO RESTOCKS /// FREE SHIPPING ON ALL ORDERS OVER $200 /// NEW DROP LIVE /// LIMITED QUANTITIES ///
        </div>
      </div>

      <header className="relative z-40 border-b border-white/20 bg-black/90 backdrop-blur-xl">
        <div className="px-6 h-24 flex items-center justify-between">
          <div className="text-4xl tracking-tighter w-1/3">
            HYPE<span className="text-[#FF0000]">BEAST</span>
          </div>
          <nav className="hidden md:flex gap-12 text-lg tracking-tight w-1/3 justify-center">
            <a href="#" className="text-[#FF0000]">Latest</a>
            <a href="#" className="hover:text-[#FF0000] transition-colors">Footwear</a>
            <a href="#" className="hover:text-[#FF0000] transition-colors">Apparel</a>
          </nav>
          <div className="flex gap-6 w-1/3 justify-end text-lg">
            <button className="hover:text-[#FF0000] transition-colors">Account</button>
            <button className="hover:text-[#FF0000] transition-colors">Cart [2]</button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <div className="relative h-[80vh] w-full border-b border-white/20 overflow-hidden group">
          <div className="absolute inset-0 bg-[#111] grid grid-cols-2 grid-rows-2 opacity-20">
            <div className="border-r border-b border-white"></div>
            <div className="border-b border-white"></div>
            <div className="border-r border-white"></div>
            <div></div>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none z-10">
            <h1 className="text-[12vw] leading-none tracking-tighter font-black text-transparent [-webkit-text-stroke:2px_white] opacity-50 group-hover:opacity-10 transition-opacity duration-1000">
              FRAGMENT
            </h1>
            <h1 className="text-[12vw] leading-none tracking-tighter font-black text-[#FF0000] -mt-10 md:-mt-20">
              ARCHIVE
            </h1>
          </div>
          <div className="absolute bottom-12 left-12 z-20">
            <div className="text-2xl mb-4 tracking-tight">Drop 004 // FW24</div>
            <button className="bg-white text-black px-12 py-4 text-xl tracking-tight hover:bg-[#FF0000] hover:text-white transition-colors">
              ENTER STORE
            </button>
          </div>
          <div className="absolute top-12 left-12 z-20 font-mono text-sm opacity-50 space-y-1">
            <div>LC: 34.0522° N, 118.2437° W</div>
            <div>TIME: 12:04:32 PST</div>
            <div>STATUS: ONLINE</div>
          </div>
        </div>

        {/* Product Grid */}
        <section className="p-6 md:p-12">
          <div className="flex justify-between items-end mb-12 border-b border-white/20 pb-4">
            <h2 className="text-4xl tracking-tighter">LATEST RELEASES</h2>
            <div className="flex items-center gap-4 text-[#FF0000]">
              <span className="w-3 h-3 bg-[#FF0000] rounded-full animate-pulse"></span>
              Live Now
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[4/5] bg-[#1A1A1A] mb-4 relative flex items-center justify-center overflow-hidden border border-white/5 hover:border-white/40 transition-colors">
                  {i === 2 && (
                    <div className="absolute top-4 right-4 bg-[#FF0000] text-white px-3 py-1 text-xs">
                      SOLD OUT
                    </div>
                  )}
                  {/* Size overlay on hover */}
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-full px-6 space-y-4">
                      <div className="text-sm border-b border-white/20 pb-2 mb-4">SELECT SIZE</div>
                      <div className="grid grid-cols-4 gap-2 text-center">
                        {['S', 'M', 'L', 'XL'].map(size => (
                          <div key={size} className="py-2 border border-white/20 hover:bg-white hover:text-black transition-colors">{size}</div>
                        ))}
                      </div>
                      <button className="w-full bg-[#FF0000] py-3 mt-4 text-sm tracking-widest hover:bg-red-700 transition-colors">
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-start tracking-tight">
                  <h3 className="text-xl">Heavyweight Hoodie 0{i}</h3>
                  <span className="text-xl text-[#FF0000]">$180</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
