function Header() {
  return (
    <header className="relative bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 sm:py-20 lg:py-24">
          <div className="text-center">
            
            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              <span className="block">Matlåde</span>
              <span className="block bg-gradient-to-r from-green-200 to-emerald-200 bg-clip-text text-transparent">
                räknaren
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="max-w-3xl mx-auto text-lg sm:text-xl text-green-100 leading-relaxed mb-10">
              Lägg till hela din inköpslista och räkna ut exakt hur många kalorier, protein, 
              kolhydrater och fett du får i dig under veckan – och se hur många matlådor det blir.
            </p>
            
            {/* Features */}
            <div className="flex flex-wrap justify-center gap-6 text-green-200">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Automatisk näringsberäkning
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Kostnadsuppföljning
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Meal prep-optimerad
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header