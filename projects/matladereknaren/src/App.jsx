import { useState, useCallback, useEffect } from 'react'
import Header from './components/Header'
import IngredientInput from './components/IngredientInput'
import IngredientList from './components/IngredientList'
import MealSettings from './components/MealSettings'
import NutritionSummary from './components/NutritionSummary'
import LiveSummaryBar from './components/LiveSummaryBar'
import BackLink from './components/BackLink'
import InspirationPage from './components/InspirationPage'
import { parseIngredient, lookupNutrition, calculateNutrition } from './utils/nutrition'

function App() {
  const [currentPage, setCurrentPage] = useState('calculator')
  const [currentCategory, setCurrentCategory] = useState('all')
  const [ingredients, setIngredients] = useState([])
  const [nutritionData, setNutritionData] = useState({})
  const [mealCount, setMealCount] = useState(7)
  
  // Helper to get numeric mealCount for calculations
  const numericMealCount = typeof mealCount === 'string' ? (parseInt(mealCount) || 1) : mealCount
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

  // Import meal plan function
  const importMealPlan = useCallback(async (mealPlan) => {
    // Clear existing ingredients
    setIngredients([])
    setNutritionData({})

    // Add all ingredients from meal plan
    for (const ingredient of mealPlan.ingredients) {
      const newIngredient = {
        ...ingredient,
        id: Date.now() + Math.random(), // Ensure unique IDs
        price: 0
      }

      setIngredients(prev => [...prev, newIngredient])

      // Fetch nutrition data
      try {
        const nutritionResponse = await lookupNutrition(ingredient.name)
        if (nutritionResponse.success) {
          const calculatedNutrition = calculateNutrition(newIngredient, nutritionResponse.data)
          setNutritionData(prev => ({
            ...prev,
            [newIngredient.id]: calculatedNutrition
          }))
        }
      } catch (error) {
        console.error('Failed to fetch nutrition data:', error)
      }
    }

    // Switch to calculator view
    setCurrentPage('calculator')
  }, [])

  // Track analytics
  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'page_view', {
        page_title: 'Matlåderäknaren React',
        page_location: window.location.href
      })
    }
  }, [])

  // Navigate to inspiration with category
  const navigateToInspiration = (category = 'all') => {
    setCurrentCategory(category)
    setCurrentPage('inspiration')
  }

  // Show inspiration page
  if (currentPage === 'inspiration') {
    return (
      <div className="min-h-screen bg-gray-50">
        <BackLink />
        <InspirationPage
          currentCategory={currentCategory}
          onCategoryChange={setCurrentCategory}
          onImportMealPlan={importMealPlan}
          onBackToCalculator={() => setCurrentPage('calculator')}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BackLink />
      <Header />
      <LiveSummaryBar
        totals={totals}
        totalPrice={totalPrice}
        ingredientCount={ingredients.length}
        mealCount={numericMealCount}
      />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Ingredient Input */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🛒</span>
              <h2 className="text-xl font-semibold text-gray-900">Lägg till ingredienser</h2>
            </div>
            <a
              href="inspiration/"
              className="px-4 py-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
            >
              <span className="text-lg">💡</span>
              Inspiration
            </a>
          </div>

          {/* Quick-start prompt for new users */}
          {ingredients.length === 0 && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-sm mb-2">
                <strong>Ny här?</strong> Börja enkelt med våra färdiga veckomenyer!
              </p>
              <a
                href="inspiration/"
                className="text-green-700 hover:text-green-800 text-sm font-medium underline"
              >
                Se färdiga exempel →
              </a>
            </div>
          )}

          <IngredientInput onAdd={addIngredient} loading={loading} />
        </div>

        {/* Main Content Grid */}
        <div className="space-y-8">
          {/* Results Dashboard - Show prominently when we have ingredients */}
          {ingredients.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-2xl">📊</span>
                Dina resultat
              </h2>
              <NutritionSummary 
                totals={totals}
                totalPrice={totalPrice}
                mealCount={numericMealCount}
              />
            </section>
          )}

          {/* Two-column layout for settings and ingredients */}
          {ingredients.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Settings Panel - Compact sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-48">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-xl">⚙️</span>
                    Inställningar
                  </h3>
                  <MealSettings mealCount={mealCount} onMealCountChange={setMealCount} />
                </div>
              </div>

              {/* Ingredients List - Main content */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <span className="text-xl">📝</span>
                    Din inköpslista
                  </h3>
                  <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {ingredients.length} {ingredients.length === 1 ? 'vara' : 'varor'}
                  </div>
                </div>
                <IngredientList 
                  ingredients={ingredients}
                  nutritionData={nutritionData}
                  onRemove={removeIngredient}
                  onUpdate={updateIngredient}
                />
              </div>
            </div>
          ) : (
            /* Empty state with help */
            <div className="text-center py-16">
              <div className="max-w-lg mx-auto">
                <div className="text-6xl mb-6">🛒</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Kom igång med din veckohandling
                </h3>
                <p className="text-gray-600 mb-8">
                  Lägg till livsmedel från din inköpslista så beräknar vi automatiskt näringsvärden och kostnader för dig.
                </p>
                
                {/* Example suggestions */}
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h4 className="text-lg font-semibold text-blue-900 mb-4">
                    💡 Exempel på vad du kan lägga till:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-blue-800">
                    <div className="text-left">
                      <div>• 2 kg kycklingfilé</div>
                      <div>• 1 kg jasminris</div>
                      <div>• 500 g broccoli</div>
                    </div>
                    <div className="text-left">
                      <div>• 2 dl olivolja</div>
                      <div>• 1 kg potatis</div>
                      <div>• 400 g pasta</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings for empty state */}
          {ingredients.length === 0 && (
            <section className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center flex items-center justify-center gap-2">
                <span className="text-xl">📊</span>
                Portionsinställningar
              </h3>
              <MealSettings mealCount={mealCount} onMealCountChange={setMealCount} />
            </section>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
