// Individual recipe cards - each focused on one dish with realistic portions
export const mealPlans = [
  // Budget-friendly recipes
  {
    id: 'kyckling-ris-budget',
    name: 'Kyckling och ris med grönsaker',
    description: 'Klassisk meal prep-rätt som mättar länge och är prisvärd. Perfekt för 6 portioner.',
    category: 'budget',
    estimatedCost: '80-100 kr',
    servings: 6,
    difficulty: 'Lätt',
    prepTime: '45 min',
    ingredients: [
      { name: 'kycklingfilé', quantity: 600, unit: 'g' },
      { name: 'ris', quantity: 300, unit: 'g' },
      { name: 'frysta grönsaker', quantity: 500, unit: 'g' },
      { name: 'lök', quantity: 200, unit: 'g' },
      { name: 'olivolja', quantity: 30, unit: 'ml' }
    ],
    recipe: {
      instructions: '1. Stek kycklingen i bitar. 2. Koka riset. 3. Fräs löken och värm grönsakerna. 4. Blanda allt och krydda.'
    },
    tags: ['budget', 'enkelt', 'meal prep', 'protein']
  },
  {
    id: 'pasta-tomatsas-budget',
    name: 'Enkel pastasås med kött',
    description: 'Snabb och god köttfärssås som barnen älskar. Räcker till 5 rejäla portioner.',
    category: 'budget',
    estimatedCost: '60-80 kr',
    servings: 5,
    difficulty: 'Lätt',
    prepTime: '30 min',
    ingredients: [
      { name: 'köttfärs', quantity: 400, unit: 'g' },
      { name: 'pasta', quantity: 400, unit: 'g' },
      { name: 'krossade tomater', quantity: 400, unit: 'g' },
      { name: 'lök', quantity: 150, unit: 'g' },
      { name: 'vitlök', quantity: 2, unit: 'klyftor' }
    ],
    recipe: {
      instructions: '1. Fräs lök och vitlök. 2. Stek färsen. 3. Tillsätt tomater och låt puttra. 4. Koka pasta och servera.'
    },
    tags: ['budget', 'familj', 'snabbt', 'barnvänligt']
  },
  {
    id: 'aggomelett-budget',
    name: 'Näringsrik äggomelett',
    description: 'Proteinrik frukost eller lunch med grönsaker. 4 mättande portioner.',
    category: 'budget',
    estimatedCost: '40-50 kr',
    servings: 4,
    difficulty: 'Lätt',
    prepTime: '20 min',
    ingredients: [
      { name: 'ägg', quantity: 8, unit: 'st' },
      { name: 'mjölk', quantity: 100, unit: 'ml' },
      { name: 'spenat', quantity: 200, unit: 'g' },
      { name: 'ost', quantity: 100, unit: 'g' },
      { name: 'smör', quantity: 30, unit: 'g' }
    ],
    recipe: {
      instructions: '1. Vispa ägg med mjölk. 2. Stek spenat lätt. 3. Häll i äggblandningen. 4. Toppa med ost och vik ihop.'
    },
    tags: ['budget', 'protein', 'frukost', 'vegetarisk']
  },

  // Fitness/protein recipes
  {
    id: 'lax-quinoa-protein',
    name: 'Bakad lax med quinoa och broccoli',
    description: 'Omega-3 rik rätt med komplett protein från quinoa. 4 näringsrika portioner.',
    category: 'fitness',
    estimatedCost: '150-180 kr',
    servings: 4,
    difficulty: 'Medium',
    prepTime: '40 min',
    ingredients: [
      { name: 'laxfilé', quantity: 500, unit: 'g' },
      { name: 'quinoa', quantity: 200, unit: 'g' },
      { name: 'broccoli', quantity: 400, unit: 'g' },
      { name: 'olivolja', quantity: 40, unit: 'ml' },
      { name: 'citron', quantity: 1, unit: 'st' }
    ],
    recipe: {
      instructions: '1. Baka laxen i ugn 180°C i 20 min. 2. Koka quinoa. 3. Ångkoka broccoli. 4. Servera med citron och olivolja.'
    },
    tags: ['protein', 'omega-3', 'hälsosamt', 'träning']
  },
  {
    id: 'kyckling-spenat-protein',
    name: 'Kycklingwok med spenat och sötpotatis',
    description: 'Snabb och proteinrik wok med järnrik spenat. 5 mättande portioner.',
    category: 'fitness',
    estimatedCost: '90-110 kr',
    servings: 5,
    difficulty: 'Lätt',
    prepTime: '25 min',
    ingredients: [
      { name: 'kycklingfilé', quantity: 600, unit: 'g' },
      { name: 'sötpotatis', quantity: 500, unit: 'g' },
      { name: 'spenat', quantity: 300, unit: 'g' },
      { name: 'olivolja', quantity: 30, unit: 'ml' },
      { name: 'ingefära', quantity: 20, unit: 'g' }
    ],
    recipe: {
      instructions: '1. Tärna sötpotatis och kyckling. 2. Woka kyckling först. 3. Tillsätt sötpotatis. 4. Rör ner spenat sist.'
    },
    tags: ['protein', 'snabbt', 'träning', 'järn']
  },
  {
    id: 'aggrora-keso-protein',
    name: 'Proteinrik äggröra med keso',
    description: 'Perfekt frukost för träning med extra mycket protein. 3 portioner.',
    category: 'fitness',
    estimatedCost: '50-65 kr',
    servings: 3,
    difficulty: 'Lätt',
    prepTime: '15 min',
    ingredients: [
      { name: 'ägg', quantity: 6, unit: 'st' },
      { name: 'keso', quantity: 200, unit: 'g' },
      { name: 'spenat', quantity: 150, unit: 'g' },
      { name: 'avokado', quantity: 1, unit: 'st' },
      { name: 'smör', quantity: 20, unit: 'g' }
    ],
    recipe: {
      instructions: '1. Vispa ägg med keso. 2. Stek spenat lätt. 3. Häll i äggblandningen och rör. 4. Servera med avokado.'
    },
    tags: ['protein', 'frukost', 'träning', 'LCHF']
  },

  // Family-friendly recipes
  {
    id: 'korvgryta-familj',
    name: 'Krämig korvgryta med potatis',
    description: 'Barnens favorit! Mild och krämig gryta som alla gillar. 6 portioner.',
    category: 'family',
    estimatedCost: '80-100 kr',
    servings: 6,
    difficulty: 'Lätt',
    prepTime: '35 min',
    ingredients: [
      { name: 'falukorv', quantity: 400, unit: 'g' },
      { name: 'potatis', quantity: 800, unit: 'g' },
      { name: 'morötter', quantity: 300, unit: 'g' },
      { name: 'grädde', quantity: 300, unit: 'ml' },
      { name: 'lök', quantity: 150, unit: 'g' }
    ],
    recipe: {
      instructions: '1. Tärna korv och grönsaker. 2. Fräs lök. 3. Tillsätt resten och grädde. 4. Låt puttra 20 min.'
    },
    tags: ['familj', 'barnvänligt', 'krämigt', 'comfort food']
  },
  {
    id: 'fiskpinnar-mos-familj',
    name: 'Fiskpinnar med potatismos och ärtor',
    description: 'Klassisk barnmiddag som är både näringsrik och populär. 4 portioner.',
    category: 'family',
    estimatedCost: '60-75 kr',
    servings: 4,
    difficulty: 'Lätt',
    prepTime: '30 min',
    ingredients: [
      { name: 'fiskpinnar', quantity: 12, unit: 'st' },
      { name: 'potatis', quantity: 600, unit: 'g' },
      { name: 'frysta ärtor', quantity: 200, unit: 'g' },
      { name: 'mjölk', quantity: 150, unit: 'ml' },
      { name: 'smör', quantity: 50, unit: 'g' }
    ],
    recipe: {
      instructions: '1. Stek fiskpinnar enligt förpackning. 2. Koka potatis och mosa med mjölk. 3. Koka ärtor. 4. Servera tillsammans.'
    },
    tags: ['familj', 'barnvänligt', 'enkelt', 'klassiskt']
  }
]

export const getMealPlanById = (id) => {
  return mealPlans.find(plan => plan.id === id)
}