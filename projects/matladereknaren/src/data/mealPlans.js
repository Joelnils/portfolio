// Meal plan examples data
export const mealPlans = [
  {
    id: 'budget-vecka',
    name: 'Budgetvecka',
    description: 'Näringsrik vecka för den som vill äta bra utan att spendera för mycket.',
    category: 'budget',
    estimatedCost: '350-450 kr',
    servings: 7,
    difficulty: 'Lätt',
    prepTime: '2-3 timmar',
    ingredients: [
      { name: 'kycklingfilé', quantity: 1000, unit: 'g' },
      { name: 'ris', quantity: 500, unit: 'g' },
      { name: 'frysta grönsaker', quantity: 800, unit: 'g' },
      { name: 'ägg', quantity: 10, unit: 'st' },
      { name: 'pasta', quantity: 500, unit: 'g' },
      { name: 'krossade tomater', quantity: 800, unit: 'g' },
      { name: 'lök', quantity: 500, unit: 'g' },
      { name: 'potatis', quantity: 1000, unit: 'g' }
    ],
    recipes: [
      {
        name: 'Kyckling och ris med grönsaker',
        portions: 4,
        ingredients: ['kycklingfilé', 'ris', 'frysta grönsaker'],
        instructions: 'Stek kycklingen, koka riset, värm grönsakerna. Perfekt meal prep!'
      },
      {
        name: 'Enkel pastasås',
        portions: 3,
        ingredients: ['pasta', 'krossade tomater', 'lök'],
        instructions: 'Fräs löken, tillsätt tomater, koka pasta. Enkelt och gott!'
      }
    ],
    tags: ['budget', 'enkelt', 'meal prep']
  },
  {
    id: 'protein-vecka',
    name: 'Proteinvecka',
    description: 'Perfekt för dig som tränar och vill maximera proteinintaget.',
    category: 'fitness',
    estimatedCost: '600-750 kr',
    servings: 7,
    difficulty: 'Medium',
    prepTime: '3-4 timmar',
    ingredients: [
      { name: 'laxfilé', quantity: 600, unit: 'g' },
      { name: 'kycklingfilé', quantity: 800, unit: 'g' },
      { name: 'ägg', quantity: 15, unit: 'st' },
      { name: 'keso', quantity: 500, unit: 'g' },
      { name: 'quinoa', quantity: 400, unit: 'g' },
      { name: 'broccoli', quantity: 800, unit: 'g' },
      { name: 'spenat', quantity: 300, unit: 'g' },
      { name: 'avokado', quantity: 3, unit: 'st' }
    ],
    recipes: [
      {
        name: 'Bakad lax med quinoa',
        portions: 3,
        ingredients: ['laxfilé', 'quinoa', 'broccoli'],
        instructions: 'Baka laxen i ugn, koka quinoa, ångkoka broccoli. Omega-3 och protein!'
      },
      {
        name: 'Proteinrik äggröra',
        portions: 2,
        ingredients: ['ägg', 'keso', 'spenat'],
        instructions: 'Vispa ägg med keso, stek med spenat. Perfekt frukost!'
      }
    ],
    tags: ['protein', 'träning', 'hälsosamt']
  },
  {
    id: 'familj-vecka',
    name: 'Familjens vecka',
    description: 'Barnvänliga rätter som hela familjen gillar.',
    category: 'family',
    estimatedCost: '500-650 kr',
    servings: 7,
    difficulty: 'Lätt',
    prepTime: '2-3 timmar',
    ingredients: [
      { name: 'köttfärs', quantity: 800, unit: 'g' },
      { name: 'pasta', quantity: 600, unit: 'g' },
      { name: 'ris', quantity: 500, unit: 'g' },
      { name: 'krossade tomater', quantity: 1200, unit: 'g' },
      { name: 'fisk', quantity: 600, unit: 'g' },
      { name: 'potatis', quantity: 1500, unit: 'g' },
      { name: 'morötter', quantity: 800, unit: 'g' },
      { name: 'ost', quantity: 300, unit: 'g' }
    ],
    recipes: [
      {
        name: 'Köttfärssås med pasta',
        portions: 4,
        ingredients: ['köttfärs', 'pasta', 'krossade tomater'],
        instructions: 'Stek färsen, tillsätt tomater, koka pasta. Barnens favorit!'
      },
      {
        name: 'Fiskgryta med potatis',
        portions: 3,
        ingredients: ['fisk', 'potatis', 'morötter'],
        instructions: 'Koka potatis, lägg i fisk och morötter. Mild och god!'
      }
    ],
    tags: ['familj', 'barnvänligt', 'enkelt']
  }
]

export const getMealPlanById = (id) => {
  return mealPlans.find(plan => plan.id === id)
}