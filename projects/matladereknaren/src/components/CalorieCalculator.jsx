import { useState } from 'react'
import {
  calculateBMR,
  calculateTDEE,
  calculateGoalCalories,
  calculateWeeklyTarget,
  calculateMacros,
  getGoalRecommendation,
  activityLevels,
  goalTypes
} from '../utils/calorieCalculations'

export default function CalorieCalculator({ onBackToCalculator, onNavigateToGoalRecipes }) {
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: 'male',
    activityLevel: 'moderately_active',
    goal: 'maintenance'
  })

  const [results, setResults] = useState(null)
  const [showResults, setShowResults] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const calculateResults = () => {
    const { weight, height, age, gender, activityLevel, goal } = formData

    // Validate inputs
    if (!weight || !height || !age) {
      alert('Vänligen fyll i alla fält')
      return
    }

    // Calculate BMR, TDEE, and goal calories
    const bmr = calculateBMR(
      parseFloat(weight),
      parseFloat(height),
      parseInt(age),
      gender
    )

    const tdee = calculateTDEE(bmr, activityLevel)
    const goalCalories = calculateGoalCalories(tdee, goal)
    const weeklyCalories = calculateWeeklyTarget(goalCalories)
    const macros = calculateMacros(goalCalories, goal)
    const recommendation = getGoalRecommendation(goal, weeklyCalories)

    setResults({
      bmr: Math.round(bmr),
      tdee,
      dailyCalories: goalCalories,
      weeklyCalories,
      macros,
      recommendation,
      goal: goalTypes[goal]
    })

    setShowResults(true)
  }

  const resetCalculator = () => {
    setShowResults(false)
    setResults(null)
  }

  if (showResults && results) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🎯 Dina kaloriemål
            </h1>
            <p className="text-gray-600">
              Personliga rekommendationer baserat på dina mål
            </p>
          </div>

          {/* Results Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Main Calorie Target */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ditt veckomål
                </h3>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {results.weeklyCalories.toLocaleString()} kcal
                </div>
                <div className="text-gray-600 mb-4">
                  ~{results.dailyCalories} kcal per dag
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <span className="text-green-800 font-medium">
                    {results.goal.label}
                  </span>
                  <div className="text-green-700 text-sm mt-1">
                    {results.goal.description}
                  </div>
                </div>
              </div>
            </div>

            {/* Macro Breakdown */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">🥗</div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Makronäringsämnen
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Protein</span>
                  <div className="text-right">
                    <div className="font-semibold">{results.macros.protein}g</div>
                    <div className="text-sm text-gray-500">{results.macros.proteinPercentage}%</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Kolhydrater</span>
                  <div className="text-right">
                    <div className="font-semibold">{results.macros.carbs}g</div>
                    <div className="text-sm text-gray-500">{results.macros.carbPercentage}%</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Fett</span>
                  <div className="text-right">
                    <div className="font-semibold">{results.macros.fat}g</div>
                    <div className="text-sm text-gray-500">{results.macros.fatPercentage}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              {results.recommendation.title}
            </h3>
            <p className="text-gray-700 mb-4">
              {results.recommendation.description}
            </p>
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Tips för att nå ditt mål:</h4>
              <ul className="space-y-1 text-blue-800">
                {results.recommendation.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetCalculator}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              🔄 Räkna om
            </button>
            {(formData.goal === 'deficit' || formData.goal === 'surplus') && (
              <button
                onClick={() => {
                  const goalKey = formData.goal === 'deficit' ? 'kaloriunderskott' : 'kaloriöverskott'
                  onNavigateToGoalRecipes(goalKey)
                }}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                🍱 Se recept för ditt mål
              </button>
            )}
            {formData.goal === 'maintenance' && (
              <button
                onClick={() => onBackToCalculator()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                💡 Bläddra bland alla recept
              </button>
            )}
          </div>

          {/* Detailed Breakdown */}
          <div className="mt-8 bg-gray-100 rounded-xl p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Beräkningsdetaljer:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="bg-white rounded-lg p-3">
                <div className="font-medium text-gray-700">BMR (Basalomsättning)</div>
                <div className="text-2xl font-bold text-gray-900">{results.bmr}</div>
                <div className="text-gray-500 text-xs">kcal vid vila</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="font-medium text-gray-700">TDEE (Total förbrukning)</div>
                <div className="text-2xl font-bold text-gray-900">{results.tdee}</div>
                <div className="text-gray-500 text-xs">kcal med aktivitet</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="font-medium text-gray-700">Måljusterat</div>
                <div className="text-2xl font-bold text-gray-900">{results.dailyCalories}</div>
                <div className="text-gray-500 text-xs">kcal för ditt mål</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🎯 Kaloriräknare
          </h1>
          <p className="text-gray-600">
            Beräkna dina personliga kaloriemål baserat på din kropp och dina mål
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vikt (kg)
                </label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="t.ex. 70"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Längd (cm)
                </label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="t.ex. 175"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ålder
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="t.ex. 30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kön
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="male">Man</option>
                  <option value="female">Kvinna</option>
                </select>
              </div>
            </div>

            {/* Activity Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aktivitetsnivå
              </label>
              <select
                value={formData.activityLevel}
                onChange={(e) => handleInputChange('activityLevel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {Object.entries(activityLevels).map(([key, level]) => (
                  <option key={key} value={key}>
                    {level.label} - {level.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Goal */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ditt mål
              </label>
              <select
                value={formData.goal}
                onChange={(e) => handleInputChange('goal', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {Object.entries(goalTypes).map(([key, goal]) => (
                  <option key={key} value={key}>
                    {goal.label} - {goal.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculateResults}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium text-lg"
            >
              🧮 Beräkna mina kaloriemål
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Om beräkningen:</h4>
          <p className="text-blue-800 text-sm">
            Vi använder Mifflin-St Jeor ekvationen för att beräkna din basalomsättning (BMR),
            som sedan justeras för din aktivitetsnivå och dina mål. Resultatet ger dig
            veckomål som är flexibla för meal prep-planering.
          </p>
        </div>
      </div>
    </div>
  )
}