// ... I will proceed to create other templates in similar chunked fashion
export function Template6() {
  return (
    <div className="font-['Playfair_Display'] min-h-screen bg-[#0A1128] text-[#F9F6EA]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="flex justify-between items-center mb-16 border-b border-[#D4AF37]/20 pb-6">
          <div className="text-3xl tracking-[0.2em] text-[#D4AF37]">AURELIA</div>
          <nav className="flex gap-8 text-sm uppercase tracking-widest">
            <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">High Jewelry</span>
            <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">Bridal</span>
            <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">Timepieces</span>
          </nav>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-6xl leading-tight">Eternity<br/><span className="italic text-[#D4AF37]">Redefined.</span></h1>
            <p className="text-lg text-white/70 max-w-md font-sans font-light">
              Discover the new Renaissance collection. Handcrafted masterpieces featuring flawless grade diamonds.
            </p>
            <div className="flex gap-6 items-center">
              <button className="bg-[#D4AF37] text-[#0A1128] px-8 py-4 font-sans font-medium uppercase tracking-widest hover:bg-white transition-colors">
                Discover
              </button>
              <span className="font-sans text-sm tracking-widest text-[#D4AF37] border-b border-[#D4AF37] pb-1 cursor-pointer">
                Book Boutique Appointment
              </span>
            </div>
          </div>
          <div className="aspect-[3/4] bg-white/5 border border-[#D4AF37]/30 p-4 relative group">
            <div className="absolute inset-4 border border-[#D4AF37]/50" />
            <div className="w-full h-full bg-gradient-to-tr from-[#D4AF37]/20 to-transparent flex items-center justify-center relative overflow-hidden">
              <div className="w-48 h-48 rounded-full border border-[#D4AF37] animate-spin-slow opacity-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Template7() {
  return (
    <div className="font-['Bebas_Neue'] min-h-screen bg-[#111111] text-white">
      <header className="px-8 py-6 flex justify-between items-center bg-black">
        <div className="text-4xl text-[#FF5500] italic">POWER<span className="text-white">FIT</span></div>
        <div className="flex gap-8 text-xl tracking-wider">
          <span className="hover:text-[#FF5500] cursor-pointer">EQUIPMENT</span>
          <span className="hover:text-[#FF5500] cursor-pointer">APPAREL</span>
          <span className="hover:text-[#FF5500] cursor-pointer">SUPPLEMENTS</span>
        </div>
      </header>

      <main>
        <div className="h-[70vh] bg-[#1A1A1A] relative flex items-center justify-center overflow-hidden border-b-8 border-[#FF5500]">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FF5500] to-transparent" />
          <div className="text-center z-10 space-y-4">
            <h1 className="text-[10rem] leading-none tracking-tight">BEAST <span className="text-[#FF5500]">MODE</span></h1>
            <p className="text-2xl font-sans font-bold text-gray-400">PRO LEVEL EQUIPMENT FOR YOUR HOME GYM</p>
            <button className="mt-8 bg-[#FF5500] text-black text-2xl px-12 py-4 hover:bg-white transition-colors">
              SHOP BUNDLES
            </button>
          </div>
        </div>
        
        <div className="p-12">
          <h2 className="text-5xl mb-8 border-l-4 border-[#FF5500] pl-4">WEEKLY DEALS</h2>
          <div className="grid grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-[#1A1A1A] p-6 group cursor-pointer hover:bg-[#222]">
                <div className="aspect-video bg-black mb-4 relative overflow-hidden flex items-end p-4">
                  <div className="text-3xl text-white/20 absolute top-4 left-4">0{i}</div>
                  <div className="text-2xl text-[#FF5500] bg-black p-2 absolute bottom-0 right-0">20% OFF</div>
                </div>
                <h3 className="text-2xl mb-2">ADJUSTABLE DUMBBELL SET</h3>
                <div className="font-sans font-bold text-xl">$299.99 <span className="text-gray-500 line-through text-sm">$399.99</span></div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export function Template8() {
  return (
    <div className="font-['Nunito'] min-h-screen bg-[#FFF5F7] text-[#4A4A4A]">
      <header className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🧸</span>
            <span className="font-bold text-2xl text-[#FF758F]">tiny<span className="text-[#A2D2FF]">tots</span></span>
          </div>
          <nav className="flex gap-6 font-bold text-gray-600">
            <span className="text-[#FF758F] border-b-2 border-[#FF758F] pb-1">Clothing</span>
            <span className="hover:text-[#A2D2FF]">Toys</span>
            <span className="hover:text-[#CDB4DB]">Nursery</span>
          </nav>
          <div className="bg-[#A2D2FF] text-white font-bold px-6 py-2 rounded-full cursor-pointer hover:bg-[#BDE0FE]">
            Cart : 2
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-[#FFC8DD] rounded-[3rem] p-12 flex items-center justify-between shadow-sm relative overflow-hidden">
          <div className="absolute top-[-20px] right-[-20px] text-9xl opacity-20">☁️</div>
          <div className="z-10 bg-white/60 backdrop-blur-md p-8 rounded-3xl max-w-lg">
            <h1 className="text-4xl font-black text-[#FF758F] mb-4">Softest hugs for your little ones.</h1>
            <p className="text-lg font-bold text-gray-600 mb-6">Organic cotton essentials designed for comfort and joy.</p>
            <button className="bg-[#FF758F] text-white font-black px-8 py-3 rounded-full text-lg shadow-lg hover:scale-105 transition-transform">
              Shop Newborn
            </button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-black text-gray-700 mb-8">Shop by Age</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            {['0-3 Months', '3-6 Months', '6-12 Months', '1-2 Years', '2-4 Years'].map((age, i) => (
              <div key={i} className="px-6 py-3 bg-white rounded-full font-bold shadow-sm text-gray-600 border-2 border-transparent hover:border-[#A2D2FF] cursor-pointer">
                {age}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export function Template9() {
  return (
    <div className="font-['DM_Sans'] min-h-screen bg-[#F7F5F2] text-[#4A443E]">
      <header className="px-10 py-6 flex justify-between items-center bg-[#F7F5F2]">
        <div className="text-2xl font-bold tracking-tighter">HABITAT</div>
        <nav className="flex gap-8 text-sm font-medium">
          <span className="cursor-pointer">Living</span>
          <span className="cursor-pointer">Dining</span>
          <span className="cursor-pointer">Bedroom</span>
          <span className="cursor-pointer underline decoration-[#8B9B8A] decoration-2 underline-offset-4">Collections</span>
        </nav>
      </header>
      
      <div className="px-10 py-10 grid grid-cols-12 gap-8">
        <div className="col-span-3 space-y-8">
          <div>
            <h3 className="font-bold mb-4">Filter by Material</h3>
            <div className="space-y-2 text-sm text-[#7A746E]">
              <div><input type="checkbox" className="mr-2 accent-[#8B9B8A]"/> Solid Walnut</div>
              <div><input type="checkbox" className="mr-2 accent-[#8B9B8A]"/> Boucle Fabric</div>
              <div><input type="checkbox" className="mr-2 accent-[#8B9B8A]"/> Travertine</div>
              <div><input type="checkbox" className="mr-2 accent-[#8B9B8A]"/> Linen</div>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4">Price Range</h3>
            <div className="w-full h-1 bg-[#EAE8E4] rounded-full relative">
              <div className="absolute left-[20%] right-[40%] h-full bg-[#8B9B8A] rounded-full" />
              <div className="w-4 h-4 bg-[#8B9B8A] rounded-full absolute top-1/2 -translate-y-1/2 left-[20%] shadow" />
              <div className="w-4 h-4 bg-[#8B9B8A] rounded-full absolute top-1/2 -translate-y-1/2 right-[40%] shadow" />
            </div>
            <div className="flex justify-between text-sm mt-3 font-medium text-[#7A746E]">
              <span>$250</span><span>$1,400</span>
            </div>
          </div>
        </div>
        
        <div className="col-span-9">
          <div className="aspect-[21/9] bg-[#EAE8E4] rounded-xl mb-10 overflow-hidden relative group">
            <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200")'}} />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-8 left-8 text-white">
              <h2 className="text-3xl font-bold mb-2">The Kyoto Collection</h2>
              <p className="max-w-md text-white/90">Minimalist Japanese-inspired pieces for serene living spaces.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="group cursor-pointer">
                <div className="bg-[#EAE8E4] aspect-square rounded-lg mb-4 relative overflow-hidden">
                  <div className="absolute top-3 left-3 bg-white px-2 py-1 text-xs font-bold rounded shadow-sm">NEW</div>
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="font-bold">Kew Lounge Chair</h4>
                <div className="text-sm text-[#7A746E] mb-2">Boucle White / Walnut</div>
                <div className="font-medium">$890</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Template10() {
  return (
    <div className="font-['Cormorant_Garamond'] min-h-screen bg-[#F9F6F0] text-[#5A4D41]">
      <header className="border-b border-[#EADDCE] py-6 text-center bg-white sticky top-0 z-10 w-full relative">
        <h1 className="text-4xl tracking-[0.3em] font-medium text-[#B8860B]">SANTAL</h1>
        <p className="font-sans text-xs tracking-widest mt-2 uppercase text-[#968A7E]">Parfumeur Parisien</p>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl italic mb-6">Discover Your Signature Scent</h2>
        <p className="font-sans text-sm tracking-widest uppercase mb-12 text-[#B8860B]">The Olfactory Quiz</p>
        
        <div className="bg-white p-16 border border-[#EADDCE] shadow-sm relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#F9F6F0] rounded-full border border-[#EADDCE] flex items-center justify-center font-sans text-xs">01</div>
          <h3 className="text-3xl mb-10">Which environment brings you the most peace?</h3>
          
          <div className="grid grid-cols-2 gap-6 font-sans">
            <button className="border border-[#EADDCE] p-6 hover:border-[#B8860B] transition-colors group">
              <div className="text-lg font-['Cormorant_Garamond'] text-2xl mb-2 group-hover:text-[#B8860B]">A sunlit cedar forest</div>
              <div className="text-xs text-[#968A7E]">Notes of wood, earth, and moss</div>
            </button>
            <button className="border border-[#EADDCE] p-6 hover:border-[#B8860B] transition-colors group">
              <div className="text-lg font-['Cormorant_Garamond'] text-2xl mb-2 group-hover:text-[#B8860B]">A blooming rose garden</div>
              <div className="text-xs text-[#968A7E]">Notes of petals, morning dew, and nectar</div>
            </button>
            <button className="border border-[#EADDCE] p-6 hover:border-[#B8860B] transition-colors group">
              <div className="text-lg font-['Cormorant_Garamond'] text-2xl mb-2 group-hover:text-[#B8860B]">An Italian citrus orchard</div>
              <div className="text-xs text-[#968A7E]">Notes of bergamot, zest, and sunlight</div>
            </button>
            <button className="border border-[#EADDCE] p-6 hover:border-[#B8860B] transition-colors group text-white bg-[#5A4D41]">
              <div className="text-lg font-['Cormorant_Garamond'] text-2xl mb-2 text-[#EADDCE]">A smoky speakeasy</div>
              <div className="text-xs text-white/50">Notes of tobacco, vanilla, and amber</div>
            </button>
          </div>
          
          <div className="mt-12 flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#5A4D41]"></div>
            <div className="w-2 h-2 rounded-full bg-[#EADDCE]"></div>
            <div className="w-2 h-2 rounded-full bg-[#EADDCE]"></div>
            <div className="w-2 h-2 rounded-full bg-[#EADDCE]"></div>
            <div className="w-2 h-2 rounded-full bg-[#EADDCE]"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export function Template11() {
  return (
    <div className="font-['Inter'] min-h-screen bg-[#E5E5E5] text-[#1A1A1A]">
      <header className="bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-white px-8 py-5 flex justify-between items-center shadow-2xl z-50 relative">
        <div className="font-bold text-2xl tracking-[0.2em] uppercase">Chronos</div>
        <div className="flex gap-4">
          <button className="px-6 py-2 border border-white/20 hover:bg-white hover:text-black transition-colors rounded-sm text-sm tracking-widest uppercase">
            Save Build
          </button>
          <button className="px-6 py-2 bg-white text-black hover:bg-gray-200 transition-colors rounded-sm text-sm tracking-widest uppercase font-bold">
            Checkout $1,250
          </button>
        </div>
      </header>
      
      <main className="flex flex-col md:flex-row h-[calc(100vh-80px)]">
        <div className="flex-1 bg-[#F5F5F5] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-gray-300 to-transparent opacity-50" />
          <div className="relative z-10 w-96 h-96 flex bg-[#C0C0C0]/20 rounded-full items-center justify-center border-4 border-white shadow-2xl backdrop-blur-xl">
             <div className="text-gray-400 font-mono tracking-widest">360° PREVIEW</div>
          </div>
        </div>
        
        <div className="w-full md:w-[450px] bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.05)] overflow-y-auto p-8 relative z-10">
          <h2 className="text-2xl font-bold tracking-tight mb-2">Configure Your Watch</h2>
          <p className="text-gray-500 mb-8 text-sm">Select your components to build a custom timepiece.</p>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b pb-2">1. Case Material</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="border-2 border-black p-4 text-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 mx-auto mb-2" />
                  <div className="text-xs font-bold">Brushed Steel</div>
                  <div className="text-xs text-gray-500">Included</div>
                </button>
                <button className="border-2 border-gray-100 p-4 text-center hover:border-gray-300">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 mx-auto mb-2" />
                  <div className="text-xs font-bold">Matte Black</div>
                  <div className="text-xs text-gray-500">+$150</div>
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b pb-2">2. Dial Type</h3>
              <div className="grid grid-cols-3 gap-3">
                {[1,2,3].map(i => (
                  <button key={i} className={`border-2 p-3 text-center ${i===1 ? 'border-black':'border-gray-100 hover:border-gray-300'}`}>
                    <div className="w-10 h-10 rounded-full border border-gray-300 mx-auto mb-2 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-black" />
                    </div>
                    <div className="text-xs font-bold">Noir</div>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <input type="text" placeholder="Add Free Engraving (Max 15 chars)" className="w-full border p-3 text-sm focus:outline-none focus:border-black" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export function Template12() {
  return (
    <div className="font-['Inter'] min-h-screen bg-[#070707] text-[#FAFAFA]">
      <header className="px-8 py-6 flex justify-between items-center border-b border-white/10">
        <div className="text-xl font-bold tracking-tight">digi<span className="text-[#B2FF00]">vault</span></div>
        <div className="flex gap-4">
          <input type="search" placeholder="Search resources..." className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#B2FF00] w-64 text-white" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-5xl font-bold mb-6">High-Quality Design Assets</h1>
          <p className="text-gray-400 text-lg">Download premium UI kits, templates, and icon packs for your next project.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="bg-[#111] rounded-2xl border border-white/10 overflow-hidden group hover:border-[#B2FF00]/50 transition-colors">
              <div className="aspect-video bg-[#1F1F1F] p-4 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#B2FF00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-2 py-1 rounded text-xs font-bold text-[#B2FF00] flex items-center gap-1">
                  ZIP
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">Fintech Dashboard UI Kit</h3>
                  <span className="font-bold">$49</span>
                </div>
                <p className="text-sm text-gray-400 mb-6 line-clamp-2">A complete dashboard UI kit for fintech apps containing 100+ screens and components.</p>
                
                <div className="flex gap-3">
                  <button className="flex-1 bg-white text-black font-bold py-2.5 rounded-lg hover:bg-gray-200 transition-colors">Buy Now</button>
                  <button className="px-4 border border-white/20 rounded-lg hover:bg-white/10 transition-colors">Preview</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export function Template13() {
  return (
    <div className="font-['Nunito'] min-h-screen bg-[#FDF9F1] text-[#3E362A]">
      <header className="px-8 py-5 flex justify-between items-center bg-[#FDF9F1] shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
           <span className="text-2xl">🐾</span>
           <span className="font-black text-2xl text-[#E07A5F]">paw<span className="text-[#3D405B]">prints</span></span>
        </div>
        <nav className="hidden md:flex gap-6 font-bold text-[#3D405B]">
          <span className="hover:text-[#E07A5F] cursor-pointer">Dogs</span>
          <span className="hover:text-[#E07A5F] cursor-pointer">Cats</span>
          <span className="hover:text-[#E07A5F] cursor-pointer">Health</span>
          <span className="hover:text-[#E07A5F] cursor-pointer">Learn</span>
        </nav>
        <button className="bg-[#E07A5F] text-white font-bold px-6 py-2 rounded-full shadow-md hover:bg-[#D56B4D]">
          Shop
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-[#81B29A] rounded-3xl p-10 flex flex-col md:flex-row items-center gap-10 text-white shadow-lg overflow-hidden relative">
          <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="flex-1 relative z-10">
            <span className="bg-[#E07A5F] text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">Subscription Box</span>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">Tailored nutrition for your best friend.</h1>
            <p className="text-white/90 text-lg font-medium mb-8">Take our 2-minute quiz to get a customized meal plan delivered perfectly on schedule.</p>
            <button className="bg-white text-[#81B29A] font-black text-lg px-8 py-4 rounded-full shadow-xl hover:scale-105 transition-transform">
              Create Pet Profile
            </button>
          </div>
          <div className="w-full md:w-1/3 aspect-square bg-[#F4F1DE]/20 rounded-full border-4 border-white/30 backdrop-blur-sm flex items-center justify-center p-8">
            <div className="text-center font-black text-2xl text-white/50">Image</div>
          </div>
        </div>

        <h2 className="text-3xl font-black text-[#3D405B] text-center mt-16 mb-10">Vet-Approved Top Picks</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
           {[1,2,3,4].map(i => (
             <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-[#F4F1DE] hover:shadow-md transition-shadow">
               <div className="aspect-square bg-[#FDF9F1] rounded-xl mb-4" />
               <div className="flex gap-1 mb-2 text-[#E07A5F] text-xs">★★★★★</div>
               <h3 className="font-bold text-[#3D405B] mb-1 line-clamp-1">Grain-Free Salmon Mix</h3>
               <div className="font-black text-[#81B29A]">$24.99</div>
             </div>
           ))}
        </div>
      </main>
    </div>
  );
}

export function Template14() {
  return (
    <div className="font-['Inter'] min-h-screen bg-[#F6F7F5] text-[#2C3E2D]">
      <header className="bg-white border-b border-[#E3E8E3] sticky top-0 z-40">
        <div className="text-center bg-[#8B9B8A] text-white text-xs py-1.5 font-medium tracking-wide">
          1% of every order goes strictly to ocean cleanup orgs.
        </div>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-black text-xl tracking-tight">EARTH<span className="text-[#8B9B8A] font-medium">BORN</span></div>
          <nav className="flex gap-8 text-sm font-semibold text-gray-500">
            <span className="text-[#2C3E2D]">Kitchen</span>
            <span>Bathroom</span>
            <span>On-The-Go</span>
            <span>Our Impact</span>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="aspect-[4/3] bg-[#E3E8E3] rounded-3xl overflow-hidden relative">
             <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-green-500"></span>
               Plastic Negative
             </div>
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl font-bold tracking-tight mb-6 text-[#2C3E2D]">Small swaps. <br/>Massive impact.</h1>
            <p className="text-gray-600 text-lg mb-8 max-w-md">Everyday essentials redesigned to eliminate single-use plastics from your life for good.</p>
            <div className="flex gap-4">
              <button className="bg-[#2C3E2D] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#1A261A] transition-colors">Shop Essentials</button>
            </div>
            
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-[#E3E8E3] pt-6">
              <div>
                <div className="text-2xl font-black text-[#8B9B8A]">1.2M</div>
                <div className="text-xs font-medium text-gray-500 mt-1 uppercase tracking-wide">Bottles Saved</div>
              </div>
              <div>
                <div className="text-2xl font-black text-[#8B9B8A]">100%</div>
                <div className="text-xs font-medium text-gray-500 mt-1 uppercase tracking-wide">Compostable</div>
              </div>
              <div>
                <div className="text-2xl font-black text-[#8B9B8A]">Zero</div>
                <div className="text-xs font-medium text-gray-500 mt-1 uppercase tracking-wide">Microplastics</div>
              </div>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-8">Popular Swaps</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 group">
              <div className="aspect-square bg-[#F6F7F5] rounded-xl mb-4 flex items-center justify-center text-xs text-gray-400">
                Image
              </div>
              <h3 className="font-bold text-sm mb-1">Bamboo Toothbrush Set</h3>
              <div className="text-gray-500 text-xs mb-3">Replaces 4 plastic brushes</div>
              <div className="flex justify-between items-center">
                <span className="font-bold">$12.00</span>
                <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#8B9B8A] group-hover:text-white transition-colors">
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export function Template15() {
  return (
    <div className="font-['Inter'] min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-black tracking-tighter text-[#FF6B35]">
            MARKET<span className="text-[#004E89]">HUB</span>
          </div>
          <div className="flex-1 max-w-2xl mx-8 relative">
            <input type="text" placeholder="Search across 10,000+ verified sellers..." className="w-full border-2 border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-[#004E89]" />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#004E89] text-white px-3 py-1 rounded text-sm font-bold">Search</button>
          </div>
          <div className="flex items-center gap-6 font-bold text-sm">
            <span className="cursor-pointer text-gray-600 hover:text-black">Become a Seller</span>
            <span className="cursor-pointer">Sign In</span>
            <button className="flex items-center gap-2">
              <span className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">🛒</span>
              <span>$0.00</span>
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex gap-6 text-sm font-medium text-gray-600 overflow-x-auto">
          <span className="text-[#FF6B35]">🔥 Flash Deals</span>
          <span>Electronics</span>
          <span>Fashion</span>
          <span>Home & Garden</span>
          <span>Automotive</span>
          <span>Sports</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        <aside className="w-64 shrink-0 hidden lg:block">
          <div className="bg-white p-5 rounded-xl border border-gray-200 sticky top-4">
            <h3 className="font-bold mb-4">Categories</h3>
            <ul className="space-y-3 text-sm text-gray-600 mb-8">
               <li><input type="checkbox" className="mr-2"/> Computers & Laptops <span className="text-gray-400 float-right">(452)</span></li>
               <li><input type="checkbox" className="mr-2"/> Smartphones <span className="text-gray-400 float-right">(120)</span></li>
               <li><input type="checkbox" className="mr-2"/> Audio Devices <span className="text-gray-400 float-right">(38)</span></li>
            </ul>
            
            <h3 className="font-bold mb-4">Seller Rating</h3>
            <div className="space-y-2 text-sm text-[#FFB703]">
              <div><input type="checkbox" className="mr-2 accent-[#004E89]"/> ★★★★★ & Up</div>
              <div><input type="checkbox" className="mr-2 accent-[#004E89]"/> ★★★★☆ & Up</div>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Recommended for you</h2>
            <select className="border border-gray-200 rounded px-3 py-1.5 text-sm bg-white font-medium">
              <option>Recommended</option>
              <option>Lowest Price</option>
              <option>Highest Rating</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-100 rounded-lg mb-4 relative">
                  <div className="absolute top-2 left-2 bg-[#FF6B35] text-white text-[10px] font-bold px-2 py-1 rounded">
                    -15% OFF
                  </div>
                </div>
                <div className="text-xs text-gray-500 mb-1 flex items-center justify-between">
                  <span>Sold by <a href="#" className="text-[#004E89] hover:underline">TechStore Pro</a></span>
                  <span className="text-[#FFB703]">★ 4.8</span>
                </div>
                <h3 className="font-bold text-sm mb-2 line-clamp-2 leading-tight">Wireless Noise Cancelling Headphones - Over Ear Bluetooth</h3>
                <div className="flex items-end gap-2 mb-4">
                  <span className="text-lg font-black text-[#FF6B35]">$89.99</span>
                  <span className="text-sm text-gray-400 line-through mb-0.5">$115.00</span>
                </div>
                <button className="w-full bg-white border-2 border-[#004E89] text-[#004E89] font-bold py-2 rounded-lg hover:bg-[#004E89] hover:text-white transition-colors text-sm">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
