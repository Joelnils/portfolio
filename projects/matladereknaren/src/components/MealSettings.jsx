function MealSettings({ mealCount, onMealCountChange }) {
  return (
    <div className="card">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Över hur många matlådor/dagar vill du fördela näringsvärdena?
      </label>
      
      <div className="flex items-center gap-4">
        <input
          type="number"
          min="1"
          max="30"
          value={mealCount}
          onChange={(e) => onMealCountChange(parseInt(e.target.value) || 1)}
          className="input-field max-w-24"
        />
        
        <div className="flex-1">
          <p className="text-sm text-gray-600">
            Vanligt är 7 dagar (en vecka) eller 14 matlådor (lunch + middag)
          </p>
        </div>
      </div>
      
      {/* Quick preset buttons */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onMealCountChange(7)}
          className={`btn-secondary text-sm ${mealCount === 7 ? 'bg-green-100 text-green-700 border-green-300' : ''}`}
        >
          7 dagar
        </button>
        <button
          onClick={() => onMealCountChange(14)}
          className={`btn-secondary text-sm ${mealCount === 14 ? 'bg-green-100 text-green-700 border-green-300' : ''}`}
        >
          14 matlådor
        </button>
        <button
          onClick={() => onMealCountChange(21)}
          className={`btn-secondary text-sm ${mealCount === 21 ? 'bg-green-100 text-green-700 border-green-300' : ''}`}
        >
          3 veckor
        </button>
      </div>
    </div>
  )
}

export default MealSettings