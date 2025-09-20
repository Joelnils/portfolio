// Calorie and macro calculation utilities

// Activity level multipliers for TDEE calculation
export const activityLevels = {
  sedentary: {
    multiplier: 1.2,
    label: 'Stillasittande',
    description: 'Kontorsarbete, lite eller ingen träning'
  },
  lightly_active: {
    multiplier: 1.375,
    label: 'Lätt aktiv',
    description: 'Lätt träning/sport 1-3 dagar per vecka'
  },
  moderately_active: {
    multiplier: 1.55,
    label: 'Måttligt aktiv',
    description: 'Måttlig träning/sport 3-5 dagar per vecka'
  },
  very_active: {
    multiplier: 1.725,
    label: 'Mycket aktiv',
    description: 'Hård träning/sport 6-7 dagar per vecka'
  },
  extremely_active: {
    multiplier: 1.9,
    label: 'Extremt aktiv',
    description: 'Mycket hård fysisk träning, fysiskt jobb'
  }
}

// Goal types and their calorie adjustments
export const goalTypes = {
  deficit: {
    label: 'Kaloriunderskott',
    description: 'Gå ner i vikt',
    weeklyAdjustment: -3500, // ~0.5 kg per week
    dailyAdjustment: -500
  },
  maintenance: {
    label: 'Viktunderhåll',
    description: 'Behålla nuvarande vikt',
    weeklyAdjustment: 0,
    dailyAdjustment: 0
  },
  surplus: {
    label: 'Kaloriöverskott',
    description: 'Gå upp i vikt/bygga muskler',
    weeklyAdjustment: 2100, // ~0.3 kg per week
    dailyAdjustment: 300
  }
}

/**
 * Calculate BMR using Mifflin-St Jeor Equation
 * Most accurate for modern populations
 */
export function calculateBMR(weight, height, age, gender) {
  if (gender === 'male') {
    return (10 * weight) + (6.25 * height) - (5 * age) + 5
  } else {
    return (10 * weight) + (6.25 * height) - (5 * age) - 161
  }
}

/**
 * Calculate TDEE (Total Daily Energy Expenditure)
 */
export function calculateTDEE(bmr, activityLevel) {
  const multiplier = activityLevels[activityLevel]?.multiplier || 1.2
  return Math.round(bmr * multiplier)
}

/**
 * Calculate goal-adjusted calories
 */
export function calculateGoalCalories(tdee, goal) {
  const adjustment = goalTypes[goal]?.dailyAdjustment || 0
  return Math.round(tdee + adjustment)
}

/**
 * Calculate weekly calorie target
 */
export function calculateWeeklyTarget(dailyCalories) {
  return dailyCalories * 7
}

/**
 * Calculate macro recommendations based on goal
 */
export function calculateMacros(dailyCalories, goal) {
  let proteinPercentage, carbPercentage, fatPercentage

  switch (goal) {
    case 'deficit':
      // Higher protein for muscle preservation during cut
      proteinPercentage = 0.35
      fatPercentage = 0.25
      carbPercentage = 0.40
      break
    case 'surplus':
      // Balanced macros for muscle building
      proteinPercentage = 0.25
      fatPercentage = 0.30
      carbPercentage = 0.45
      break
    default: // maintenance
      proteinPercentage = 0.30
      fatPercentage = 0.25
      carbPercentage = 0.45
  }

  return {
    protein: Math.round((dailyCalories * proteinPercentage) / 4), // 4 kcal per gram
    carbs: Math.round((dailyCalories * carbPercentage) / 4), // 4 kcal per gram
    fat: Math.round((dailyCalories * fatPercentage) / 9), // 9 kcal per gram
    proteinPercentage: Math.round(proteinPercentage * 100),
    carbPercentage: Math.round(carbPercentage * 100),
    fatPercentage: Math.round(fatPercentage * 100)
  }
}

/**
 * Get recommendation text based on goal
 */
export function getGoalRecommendation(goal, weeklyCalories) {
  const daily = Math.round(weeklyCalories / 7)

  switch (goal) {
    case 'deficit':
      return {
        title: 'Kaloriunderskott för viktminskning',
        description: `Ett underskott på ~500 kcal per dag ger en säker viktminskning på cirka 0.5 kg per vecka. Detta är en hållbar takt som bevarar muskelmassa.`,
        tips: [
          'Fokusera på proteinrika livsmedel för att bevara muskler',
          'Ät mycket grönsaker för mättnad med få kalorier',
          'Träna styrketräning för att behålla muskelmassa',
          'Drick mycket vatten före måltider'
        ]
      }
    case 'surplus':
      return {
        title: 'Kaloriöverskott för viktuppgång',
        description: `Ett överskott på ~300 kcal per dag ger en kontrollerad viktuppgång på cirka 0.3 kg per vecka, perfekt för muskelbygge.`,
        tips: [
          'Kombinera med styrketräning för optimal muskelbygge',
          'Välj näringsrika kalorier - nötter, avokado, fullkorn',
          'Ät regelbundet för att inte missa måltider',
          'Fokusera på protein runt träningen'
        ]
      }
    default:
      return {
        title: 'Viktunderhåll',
        description: `${daily} kcal per dag hjälper dig att behålla din nuvarande vikt samtidigt som du får alla näringsämnen du behöver.`,
        tips: [
          'Fokusera på näringstäthet över kaloriräkning',
          'Lyssna på din hungerkänsla',
          'Variera din kost för att få alla vitaminer',
          'Träna regelbundet för allmän hälsa'
        ]
      }
  }
}