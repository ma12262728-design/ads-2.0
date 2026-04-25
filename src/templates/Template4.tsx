export function Template4() {
  return (
    <div className="font-['Nunito'] min-h-screen bg-white text-gray-800">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="bg-[#2D5A27] text-white text-center py-2 text-sm font-semibold tracking-wide">
          FREE LOCAL DELIVERY ON ORDERS OVER $50
        </div>
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="text-[#2D5A27] text-2xl font-black tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#E5F0E6] flex items-center justify-center mb-1">🌿</div>
            FRESH<span className="text-[#F2A900]">ROOTS</span>
          </div>
          
          <div className="hidden flex-1 max-w-xl mx-8 md:flex">
            <div className="w-full relative">
              <input 
                type="text" 
                placeholder="Search for organic produce, pantry staples..." 
                className="w-full bg-gray-100 rounded-full py-3 px-6 pr-12 focus:outline-none focus:ring-2 focus:ring-[#2D5A27]/20 transition-shadow"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6 font-bold text-[#2D5A27]">
            <a href="#" className="hidden sm:block hover:text-[#F2A900]">Log In</a>
            <button className="flex items-center gap-2 bg-[#E5F0E6] px-4 py-2 rounded-full hover:bg-[#D1E5D3] transition-colors">
              🛒 <span className="w-6 h-6 bg-[#2D5A27] text-white rounded-full flex items-center justify-center text-xs">3</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Categories Banner */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {['Produce', 'Pantry', 'Dairy & Eggs', 'Bakery', 'Meat & Seafood', 'Snacks', 'Beverages'].map((cat, i) => (
            <button key={i} className="whitespace-nowrap px-6 py-2 rounded-full border border-gray-200 font-bold text-gray-600 hover:border-[#2D5A27] hover:text-[#2D5A27] transition-all">
              {cat}
            </button>
          ))}
        </div>

        {/* Hero */}
        <div className="mt-8 bg-[#FDF9ED] rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 h-[400px]">
          <div className="max-w-xl">
            <span className="inline-block px-4 py-1.5 bg-[#2D5A27] text-white rounded-full text-sm font-bold mb-6">
              New Harvest
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-[#2D5A27] leading-tight mb-6 mt-2">
              Locally sourced. <br/>Delivered to your door.
            </h1>
            <button className="bg-[#F2A900] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#DE9B00] transition-colors shadow-lg shadow-[#F2A900]/20">
              Build Your Box
            </button>
          </div>
        </div>

        {/* Filters & Grid */}
        <div className="mt-16 flex flex-col sm:flex-row justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-[#2D5A27]">Fresh This Week</h2>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full border border-green-200">Organic</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full border border-purple-200">Keto</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full border border-blue-200">Gluten-Free</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-xl hover:shadow-gray-200/50 transition-shadow group flex flex-col">
              <div className="aspect-square bg-[#F5F8F5] rounded-xl mb-4 relative overflow-hidden flex items-center justify-center p-8">
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                  <span className="w-8 h-8 bg-white shadow-sm rounded-full flex items-center justify-center text-xs font-bold text-[#2D5A27]">O</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Produce</p>
                <h3 className="font-bold text-lg text-gray-800 mb-2 leading-tight">Organic Heirloom Tomatoes</h3>
                <div className="text-sm text-gray-500 mb-4">$4.99 / lb</div>
              </div>
              <button className="w-full border-2 border-[#2D5A27] text-[#2D5A27] font-bold py-2 rounded-xl group-hover:bg-[#2D5A27] group-hover:text-white transition-colors">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
