import { useState } from 'react'
import IngredientItem from './IngredientItem'
import CollapsibleSection from './CollapsibleSection'

function IngredientList({ ingredients, nutritionData, onRemove, onUpdate }) {
  const [selectedItems, setSelectedItems] = useState(new Set())
  const [showCompact, setShowCompact] = useState(false)

  if (ingredients.length === 0) {
    return null
  }

  // Group ingredients by nutrition status
  const withNutrition = ingredients.filter(ing => nutritionData[ing.id])
  const withoutNutrition = ingredients.filter(ing => !nutritionData[ing.id])

  const toggleSelection = (id) => {
    const newSelection = new Set(selectedItems)
    if (newSelection.has(id)) {
      newSelection.delete(id)
    } else {
      newSelection.add(id)
    }
    setSelectedItems(newSelection)
  }

  const selectAll = () => {
    setSelectedItems(new Set(ingredients.map(ing => ing.id)))
  }

  const clearSelection = () => {
    setSelectedItems(new Set())
  }

  const removeSelected = () => {
    selectedItems.forEach(id => onRemove(id))
    setSelectedItems(new Set())
  }

  const hasSelection = selectedItems.size > 0

  return (
    <div className="space-y-6">
      {/* Bulk Actions Bar */}
      {ingredients.length > 1 && (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Massåtgärder:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={selectAll}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Välj alla
                </button>
                {hasSelection && (
                  <button
                    onClick={clearSelection}
                    className="text-sm text-gray-600 hover:text-gray-700"
                  >
                    Rensa
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {hasSelection && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {selectedItems.size} valda
                  </span>
                  <button
                    onClick={removeSelected}
                    className="text-sm text-red-600 hover:text-red-700 font-medium px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
                  >
                    Ta bort valda
                  </button>
                </div>
              )}
              
              <button
                onClick={() => setShowCompact(!showCompact)}
                className="text-sm text-gray-600 hover:text-gray-700 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                {showCompact ? 'Detaljerad' : 'Kompakt'} vy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ingredients with nutrition data */}
      {withNutrition.length > 0 && (
        <CollapsibleSection
          title="Ingredienser med näringsdata"
          icon="✅"
          itemCount={withNutrition.length}
          defaultOpen={true}
        >
          <div className={`space-y-${showCompact ? '2' : '4'}`}>
            {withNutrition.map((ingredient, index) => (
              <div 
                key={ingredient.id} 
                className={`opacity-0 animate-fadeIn ${
                  selectedItems.has(ingredient.id) ? 'ring-2 ring-blue-500 rounded-lg' : ''
                }`}
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <div className="relative">
                  {ingredients.length > 1 && (
                    <div className="absolute top-4 left-4 z-10">
                      <input
                        type="checkbox"
                        checked={selectedItems.has(ingredient.id)}
                        onChange={() => toggleSelection(ingredient.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                  )}
                  <div className={ingredients.length > 1 ? 'pl-10' : ''}>
                    <IngredientItem
                      ingredient={ingredient}
                      nutrition={nutritionData[ingredient.id]}
                      onRemove={onRemove}
                      onUpdate={onUpdate}
                      compact={showCompact}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Ingredients without nutrition data */}
      {withoutNutrition.length > 0 && (
        <CollapsibleSection
          title="Ingredienser utan näringsdata"
          icon="⚠️"
          itemCount={withoutNutrition.length}
          defaultOpen={withNutrition.length === 0}
        >
          <div className={`space-y-${showCompact ? '2' : '4'}`}>
            {withoutNutrition.map((ingredient, index) => (
              <div 
                key={ingredient.id} 
                className={`opacity-0 animate-fadeIn ${
                  selectedItems.has(ingredient.id) ? 'ring-2 ring-blue-500 rounded-lg' : ''
                }`}
                style={{ 
                  animationDelay: `${(withNutrition.length + index) * 50}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <div className="relative">
                  {ingredients.length > 1 && (
                    <div className="absolute top-4 left-4 z-10">
                      <input
                        type="checkbox"
                        checked={selectedItems.has(ingredient.id)}
                        onChange={() => toggleSelection(ingredient.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                  )}
                  <div className={ingredients.length > 1 ? 'pl-10' : ''}>
                    <IngredientItem
                      ingredient={ingredient}
                      nutrition={nutritionData[ingredient.id]}
                      onRemove={onRemove}
                      onUpdate={onUpdate}
                      compact={showCompact}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}
    </div>
  )
}

export default IngredientList