// Goal-based meal plans optimized for specific calorie targets
// Recipes formatted to match existing recipe structure

export const goalBasedRecipes = [
  // CALORIC DEFICIT RECIPES - Target: ~500 kcal per portion
  {
    id: 'kyckling-gronsaker-deficit',
    name: 'Kryddig kycklingfilé med rostade grönsaker',
    description: 'Mager kycklingfilé med färgglada grönsaker och stark smak. Perfekt för viktminskning med 5 portioner.',
    category: 'kaloriunderskott',
    mealType: ['lunch', 'dinner'],
    estimatedCost: '85-100 kr',
    servings: 5,
    difficulty: 'Lätt',
    prepTime: '35 min',
    ingredients: [
      { name: 'kycklingfilé', quantity: 600, unit: 'g' },
      { name: 'broccoli', quantity: 400, unit: 'g' },
      { name: 'paprika', quantity: 300, unit: 'g' },
      { name: 'zucchini', quantity: 300, unit: 'g' },
      { name: 'lök', quantity: 150, unit: 'g' },
      { name: 'olivolja', quantity: 20, unit: 'ml' },
      { name: 'quinoa', quantity: 125, unit: 'g' }
    ],
    recipe: {
      instructions: '1. Koka quinoan enligt förpackningen (125g ger ca 375g kokad). 2. Skär kycklingen i bitar och krydda med salt, peppar och paprikapulver. 3. Skär alla grönsaker i stora bitar. 4. Stek kycklingen i lite olivolja tills genomstekt. 5. Rosta grönsakerna i ugnen 200°C i 20 min med olivolja och kryddor. 6. Dela upp i 5 matlådor med quinoa som bas.'
    },
    tags: ['kaloriunderskott', 'hög protein', 'meal prep', 'glutenfri']
  },
  {
    id: 'fisk-spenat-deficit',
    name: 'Citronbakad torsk med krämig spenat',
    description: 'Mager vit fisk med proteinrik spenat och lite ris. Lätt och mättande för 5 portioner.',
    category: 'kaloriunderskott',
    mealType: ['lunch', 'dinner'],
    estimatedCost: '75-90 kr',
    servings: 5,
    difficulty: 'Lätt',
    prepTime: '30 min',
    ingredients: [
      { name: 'torsk', quantity: 500, unit: 'g' },
      { name: 'spenat', quantity: 400, unit: 'g' },
      { name: 'ris', quantity: 125, unit: 'g' },
      { name: 'kvarg', quantity: 200, unit: 'g' },
      { name: 'citron', quantity: 2, unit: 'st' },
      { name: 'vitlök', quantity: 3, unit: 'klyftor' },
      { name: 'olivolja', quantity: 15, unit: 'ml' }
    ],
    recipe: {
      instructions: '1. Koka riset enligt förpackningen (125g ger ca 375g kokat). 2. Marinera torsken med citronsaft, salt och peppar i 15 min. 3. Baka fisken i ugnen 200°C i 12-15 min tills genomstekt. 4. Fräs spenat med vitlök i lite olivolja. 5. Rör ner kvarg i spenaten för krämighet. 6. Dela upp i 5 matlådor med ris som bas.'
    },
    tags: ['kaloriunderskott', 'omega-3', 'meal prep', 'låg fett']
  },

  // CALORIC SURPLUS RECIPES - Target: ~700 kcal per portion
  {
    id: 'lax-avokado-surplus',
    name: 'Teriyakilax med avokado och sötstark potatis',
    description: 'Fet lax med hälsosamma fetter, sötstark potatis och avokado. Perfekt för muskelbygge med 5 portioner.',
    category: 'kaloriöverskott',
    mealType: ['lunch', 'dinner'],
    estimatedCost: '120-140 kr',
    servings: 5,
    difficulty: 'Medel',
    prepTime: '40 min',
    ingredients: [
      { name: 'lax', quantity: 500, unit: 'g' },
      { name: 'potatis', quantity: 600, unit: 'g' },
      { name: 'avokado', quantity: 2, unit: 'st' },
      { name: 'broccoli', quantity: 300, unit: 'g' },
      { name: 'olivolja', quantity: 30, unit: 'ml' },
      { name: 'mandel', quantity: 50, unit: 'g' },
      { name: 'quinoa', quantity: 150, unit: 'g' }
    ],
    recipe: {
      instructions: '1. Koka quinoan enligt förpackningen (150g ger ca 450g kokad). 2. Skala och koka potatisen tills mjuk, krossa lätt med gaffel. 3. Stek laxen i olivolja 3-4 min per sida. 4. Ångkoka broccolin tills knaprig. 5. Skiva avokado och rosta mandeln lätt. 6. Dela upp i 5 matlådor med quinoa som bas, toppa med avokado och mandel.'
    },
    tags: ['kaloriöverskott', 'omega-3', 'hälsosamma fetter', 'meal prep']
  },
  {
    id: 'kottkyckling-notmix-surplus',
    name: 'Köttfärs-kycklingfärs bowl med nötmix',
    description: 'Proteinrik blandning av kött och kyckling med quinoa, nötter och grönsaker för 5 portioner.',
    category: 'kaloriöverskott',
    mealType: ['lunch', 'dinner'],
    estimatedCost: '95-115 kr',
    servings: 5,
    difficulty: 'Lätt',
    prepTime: '35 min',
    ingredients: [
      { name: 'köttfärs', quantity: 300, unit: 'g' },
      { name: 'kycklingfärs', quantity: 300, unit: 'g' },
      { name: 'quinoa', quantity: 150, unit: 'g' },
      { name: 'cashewnötter', quantity: 60, unit: 'g' },
      { name: 'paprika', quantity: 200, unit: 'g' },
      { name: 'spenat', quantity: 200, unit: 'g' },
      { name: 'olivolja', quantity: 25, unit: 'ml' },
      { name: 'feta', quantity: 100, unit: 'g' }
    ],
    recipe: {
      instructions: '1. Koka quinoan enligt förpackningen (150g ger ca 450g kokad). 2. Stek köttfärsen och kycklingfärsen tillsammans tills genomstekt. 3. Tillsätt skivad paprika och stek några minuter. 4. Rör ner färsk spenat tills den vissnar. 5. Rosta cashewnötterna lätt i torr panna. 6. Dela upp i 5 matlådor med quinoa som bas, toppa med feta och nötter.'
    },
    tags: ['kaloriöverskott', 'hög protein', 'nötter', 'meal prep']
  }
]

// Helper function to get recipes by category
export function getGoalBasedRecipesByCategory(category) {
  return goalBasedRecipes.filter(recipe => recipe.category === category)
}

// Helper function to get all goal-based recipes
export function getAllGoalBasedRecipes() {
  return goalBasedRecipes
}