function Header({ onNavigateToCalorieCalculator }) {
  return (
    <header className="relative bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 sm:py-20 lg:py-24">
          <div className="text-center">
            
            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              <span className="block">Mat</span>
              <span className="block bg-gradient-to-r from-green-200 to-emerald-200 bg-clip-text text-transparent">
                plan
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="max-w-3xl mx-auto text-lg sm:text-xl text-green-100 leading-relaxed mb-10">
              Lägg till din inköpslista för veckan, räkna ut hur mycket kalorier, protein, 
              kolhydrater och fett du får i dig, och se hur många matlådor det blir!
            </p>
            
            {/* Features */}
            <div className="flex flex-wrap justify-center gap-6 text-green-200 mb-8">
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

            {/* Main Navigation */}
            <div className="mb-4">
              <p className="text-green-100 text-lg font-medium">
                Planera din vecka med personliga kaloriemål och matinspiration!
              </p>
            </div>
            <nav className="flex flex-wrap justify-center gap-2 mb-6">
              <button
                onClick={() => onNavigateToCalorieCalculator?.()}
                className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-white rounded-lg transition-colors text-sm font-medium backdrop-blur-sm border border-blue-300/30"
              >
                🎯 Kaloriräknare
              </button>
              <a
                href="inspiration/"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium backdrop-blur-sm border border-white/20"
              >
                💡 Inspiration
              </a>
            </nav>

            {/* Recipe Categories */}
            <div className="text-center">
              <p className="text-green-200 text-sm mb-3">Receptkategorier:</p>
              <div className="flex flex-wrap justify-center gap-2">
                <a
                  href="inspiration/budget/"
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-xs font-medium backdrop-blur-sm border border-white/20"
                >
                  Budget
                </a>
                <a
                  href="inspiration/fitness/"
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-xs font-medium backdrop-blur-sm border border-white/20"
                >
                  Fitness
                </a>
                <a
                  href="inspiration/familj/"
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-xs font-medium backdrop-blur-sm border border-white/20"
                >
                  Familj
                </a>
                <a
                  href="inspiration/lchf/"
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-xs font-medium backdrop-blur-sm border border-white/20"
                >
                  LCHF
                </a>
                <a
                  href="inspiration/vegetariskt/"
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-xs font-medium backdrop-blur-sm border border-white/20"
                >
                  Vegetariskt
                </a>
                <a
                  href="inspiration/snabbt/"
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-xs font-medium backdrop-blur-sm border border-white/20"
                >
                  Snabbt
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header