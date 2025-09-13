function LiveSummaryBar({ totals, totalPrice, ingredientCount, mealCount }) {
  const numericMealCount = typeof mealCount === 'string' ? (parseInt(mealCount) || 1) : mealCount
  const perPortionKcal = Math.round(totals.kcal / numericMealCount)
  const perPortionPrice = Math.round((totalPrice / numericMealCount) * 100) / 100

  if (ingredientCount === 0) {
    return null // Don't show when no ingredients
  }

  return (
    <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm animate-slideDown">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Quick stats */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-900">
                {ingredientCount} {ingredientCount === 1 ? 'vara' : 'varor'}
              </span>
            </div>
            
            <div className="hidden sm:flex items-center gap-4 text-sm">
              <div>
                <span className="font-semibold text-gray-900">{totals.kcal}</span>
                <span className="text-gray-500 ml-1">kcal totalt</span>
              </div>
              <div>
                <span className="font-semibold text-green-600">{totalPrice}</span>
                <span className="text-gray-500 ml-1">kr totalt</span>
              </div>
            </div>
          </div>

          {/* Right side - Per portion info */}
          <div className="flex items-center gap-4 text-sm">
            <div className="text-right">
              <div className="font-semibold text-gray-900">
                {perPortionKcal} kcal
                <span className="text-gray-500 font-normal ml-1">/ portion</span>
              </div>
              <div className="font-semibold text-green-600">
                {perPortionPrice} kr
                <span className="text-gray-500 font-normal ml-1">/ portion</span>
              </div>
            </div>
            
            {/* Quick action buttons */}
            <div className="flex items-center gap-2">
              <button 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                title="Exportera lista"
              >
                <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
              
              <button 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                title="Dela lista"
              >
                <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiveSummaryBar