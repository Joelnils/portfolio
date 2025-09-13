function NutritionBar({ label, value, color, percentage = 0 }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-semibold text-gray-900">{value}g</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  )
}

function SummaryCard({ title, icon, nutrition, price, mealCount, isTotal = false }) {
  const displayNutrition = isTotal ? nutrition : {
    kcal: Math.round(nutrition.kcal / mealCount),
    protein: Math.round((nutrition.protein / mealCount) * 10) / 10,
    carbs: Math.round((nutrition.carbs / mealCount) * 10) / 10,
    fat: Math.round((nutrition.fat / mealCount) * 10) / 10,
  }
  
  const displayPrice = isTotal ? price : Math.round((price / mealCount) * 100) / 100
  
  // Calculate percentages for visual bars (based on rough daily values)
  const dailyValues = {
    protein: 50, // 50g daily protein goal
    carbs: 300,  // 300g daily carbs goal  
    fat: 70      // 70g daily fat goal
  }
  
  const percentages = isTotal ? {
    protein: 0, carbs: 0, fat: 0  // No bars for total
  } : {
    protein: (displayNutrition.protein / dailyValues.protein) * 100,
    carbs: (displayNutrition.carbs / dailyValues.carbs) * 100,
    fat: (displayNutrition.fat / dailyValues.fat) * 100
  }
  
  return (
    <div className="card border-2 hover:border-green-200 hover:shadow-lg transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
            <span className="text-xl">{icon}</span>
          </div>
          <h3 className="font-semibold text-gray-900">
            {title}
          </h3>
        </div>
        {!isTotal && (
          <div className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
            per portion
          </div>
        )}
      </div>
      
      {/* Main metrics */}
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {displayNutrition.kcal}
            <span className="text-lg font-normal text-gray-500 ml-1">kcal</span>
          </div>
          <div className="text-lg font-semibold text-green-600">
            {displayPrice} kr
          </div>
        </div>
        
        {/* Quick nutrition overview */}
        <div className="text-right">
          <div className="text-sm text-gray-600 space-y-1">
            <div>{displayNutrition.protein}g protein</div>
            <div>{displayNutrition.carbs}g kolhydrater</div>
            <div>{displayNutrition.fat}g fett</div>
          </div>
        </div>
      </div>
      
      {/* Nutrition bars (only for per-portion) */}
      {!isTotal && (
        <div className="space-y-3 pt-4 border-t border-gray-100">
          <NutritionBar 
            label="Protein" 
            value={displayNutrition.protein} 
            color="bg-blue-500" 
            percentage={percentages.protein}
          />
          <NutritionBar 
            label="Kolhydrater" 
            value={displayNutrition.carbs} 
            color="bg-orange-500" 
            percentage={percentages.carbs}
          />
          <NutritionBar 
            label="Fett" 
            value={displayNutrition.fat} 
            color="bg-purple-500" 
            percentage={percentages.fat}
          />
        </div>
      )}
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