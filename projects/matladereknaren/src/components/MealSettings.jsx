function MealSettings({ mealCount, onMealCountChange }) {
  return (
    <div className="card">
      <label className="block text-lg font-semibold text-gray-800 mb-4">
        📊 Hur många portioner ska maten räcka till?
      </label>
      
      {/* Simple input with clear label */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <input
          type="number"
          min="1"
          max="30"
          value={mealCount}
          onChange={(e) => onMealCountChange(parseInt(e.target.value) || 1)}
          className="input-field max-w-24 text-center text-2xl font-bold"
        />
        <span className="text-lg text-gray-600">portioner</span>
      </div>
      
      <p className="text-center text-sm text-gray-600 mb-6">
        Alla näringsvärden och priser delas på {mealCount} portioner
      </p>
      
      {/* Quick preset buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onMealCountChange(7)}
          className={`btn-secondary text-sm p-3 ${mealCount === 7 ? 'bg-green-100 text-green-700 border-green-300' : ''}`}
        >
          <div className="font-semibold">📅 7 portioner</div>
          <div className="text-xs text-gray-500">En vecka</div>
        </button>
        <button
          onClick={() => onMealCountChange(14)}
          className={`btn-secondary text-sm p-3 ${mealCount === 14 ? 'bg-green-100 text-green-700 border-green-300' : ''}`}
        >
          <div className="font-semibold">🍱 14 portioner</div>
          <div className="text-xs text-gray-500">Lunch + middag</div>
        </button>
        <button
          onClick={() => onMealCountChange(21)}
          className={`btn-secondary text-sm p-3 ${mealCount === 21 ? 'bg-green-100 text-green-700 border-green-300' : ''}`}
        >
          <div className="font-semibold">📅 21 portioner</div>
          <div className="text-xs text-gray-500">3 veckor</div>
        </button>
        <button
          onClick={() => onMealCountChange(10)}
          className={`btn-secondary text-sm p-3 ${mealCount === 10 ? 'bg-green-100 text-green-700 border-green-300' : ''}`}
        >
          <div className="font-semibold">🍱 10 portioner</div>
          <div className="text-xs text-gray-500">5 dagars lunch</div>
        </button>
      </div>
    </div>
  )
}

export default MealSettings