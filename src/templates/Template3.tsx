export function Template3() {
  return (
    <div className="font-['DM_Sans'] min-h-screen bg-[#FAF9F5] text-[#4A4A4A]">
      <header className="w-full bg-[#FAF9F5] pt-4 px-6 md:px-12 flex items-center justify-between z-50 top-0 sticky">
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#" className="hover:text-[#C5A880]">Shop</a>
          <a href="#" className="hover:text-[#C5A880]">Routine</a>
          <a href="#" className="hover:text-[#C5A880]">Our Story</a>
        </nav>
        <h1 className="text-3xl font-normal tracking-tight text-[#2C3E35] font-['Cormorant_Garamond']">Aura</h1>
        <div className="flex gap-4 items-center">
          <button className="hidden md:block px-6 py-2 bg-[#F0ECE1] rounded-full text-sm font-medium hover:bg-[#E5DFD1] transition-colors">
            Take Quiz
          </button>
          <button className="text-sm font-medium hover:text-[#C5A880]">Cart (0)</button>
        </div>
      </header>

      <main className="pb-24">
        <section className="px-6 md:px-12 py-12 md:py-20 flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2 space-y-8">
            <h2 className="text-5xl md:text-7xl font-['Cormorant_Garamond'] text-[#2C3E35] leading-[1.1]">
              Skincare rooted in nature.
            </h2>
            <p className="text-lg md:text-xl text-[#7A7A7A] max-w-md leading-relaxed">
              Formulated with clinically-proven botanicals to restore your skin's natural barrier.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-[#2C3E35] text-white rounded-full font-medium hover:bg-[#1E2B25] transition-colors">
                Shop Best Sellers
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 aspect-[4/5] md:aspect-square bg-[#E5DFD1] rounded-[2rem] overflow-hidden rounded-tr-[8rem]">
            {/* Image Placeholder */}
          </div>
        </section>

        <section className="px-6 md:px-12 py-20 bg-[#F4F1EA]">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-['Cormorant_Garamond'] text-[#2C3E35]">Build Your Routine</h3>
            <p className="text-[#7A7A7A] mt-4">Simple, effective, 3-step system.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {['Step 1: Cleanse', 'Step 2: Treat', 'Step 3: Hydrate'].map((step, i) => (
              <div key={i} className="text-center group">
                <div className="aspect-[3/4] bg-white rounded-[2rem] mb-6 p-8 flex items-center justify-center border border-transparent group-hover:border-[#C5A880] transition-colors cursor-pointer shadow-sm">
                  <div className="w-32 h-48 bg-[#F0ECE1] rounded-full" />
                </div>
                <h4 className="font-bold text-[#2C3E35] tracking-wide text-sm uppercase">{step}</h4>
                <p className="mt-2 text-[#7A7A7A] text-sm">Select from 4 formulas</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
