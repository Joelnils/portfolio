function SummaryCard({ title, icon, nutrition, price, mealCount, isTotal = false }) {
  const displayNutrition = isTotal ? nutrition : {
    kcal: Math.round(nutrition.kcal / mealCount),
    protein: Math.round((nutrition.protein / mealCount) * 10) / 10,
    carbs: Math.round((nutrition.carbs / mealCount) * 10) / 10,
    fat: Math.round((nutrition.fat / mealCount) * 10) / 10,
  }
  
  const displayPrice = isTotal ? price : Math.round((price / mealCount) * 100) / 100
  
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-sm font-medium uppercase tracking-wider text-gray-300">
          {title}
        </h3>
      </div>
      
      <div className="mb-6">
        <div className="text-3xl font-light mb-2">
          {displayNutrition.kcal} <span className="text-lg text-gray-400">kcal</span>
        </div>
        <div className="text-xl font-medium text-green-400">
          {displayPrice} kr
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-700">
        <div>
          <div className="text-lg font-semibold">{displayNutrition.protein}g</div>
          <div className="text-xs text-gray-400 uppercase tracking-wide">Protein</div>
        </div>
        <div>
          <div className="text-lg font-semibold">{displayNutrition.carbs}g</div>
          <div className="text-xs text-gray-400 uppercase tracking-wide">Kolhydr.</div>
        </div>
        <div>
          <div className="text-lg font-semibold">{displayNutrition.fat}g</div>
          <div className="text-xs text-gray-400 uppercase tracking-wide">Fett</div>
        </div>
      </div>
    </div>
  )
}

function NutritionSummary({ totals, totalPrice, mealCount }) {
  const perMealLabel = mealCount > 7 ? 'matlåda' : 'dag'
  const perMealIcon = mealCount > 7 ? '🍱' : '📅'
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SummaryCard
        title="Hela veckohandlingen"
        icon="🛒"
        nutrition={totals}
        price={totalPrice}
        mealCount={mealCount}
        isTotal={true}
      />
      <SummaryCard
        title={`Per ${perMealLabel}`}
        icon={perMealIcon}
        nutrition={totals}
        price={totalPrice}
        mealCount={mealCount}
        isTotal={false}
      />
    </div>
  )
}

export default NutritionSummary