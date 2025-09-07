import { useState, useCallback, useEffect } from 'react'
import Header from './components/Header'
import IngredientInput from './components/IngredientInput'
import IngredientList from './components/IngredientList'
import MealSettings from './components/MealSettings'
import NutritionSummary from './components/NutritionSummary'
import BackLink from './components/BackLink'
import { parseIngredient, lookupNutrition, calculateNutrition } from './utils/nutrition'

function App() {
  const [ingredients, setIngredients] = useState([])
  const [nutritionData, setNutritionData] = useState({})
  const [mealCount, setMealCount] = useState(7)
  const [loading, setLoading] = useState(false)

  // Add ingredient
  const addIngredient = useCallback(async (inputText) => {
    const parsed = parseIngredient(inputText)
    if (!parsed) return false

    const newIngredient = {
      ...parsed,
      id: Date.now(),
      price: 0
    }

    setIngredients(prev => [...prev, newIngredient])

    // Fetch nutrition data
    setLoading(true)
    try {
      const nutritionResponse = await lookupNutrition(parsed.name)
      if (nutritionResponse.success) {
        const calculatedNutrition = calculateNutrition(newIngredient, nutritionResponse.data)
        setNutritionData(prev => ({
          ...prev,
          [newIngredient.id]: calculatedNutrition
        }))
      }
    } catch (error) {
      console.error('Failed to fetch nutrition data:', error)
    } finally {
      setLoading(false)
    }
    
    return true
  }, [])

  // Remove ingredient
  const removeIngredient = useCallback((id) => {
    setIngredients(prev => prev.filter(ing => ing.id !== id))
    setNutritionData(prev => {
      const newData = { ...prev }
      delete newData[id]
      return newData
    })
  }, [])

  // Update ingredient
  const updateIngredient = useCallback(async (id, updates) => {
    setIngredients(prev => prev.map(ing => 
      ing.id === id ? { ...ing, ...updates } : ing
    ))
    
    // Recalculate nutrition if quantity or unit changed
    if (updates.quantity !== undefined || updates.unit !== undefined) {
      const ingredient = ingredients.find(ing => ing.id === id)
      if (ingredient && nutritionData[id]) {
        try {
          const nutritionResponse = await lookupNutrition(ingredient.name)
          if (nutritionResponse.success) {
            const updatedIngredient = { ...ingredient, ...updates }
            const calculatedNutrition = calculateNutrition(updatedIngredient, nutritionResponse.data)
            setNutritionData(prev => ({
              ...prev,
              [id]: calculatedNutrition
            }))
          }
        } catch (error) {
          console.error('Failed to recalculate nutrition:', error)
        }
      }
    }
  }, [ingredients, nutritionData])

  // Calculate totals
  const totals = Object.values(nutritionData).reduce(
    (acc, nutrition) => ({
      kcal: acc.kcal + nutrition.kcal,
      protein: acc.protein + nutrition.protein,
      carbs: acc.carbs + nutrition.carbs,
      fat: acc.fat + nutrition.fat
    }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  )

  const totalPrice = ingredients.reduce((acc, ing) => acc + (ing.price || 0), 0)

  // Track analytics
  useEffect(() => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view', {
        page_title: 'Matlåderäknaren React',
        page_location: window.location.href
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <BackLink />
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Ingredient Input */}
        <section className="space-y-6">
          <h2 className="section-title flex items-center gap-3">
            <span className="text-2xl">🛒</span>
            Din veckohandling
          </h2>
          <IngredientInput onAdd={addIngredient} loading={loading} />
        </section>

        {/* Meal Settings */}
        <section className="space-y-6">
          <h2 className="section-title flex items-center gap-3">
            <span className="text-2xl">📊</span>
            Fördelning
          </h2>
          <MealSettings mealCount={mealCount} onMealCountChange={setMealCount} />
        </section>

        {/* Ingredients List */}
        {ingredients.length > 0 && (
          <section className="space-y-6">
            <h2 className="section-title flex items-center gap-3">
              <span className="text-2xl">📝</span>
              Din inköpslista ({ingredients.length} varor)
            </h2>
            <IngredientList 
              ingredients={ingredients}
              nutritionData={nutritionData}
              onRemove={removeIngredient}
              onUpdate={updateIngredient}
            />
          </section>
        )}

        {/* Summary */}
        {ingredients.length > 0 && (
          <section className="space-y-6">
            <h2 className="section-title flex items-center gap-3">
              <span className="text-2xl">📊</span>
              Sammanfattning
            </h2>
            <NutritionSummary 
              totals={totals}
              totalPrice={totalPrice}
              mealCount={mealCount}
            />
          </section>
        )}

        {/* Help Section */}
        <section className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            💡 Så här använder du Matlåderäknaren
          </h3>
          <ul className="space-y-2 text-blue-800">
            <li>• Lägg till alla livsmedel från din veckohandling (t.ex. "2 kg kyckling", "1 kg pasta")</li>
            <li>• Justera mängder och lägg till priser för bättre översikt</li>
            <li>• Välj hur många dagar eller matlådor du vill fördela maten på</li>
            <li>• Se totala näringsvärden för hela inköpet och per portion</li>
            <li>• Perfect för meal prep-planering och näringsberäkningar</li>
          </ul>
        </section>
      </main>
    </div>
  )
}

export default App
