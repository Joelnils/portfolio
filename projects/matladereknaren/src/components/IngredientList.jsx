import IngredientItem from './IngredientItem'

function IngredientList({ ingredients, nutritionData, onRemove, onUpdate }) {
  if (ingredients.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      {ingredients.map((ingredient, index) => (
        <div 
          key={ingredient.id} 
          className="opacity-0 animate-fadeIn"
          style={{ 
            animationDelay: `${index * 100}ms`,
            animationFillMode: 'forwards'
          }}
        >
          <IngredientItem
            ingredient={ingredient}
            nutrition={nutritionData[ingredient.id]}
            onRemove={onRemove}
            onUpdate={onUpdate}
          />
        </div>
      ))}
    </div>
  )
}

export default IngredientList