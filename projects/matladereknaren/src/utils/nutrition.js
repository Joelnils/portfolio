// Ingredient parser utility
export const parseIngredient = (text) => {
  if (!text || text.trim() === '') return null
  
  // Regex to match patterns like "1 kg kycklingfilé", "500 g ris", "2 dl grädde"
  const regex = /^(\d+(?:[.,]\d+)?)\s*(kg|g|l|dl|cl|ml|st|styck|msk|tsk|krm)?\s+(.+)$/i
  const match = text.trim().match(regex)
  
  if (!match) {
    return {
      quantity: 1,
      unit: 'st',
      name: text.trim(),
      originalText: text
    }
  }
  
  const [, quantity, unit, name] = match
  
  return {
    quantity: parseFloat(quantity.replace(',', '.')),
    unit: unit ? unit.toLowerCase() : 'st',
    name: name.trim(),
    originalText: text
  }
}

// Convert units to grams for consistent calculation
export const convertToGrams = (quantity, unit) => {
  const conversions = {
    'kg': 1000,
    'g': 1,
    'l': 1000, // assuming 1ml = 1g for liquids
    'dl': 100,
    'cl': 10,
    'ml': 1,
    'msk': 15, // tablespoon ≈ 15ml
    'tsk': 5,  // teaspoon ≈ 5ml
    'krm': 1,  // pinch ≈ 1ml
    'st': 100, // default assumption for pieces
    'styck': 100
  }
  
  return quantity * (conversions[unit] || 1)
}

// Calculate nutrition for ingredient
export const calculateNutrition = (ingredient, nutritionData) => {
  if (!nutritionData) {
    return {
      kcal: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    }
  }
  
  const gramsAmount = convertToGrams(ingredient.quantity, ingredient.unit)
  const factor = gramsAmount / 100 // nutrition data is per 100g
  
  return {
    kcal: Math.round(nutritionData.kcal * factor),
    protein: Math.round(nutritionData.protein * factor * 10) / 10,
    carbs: Math.round(nutritionData.carbs * factor * 10) / 10,
    fat: Math.round(nutritionData.fat * factor * 10) / 10
  }
}

// Mock nutrition data for development
const mockNutritionData = {
  'kycklingfilé': {
    kcal: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    per100g: true
  },
  'kyckling': {
    kcal: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    per100g: true
  },
  'ris': {
    kcal: 130,
    protein: 2.7,
    carbs: 28,
    fat: 0.3,
    per100g: true
  },
  'grädde': {
    kcal: 300,
    protein: 2.1,
    carbs: 3.4,
    fat: 30,
    per100g: true
  },
  'pasta': {
    kcal: 131,
    protein: 5,
    carbs: 25,
    fat: 1.1,
    per100g: true
  },
  'lax': {
    kcal: 208,
    protein: 20,
    carbs: 0,
    fat: 13,
    per100g: true
  },
  'potatis': {
    kcal: 77,
    protein: 2,
    carbs: 17,
    fat: 0.1,
    per100g: true
  },
  'broccoli': {
    kcal: 34,
    protein: 2.8,
    carbs: 7,
    fat: 0.4,
    per100g: true
  },
  'olivolja': {
    kcal: 884,
    protein: 0,
    carbs: 0,
    fat: 100,
    per100g: true
  }
}

// API function to lookup nutrition data
export const lookupNutrition = async (ingredientName) => {
  try {
    // Try to use Netlify Function for real API call
    const response = await fetch('/api/nutrition-lookup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: ingredientName
      })
    })
    
    if (response.ok) {
      const result = await response.json()
      return result
    } else {
      // Fallback to mock data if API fails
      console.warn('API call failed, using mock data')
      return await lookupNutritionMock(ingredientName)
    }
  } catch (error) {
    console.warn('Network error, using mock data:', error)
    return await lookupNutritionMock(ingredientName)
  }
}

// Fallback mock API function
const lookupNutritionMock = async (ingredientName) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Simple matching for demo purposes
  const searchTerm = ingredientName.toLowerCase()
  const match = Object.keys(mockNutritionData).find(key => 
    searchTerm.includes(key) || key.includes(searchTerm)
  )
  
  if (match) {
    return {
      success: true,
      data: mockNutritionData[match],
      foodName: match
    }
  }
  
  return {
    success: false,
    error: 'Livsmedel ej hittat i databasen'
  }
}