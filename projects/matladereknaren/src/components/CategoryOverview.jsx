import { categories, getMealPlansByCategory } from '../data/mealPlans'

function CategoryOverview({ onSelectCategory }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <span className="text-4xl">💡</span>
              Receptinspiration
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Välj den typ av mat som passar dig bäst
            </p>
          </div>
        </div>
      </div>

      {/* Category grid */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.filter(cat => cat.id !== 'all').map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              recipeCount={getMealPlansByCategory(category.id).length}
              onSelect={() => onSelectCategory(category.id)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

function CategoryCard({ category, recipeCount, onSelect }) {
  const getCategoryIcon = (categoryId) => {
    switch (categoryId) {
      case 'budget':
        return '💰'
      case 'fitness':
        return '💪'
      case 'family':
        return '👨‍👩‍👧‍👦'
      case 'lchf':
        return '🥑'
      case 'vegetarian':
        return '🌱'
      case 'quick':
        return '⚡'
      default:
        return '🍽️'
    }
  }

  const getCategoryColor = (categoryId) => {
    switch (categoryId) {
      case 'budget':
        return 'from-blue-500 to-blue-600'
      case 'fitness':
        return 'from-red-500 to-red-600'
      case 'family':
        return 'from-yellow-500 to-yellow-600'
      case 'lchf':
        return 'from-green-500 to-green-600'
      case 'vegetarian':
        return 'from-emerald-500 to-emerald-600'
      case 'quick':
        return 'from-purple-500 to-purple-600'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
      onClick={onSelect}
    >
      {/* Header gradient */}
      <div className={`h-24 bg-gradient-to-r ${getCategoryColor(category.id)} flex items-center justify-center`}>
        <span className="text-4xl">{getCategoryIcon(category.id)}</span>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
            {category.name}
          </h3>
          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
            {recipeCount} recept
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {category.description}
        </p>

        <div className="flex items-center text-green-600 text-sm font-medium group-hover:text-green-700 transition-colors">
          <span>Se recept</span>
          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default CategoryOverview