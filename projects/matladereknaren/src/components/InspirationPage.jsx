import { getMealPlansByCategory, getCategoryById, categories } from '../data/mealPlans'
import CategoryOverview from './CategoryOverview'

function InspirationPage({ currentCategory, onCategoryChange, onImportMealPlan, onBackToCalculator }) {
  // Show category overview if no specific category is selected
  if (!currentCategory || currentCategory === 'all') {
    return <CategoryOverview onSelectCategory={onCategoryChange} />
  }

  // Get current category data
  const category = getCategoryById(currentCategory)
  const recipes = getMealPlansByCategory(currentCategory)

  if (!category) {
    return <CategoryOverview onSelectCategory={onCategoryChange} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBackToCalculator}
                className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Tillbaka till kalkylatorn
              </button>
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-3xl">💡</span>
                {category.name}
              </h1>
              <p className="text-gray-600 mt-2">{category.description}</p>
            </div>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Breadcrumb navigation */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <button
              onClick={() => onCategoryChange('all')}
              className="hover:text-green-600 transition-colors"
            >
              Alla kategorier
            </button>
            <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium">{category.name}</span>
            <span className="ml-2 text-gray-500">({recipes.length} recept)</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Recipe grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((plan) => (
            <MealPlanCard
              key={plan.id}
              plan={plan}
              onImport={() => onImportMealPlan(plan)}
            />
          ))}
        </div>

        {/* Back to categories button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onCategoryChange('all')}
            className="inline-flex items-center px-6 py-3 bg-white border-2 border-green-200 text-green-700 font-medium rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Se alla kategorier
          </button>
        </div>
      </main>
    </div>
  )
}

function MealPlanCard({ plan, onImport }) {
  const getCategoryColor = (category) => {
    switch (category) {
      case 'budget':
        return 'bg-blue-500'
      case 'fitness':
        return 'bg-red-500'
      case 'family':
        return 'bg-yellow-500'
      case 'lchf':
        return 'bg-green-500'
      case 'vegetarian':
        return 'bg-emerald-500'
      case 'quick':
        return 'bg-purple-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getCategoryBg = (category) => {
    switch (category) {
      case 'budget':
        return 'bg-blue-50 border-blue-200'
      case 'fitness':
        return 'bg-red-50 border-red-200'
      case 'family':
        return 'bg-yellow-50 border-yellow-200'
      case 'lchf':
        return 'bg-green-50 border-green-200'
      case 'vegetarian':
        return 'bg-emerald-50 border-emerald-200'
      case 'quick':
        return 'bg-purple-50 border-purple-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm border-2 ${getCategoryBg(plan.category)} overflow-hidden hover:shadow-md transition-shadow`}>
      {/* Card header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
          <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${getCategoryColor(plan.category)}`}>
            {plan.category}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{plan.description}</p>

        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-gray-500">Kostnad:</span>
            <div className="font-medium text-gray-900">{plan.estimatedCost}</div>
          </div>
          <div>
            <span className="text-gray-500">Portioner:</span>
            <div className="font-medium text-gray-900">{plan.servings} st</div>
          </div>
          <div>
            <span className="text-gray-500">Svårighet:</span>
            <div className="font-medium text-gray-900">{plan.difficulty}</div>
          </div>
          <div>
            <span className="text-gray-500">Prep-tid:</span>
            <div className="font-medium text-gray-900">{plan.prepTime}</div>
          </div>
        </div>
      </div>

      {/* Ingredients preview */}
      <div className="px-6 pb-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Ingredienser ({plan.ingredients.length} st)</h4>
        <div className="text-xs text-gray-600 space-y-1 max-h-24 overflow-hidden">
          {plan.ingredients.slice(0, 4).map((ingredient, index) => (
            <div key={index} className="flex justify-between">
              <span>{ingredient.name}</span>
              <span className="text-gray-500">{ingredient.quantity} {ingredient.unit}</span>
            </div>
          ))}
          {plan.ingredients.length > 4 && (
            <div className="text-gray-500 italic">...och {plan.ingredients.length - 4} till</div>
          )}
        </div>
      </div>

      {/* Recipe instructions */}
      <div className="px-6 pb-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Tillagning</h4>
        <div className="text-xs text-gray-600 leading-relaxed">
          {plan.recipe.instructions}
        </div>
      </div>

      {/* Tags */}
      <div className="px-6 pb-4">
        <div className="flex flex-wrap gap-1">
          {plan.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action button */}
      <div className="px-6 pb-6">
        <button
          onClick={onImport}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <span className="text-lg">🍱</span>
          Använd i kalkylatorn
        </button>
      </div>
    </div>
  )
}

export default InspirationPage