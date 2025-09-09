function IngredientItem({ ingredient, nutrition, onRemove, onUpdate }) {
  const handleQuantityChange = (e) => {
    const value = e.target.value
    // Allow empty field during editing
    if (value === '') {
      onUpdate(ingredient.id, { quantity: '' })
      return
    }
    // Parse to number but allow string during editing
    const newQuantity = parseFloat(value)
    if (!isNaN(newQuantity)) {
      onUpdate(ingredient.id, { quantity: value })
    }
  }
  
  const handleQuantityBlur = (e) => {
    const value = e.target.value
    const numValue = parseFloat(value)
    // Ensure valid number on blur
    if (value === '' || isNaN(numValue) || numValue < 0) {
      onUpdate(ingredient.id, { quantity: 0 })
    }
  }
  
  const handleUnitChange = (e) => {
    onUpdate(ingredient.id, { unit: e.target.value })
  }
  
  const handlePriceChange = (e) => {
    const value = e.target.value
    // Allow empty field during editing
    if (value === '') {
      onUpdate(ingredient.id, { price: '' })
      return
    }
    // Parse to number but allow string during editing
    const newPrice = parseFloat(value)
    if (!isNaN(newPrice)) {
      onUpdate(ingredient.id, { price: value })
    }
  }
  
  const handlePriceBlur = (e) => {
    const value = e.target.value
    const numValue = parseFloat(value)
    // Ensure valid number on blur
    if (value === '' || isNaN(numValue) || numValue < 0) {
      onUpdate(ingredient.id, { price: 0 })
    }
  }
  
  return (
    <div className="card hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          {ingredient.name}
        </h3>
        <button
          onClick={() => onRemove(ingredient.id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
          title="Ta bort ingrediens"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Input fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Mängd</label>
          <input
            type="text"
            inputMode="decimal"
            pattern="[0-9]*\.?[0-9]*"
            value={ingredient.quantity}
            onChange={handleQuantityChange}
            onBlur={handleQuantityBlur}
            onKeyDown={(e) => {
              // Handle backspace/delete when field contains only '0'
              if ((e.key === 'Backspace' || e.key === 'Delete') && e.target.value === '0') {
                e.preventDefault();
                onUpdate(ingredient.id, { quantity: '' });
              }
            }}
            className="input-field"
            placeholder="1"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Enhet</label>
          <select
            value={ingredient.unit}
            onChange={handleUnitChange}
            className="input-field"
          >
            <option value="g">gram (g)</option>
            <option value="kg">kilogram (kg)</option>
            <option value="ml">milliliter (ml)</option>
            <option value="dl">deciliter (dl)</option>
            <option value="l">liter (l)</option>
            <option value="msk">matsked (msk)</option>
            <option value="tsk">tesked (tsk)</option>
            <option value="st">styck (st)</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pris (kr)</label>
          <input
            type="text"
            inputMode="decimal"
            pattern="[0-9]*\.?[0-9]*"
            value={ingredient.price || ''}
            onChange={handlePriceChange}
            onBlur={handlePriceBlur}
            onKeyDown={(e) => {
              // Handle backspace/delete when field contains only '0'
              if ((e.key === 'Backspace' || e.key === 'Delete') && e.target.value === '0') {
                e.preventDefault();
                onUpdate(ingredient.id, { price: '' });
              }
            }}
            className="input-field"
            placeholder="0.00"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <div className="flex items-center h-12 px-4">
            {nutrition ? (
              <span className="inline-flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-medium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Näringsdata hämtad
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full text-sm font-medium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Ingen data hittad
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Nutrition display */}
      {nutrition && (
        <div className="bg-gray-50 rounded-lg p-4 border">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-gray-900">{nutrition.kcal}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">kcal</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900">{nutrition.protein}g</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">protein</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900">{nutrition.carbs}g</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">kolhydr.</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900">{nutrition.fat}g</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">fett</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default IngredientItem