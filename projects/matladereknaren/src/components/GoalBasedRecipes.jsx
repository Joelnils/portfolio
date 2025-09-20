import { useState } from 'react'
import { getMealPlanByGoal } from '../data/goalBasedMealPlans'

export default function GoalBasedRecipes({ goal, onImportMealPlan, onBackToCalculator }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  const mealPlan = getMealPlanByGoal(goal)

  if (!mealPlan) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Mål inte hittat
          </h1>
          <button
            onClick={() => onBackToCalculator()}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Tillbaka till kalkylatorn
          </button>
        </div>
      </div>
    )
  }

  const handleImportRecipe = (recipe) => {
    onImportMealPlan(recipe)
  }

  const handleImportBothRecipes = () => {
    // Import both recipes by combining their ingredients
    const combinedRecipe = {
      id: `${goal}-combined-plan`,
      name: `${mealPlan.name} - Komplett 5-dagarsplan`,
      description: `Två receptvariationer för 5 dagar (${mealPlan.totalPortions} portioner totalt)`,
      servings: mealPlan.totalPortions,
      ingredients: []
    }

    // Combine ingredients from both recipes
    mealPlan.recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        const existingIngredient = combinedRecipe.ingredients.find(
          item => item.name === ingredient.name && item.unit === ingredient.unit
        )

        if (existingIngredient) {
          existingIngredient.quantity += ingredient.quantity
        } else {
          combinedRecipe.ingredients.push({ ...ingredient })
        }
      })
    })

    onImportMealPlan(combinedRecipe)
  }

  if (selectedRecipe) {
    const recipe = selectedRecipe
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Back button */}
          <button
            onClick={() => setSelectedRecipe(null)}
            className="mb-6 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            ← Tillbaka till receptöversikt
          </button>

          {/* Recipe Detail */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                  {recipe.category}
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                  {recipe.servings} portioner
                </span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                  {recipe.caloriesPerPortion} kcal/portion
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{recipe.name}</h1>
              <p className="text-gray-600 mb-4">{recipe.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">{recipe.difficulty}</div>
                  <div className="text-sm text-gray-600">Svårighetsgrad</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">{recipe.prepTime}</div>
                  <div className="text-sm text-gray-600">Tillagningstid</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">{recipe.estimatedCost}</div>
                  <div className="text-sm text-gray-600">Uppskattad kostnad</div>
                </div>
              </div>

              {/* Macros per portion */}
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-blue-900 mb-2">Näring per portion:</h3>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-blue-800">{recipe.caloriesPerPortion}</div>
                    <div className="text-xs text-blue-600">kcal</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-800">{recipe.macrosPerPortion.protein}g</div>
                    <div className="text-xs text-blue-600">protein</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-800">{recipe.macrosPerPortion.carbs}g</div>
                    <div className="text-xs text-blue-600">kolhydrater</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-800">{recipe.macrosPerPortion.fat}g</div>
                    <div className="text-xs text-blue-600">fett</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                🛒 Ingredienser ({recipe.servings} portioner)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="font-medium">{ingredient.name}</span>
                    <span className="text-gray-600">{ingredient.quantity} {ingredient.unit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                👨‍🍳 Tillagningstips
              </h3>
              <div className="space-y-2">
                {recipe.recipe.instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{instruction}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nutrition Tips */}
            {recipe.nutritionTips && (
              <div className="mb-6 bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">💡 Näringtips:</h4>
                <p className="text-green-800 text-sm">{recipe.nutritionTips}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleImportRecipe(recipe)}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                🍱 Använd detta recept i kalkylatorn
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {mealPlan.name}
          </h1>
          <p className="text-gray-600 mb-4">
            {mealPlan.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              📊 {mealPlan.target}
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
              📅 {mealPlan.daysPlanned} dagar
            </div>
            <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
              🍱 {mealPlan.totalPortions} portioner totalt
            </div>
          </div>
        </div>

        {/* Plan Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📋 5-dagars meal prep plan
          </h3>
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <p className="text-blue-800">
              <strong>Så här fungerar det:</strong> Varje recept ger 5 portioner.
              Laga båda recepten så får du 10 portioner totalt - perfekt för 5 arbetsdagar
              med 2 portioner per dag (en av varje recept för variation).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mealPlan.recipes.map((recipe, index) => (
              <div key={recipe.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{recipe.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{recipe.description}</p>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    Recept {index + 1}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-3 text-center text-xs mb-3">
                  <div>
                    <div className="font-bold text-gray-900">{recipe.caloriesPerPortion}</div>
                    <div className="text-gray-600">kcal</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{recipe.macrosPerPortion.protein}g</div>
                    <div className="text-gray-600">protein</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{recipe.macrosPerPortion.carbs}g</div>
                    <div className="text-gray-600">kolhydrater</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{recipe.macrosPerPortion.fat}g</div>
                    <div className="text-gray-600">fett</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedRecipe(recipe)}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    Se fullständigt recept
                  </button>
                  <button
                    onClick={() => handleImportRecipe(recipe)}
                    className="px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                  >
                    🍱 Använd
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onBackToCalculator()}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            ← Tillbaka till kalkylatorn
          </button>
          <button
            onClick={handleImportBothRecipes}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            🛒 Importera komplett inköpslista (båda recepten)
          </button>
        </div>
      </div>
    </div>
  )
}