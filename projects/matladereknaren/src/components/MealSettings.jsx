function MealSettings({ mealCount, onMealCountChange }) {
  const getPortionType = (count) => {
    if (count <= 7) return 'dagar'
    if (count <= 14) return 'matlådor' 
    return count <= 21 ? 'dagar' : 'portioner'
  }

  const currentType = getPortionType(mealCount)
  const typeIcon = currentType === 'dagar' ? '📅' : '🍱'

  return (
    <div className="card">
      <label className="block text-lg font-semibold text-gray-800 mb-4">
        📊 Fördela näringsvärdena över:
      </label>
      
      {/* Current selection display */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-center gap-3">
          <span className="text-3xl font-bold text-green-700">{mealCount}</span>
          <div className="text-center">
            <div className="text-xl">{typeIcon}</div>
            <div className="text-sm font-medium text-green-700">{currentType}</div>
          </div>
        </div>
        <p className="text-center text-sm text-green-600 mt-2">
          = {Math.round(100/mealCount)}% av totalen per {currentType.slice(0, -1)}
        </p>
      </div>

      {/* Manual input */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <label className="text-sm font-medium text-gray-600">Anpassat antal:</label>
        <input
          type="number"
          min="1"
          max="30"
          value={mealCount}
          onChange={(e) => onMealCountChange(parseInt(e.target.value) || 1)}
          className="input-field max-w-20 text-center"
        />
      </div>
      
      {/* Quick preset buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onMealCountChange(7)}
          className={`btn-secondary text-sm p-3 ${mealCount === 7 ? 'bg-green-100 text-green-700 border-green-300' : ''}`}
        >
          <div className="font-semibold">📅 7 dagar</div>
          <div className="text-xs text-gray-500">En vecka</div>
        </button>
        <button
          onClick={() => onMealCountChange(14)}
          className={`btn-secondary text-sm p-3 ${mealCount === 14 ? 'bg-green-100 text-green-700 border-green-300' : ''}`}
        >
          <div className="font-semibold">🍱 14 matlådor</div>
          <div className="text-xs text-gray-500">Lunch + middag</div>
        </button>
        <button
          onClick={() => onMealCountChange(21)}
          className={`btn-secondary text-sm p-3 ${mealCount === 21 ? 'bg-green-100 text-green-700 border-green-300' : ''}`}
        >
          <div className="font-semibold">📅 21 dagar</div>
          <div className="text-xs text-gray-500">3 veckor</div>
        </button>
        <button
          onClick={() => onMealCountChange(10)}
          className={`btn-secondary text-sm p-3 ${mealCount === 10 ? 'bg-green-100 text-green-700 border-green-300' : ''}`}
        >
          <div className="font-semibold">🍱 10 matlådor</div>
          <div className="text-xs text-gray-500">5 dagars lunch</div>
        </button>
      </div>
    </div>
  )
}

export default MealSettings