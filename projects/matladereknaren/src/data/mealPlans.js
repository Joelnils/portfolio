// Individual recipe cards - each focused on one dish with realistic portions
export const mealPlans = [
  // Budget-friendly recipes
  {
    id: 'kyckling-ris-budget',
    name: 'Kyckling och ris med grönsaker',
    description: 'Klassisk meal prep-rätt som mättar länge och är prisvärd. Perfekt för 6 portioner.',
    category: 'budget',
    mealType: ['lunch', 'dinner'],
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
    mealType: ['lunch', 'dinner'],
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
    id: 'kanelbulle-ugnsgrota-budget',
    name: 'Kanelbulle-ugnsgröt',
    description: 'Mysig ugnsgröt med kanelsmak som påminner om kanelbullar. Perfekt frukost för hela familjen! 🥣✨',
    category: 'budget',
    mealType: ['breakfast'],
    estimatedCost: '36 kr totalt (ca 6 kr/portion)',
    servings: 6,
    difficulty: 'Lätt',
    prepTime: '35 min (5 min förberedelse + 30 min ugn)',
    ingredients: [
      { name: 'havregryn', quantity: 270, unit: 'g' },
      { name: 'havredryck vanilj', quantity: 550, unit: 'ml' },
      { name: 'ägg', quantity: 3, unit: 'st' },
      { name: 'banan mogen', quantity: 1, unit: 'st' },
      { name: 'bakpulver', quantity: 2, unit: 'tsk' },
      { name: 'salt', quantity: 1, unit: 'krm' },
      { name: 'brun farin', quantity: 3, unit: 'msk' },
      { name: 'kanel', quantity: 2, unit: 'tsk' },
      { name: 'rapsolja', quantity: 1, unit: 'msk' }
    ],
    recipe: {
      instructions: '1. Sätt ugnen på 200°C. 2. Mosa bananen och vispa ihop med äggen. 3. Rör ner havregryn, havredryck, bakpulver och salt. Häll i ugnsform (20×30 cm). 4. Blanda farin, kanel och olja. Ringla över smeten och dra med kniv för marmorerat mönster. 5. Grädda 25-30 min tills gyllene. Servera med bär eller yoghurt!'
    },
    tags: ['budget', 'frukost', 'familj', 'vegetarisk', 'meal prep']
  },
  {
    id: 'aggomelett-budget',
    name: 'Näringsrik äggomelett',
    description: 'Proteinrik frukost eller lunch med grönsaker. 4 mättande portioner.',
    category: 'budget',
    mealType: ['breakfast', 'lunch'],
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
    mealType: ['lunch', 'dinner'],
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
    mealType: ['dinner'],
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
    mealType: ['breakfast', 'snack'],
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
    mealType: ['lunch', 'dinner'],
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
    mealType: ['dinner'],
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
  },

  // LCHF/Keto recipes
  {
    id: 'lchf-laxsallad',
    name: 'Krämig laxsallad med avokado',
    description: 'Perfekt LCHF-lunch med hög fettandel och minimal kolhydrater. 4 portioner.',
    category: 'lchf',
    mealType: ['lunch'],
    estimatedCost: '120-140 kr',
    servings: 4,
    difficulty: 'Lätt',
    prepTime: '15 min',
    ingredients: [
      { name: 'rökt lax', quantity: 200, unit: 'g' },
      { name: 'avokado', quantity: 2, unit: 'st' },
      { name: 'rucola', quantity: 100, unit: 'g' },
      { name: 'crème fraiche', quantity: 200, unit: 'ml' },
      { name: 'kapris', quantity: 30, unit: 'g' }
    ],
    recipe: {
      instructions: '1. Tärna lax och avokado. 2. Blanda med rucola. 3. Rör ihop crème fraiche med kapris. 4. Servera tillsammans.'
    },
    tags: ['lchf', 'keto', 'snabbt', 'omega-3']
  },
  {
    id: 'lchf-kyckling-gratin',
    name: 'Kycklinggratäng med broccoli',
    description: 'Krämig gratäng utan pasta eller potatis. Perfekt LCHF-middag för 5 portioner.',
    category: 'lchf',
    mealType: ['dinner'],
    estimatedCost: '100-120 kr',
    servings: 5,
    difficulty: 'Medium',
    prepTime: '45 min',
    ingredients: [
      { name: 'kycklingfilé', quantity: 600, unit: 'g' },
      { name: 'broccoli', quantity: 500, unit: 'g' },
      { name: 'grädde', quantity: 400, unit: 'ml' },
      { name: 'ost', quantity: 150, unit: 'g' },
      { name: 'vitlök', quantity: 3, unit: 'klyftor' }
    ],
    recipe: {
      instructions: '1. Stek kyckling i bitar. 2. Ångkoka broccoli. 3. Lägg i ugnsform med grädde och vitlök. 4. Gratinera med ost 25 min i 200°C.'
    },
    tags: ['lchf', 'keto', 'protein', 'gratäng']
  },

  // Vegetarian recipes
  {
    id: 'vegetarisk-linsgryta',
    name: 'Kryddig röd linsgryta med kokosmjölk',
    description: 'Mättande vegansk gryta full av protein och smak. 6 generösa portioner.',
    category: 'vegetarian',
    mealType: ['lunch', 'dinner'],
    estimatedCost: '70-90 kr',
    servings: 6,
    difficulty: 'Lätt',
    prepTime: '35 min',
    ingredients: [
      { name: 'röda linser', quantity: 300, unit: 'g' },
      { name: 'kokosmjölk', quantity: 400, unit: 'ml' },
      { name: 'sötpotatis', quantity: 400, unit: 'g' },
      { name: 'spenat', quantity: 200, unit: 'g' },
      { name: 'curry', quantity: 2, unit: 'msk' }
    ],
    recipe: {
      instructions: '1. Koka linser med curry. 2. Tärna och tillsätt sötpotatis. 3. Häll i kokosmjölk. 4. Rör ner spenat sist.'
    },
    tags: ['vegetarisk', 'vegansk', 'protein', 'fibrer']
  },
  {
    id: 'vegetarisk-quinoa-bowl',
    name: 'Färgglad quinoa-bowl med tahini',
    description: 'Näringsrik bowl med komplett protein från quinoa. 4 mättande portioner.',
    category: 'vegetarian',
    mealType: ['lunch', 'dinner'],
    estimatedCost: '80-100 kr',
    servings: 4,
    difficulty: 'Medium',
    prepTime: '30 min',
    ingredients: [
      { name: 'quinoa', quantity: 200, unit: 'g' },
      { name: 'kikärtor', quantity: 400, unit: 'g' },
      { name: 'paprika', quantity: 200, unit: 'g' },
      { name: 'gurka', quantity: 200, unit: 'g' },
      { name: 'tahini', quantity: 60, unit: 'g' }
    ],
    recipe: {
      instructions: '1. Koka quinoa. 2. Rosta kikärtorna. 3. Skär grönsaker i tärningar. 4. Servera med tahini-dressing.'
    },
    tags: ['vegetarisk', 'protein', 'bowl', 'mellanöstern']
  },

  // Quick meals (under 20 min)
  {
    id: 'snabb-aggrora',
    name: 'Snabb äggröra med skinka och ost',
    description: 'Proteinrik måltid på bara 10 minuter. Perfekt för frukost eller lunch. 2 portioner.',
    category: 'quick',
    mealType: ['breakfast', 'snack'],
    estimatedCost: '40-50 kr',
    servings: 2,
    difficulty: 'Lätt',
    prepTime: '10 min',
    ingredients: [
      { name: 'ägg', quantity: 4, unit: 'st' },
      { name: 'skinka', quantity: 100, unit: 'g' },
      { name: 'ost', quantity: 80, unit: 'g' },
      { name: 'smör', quantity: 20, unit: 'g' },
      { name: 'gräslök', quantity: 10, unit: 'g' }
    ],
    recipe: {
      instructions: '1. Vispa äggen. 2. Stek i smör. 3. Tillsätt skinka och ost. 4. Garnera med gräslök.'
    },
    tags: ['snabbt', 'protein', 'frukost', '10 min']
  },
  {
    id: 'snabb-pasta-pesto',
    name: 'Pastasallad med färdig pesto',
    description: 'Snabb och god pastasallad med mozzarella. 4 portioner på 15 minuter.',
    category: 'quick',
    mealType: ['lunch'],
    estimatedCost: '60-75 kr',
    servings: 4,
    difficulty: 'Lätt',
    prepTime: '15 min',
    ingredients: [
      { name: 'pasta', quantity: 300, unit: 'g' },
      { name: 'färdig pesto', quantity: 100, unit: 'g' },
      { name: 'mozzarella', quantity: 150, unit: 'g' },
      { name: 'körsbärstomater', quantity: 200, unit: 'g' },
      { name: 'rucola', quantity: 50, unit: 'g' }
    ],
    recipe: {
      instructions: '1. Koka pasta. 2. Blanda med pesto. 3. Tillsätt mozzarella och tomater. 4. Toppa med rucola.'
    },
    tags: ['snabbt', 'vegetarisk', 'pasta', '15 min']
  },

  // Additional Budget recipes
  {
    id: 'linssoppa-budget',
    name: 'Krämig linssoppa med morötter',
    description: 'Mättande och billig proteinrik soppa. Perfekt för 6 portioner.',
    category: 'budget',
    mealType: ['lunch', 'dinner'],
    estimatedCost: '35-45 kr',
    servings: 6,
    difficulty: 'Lätt',
    prepTime: '40 min',
    ingredients: [
      { name: 'röda linser', quantity: 400, unit: 'g' },
      { name: 'morötter', quantity: 500, unit: 'g' },
      { name: 'lök', quantity: 200, unit: 'g' },
      { name: 'kokosmjölk', quantity: 400, unit: 'ml' },
      { name: 'buljong', quantity: 1000, unit: 'ml' },
      { name: 'olivolja', quantity: 30, unit: 'ml' }
    ],
    recipe: {
      instructions: '1. Fräs lök och morötter. 2. Tillsätt linser och buljong. 3. Koka 20 min. 4. Mixa halvt, tillsätt kokosmjölk.'
    },
    tags: ['budget', 'vegetarisk', 'protein', 'soppa']
  },
  {
    id: 'kyckling-potatis-budget',
    name: 'Ugnsbakad kyckling med potatis',
    description: 'Enkel helkött-middag direkt från ugnen. 5 generösa portioner.',
    category: 'budget',
    mealType: ['dinner'],
    estimatedCost: '75-90 kr',
    servings: 5,
    difficulty: 'Lätt',
    prepTime: '60 min',
    ingredients: [
      { name: 'kyckling', quantity: 800, unit: 'g' },
      { name: 'potatis', quantity: 1000, unit: 'g' },
      { name: 'gul lök', quantity: 300, unit: 'g' },
      { name: 'paprika', quantity: 300, unit: 'g' },
      { name: 'olivolja', quantity: 50, unit: 'ml' },
      { name: 'vitlök', quantity: 4, unit: 'klyftor' }
    ],
    recipe: {
      instructions: '1. Tärna allt grovt. 2. Blanda med olja och vitlök. 3. Ugn 200°C i 45 min. 4. Vänd en gång halvvägs.'
    },
    tags: ['budget', 'ugn', 'hela familjen', 'enkelt']
  },

  // Additional Fitness recipes
  {
    id: 'protein-pannkakor-fitness',
    name: 'Proteinpannkakor med bär',
    description: 'Högt proteininnehåll för träning. 3 portioner för frukost.',
    category: 'fitness',
    mealType: ['breakfast'],
    estimatedCost: '45-60 kr',
    servings: 3,
    difficulty: 'Lätt',
    prepTime: '20 min',
    ingredients: [
      { name: 'ägg', quantity: 6, unit: 'st' },
      { name: 'proteinpulver', quantity: 60, unit: 'g' },
      { name: 'havregryn', quantity: 100, unit: 'g' },
      { name: 'grekisk yoghurt', quantity: 300, unit: 'g' },
      { name: 'blåbär', quantity: 200, unit: 'g' },
      { name: 'kokosolja', quantity: 20, unit: 'ml' }
    ],
    recipe: {
      instructions: '1. Mixa ägg, protein och havregryn. 2. Stek pannkakor i kokosolja. 3. Servera med yoghurt och bär.'
    },
    tags: ['fitness', 'protein', 'frukost', 'låg kolhydrat']
  },
  {
    id: 'tonfisk-quinoa-fitness',
    name: 'Tonfisksallad med quinoa',
    description: 'Proteinrik lunch för återhämtning. 4 portioner.',
    category: 'fitness',
    mealType: ['lunch'],
    estimatedCost: '80-95 kr',
    servings: 4,
    difficulty: 'Lätt',
    prepTime: '25 min',
    ingredients: [
      { name: 'quinoa', quantity: 200, unit: 'g' },
      { name: 'tonfisk i vatten', quantity: 300, unit: 'g' },
      { name: 'avokado', quantity: 2, unit: 'st' },
      { name: 'rödlök', quantity: 100, unit: 'g' },
      { name: 'fetaost', quantity: 150, unit: 'g' },
      { name: 'olivolja', quantity: 40, unit: 'ml' }
    ],
    recipe: {
      instructions: '1. Koka quinoa enligt förpackning. 2. Blanda med tonfisk och tärnad avokado. 3. Tillsätt fetaost och lök.'
    },
    tags: ['fitness', 'protein', 'omega-3', 'quinoa']
  },

  // Additional Family recipes
  {
    id: 'kottbullar-potatis-family',
    name: 'Klassiska köttbullar med potatismos',
    description: 'Barnens favorit som alla gillar. 6 portioner.',
    category: 'family',
    mealType: ['lunch', 'dinner'],
    estimatedCost: '85-100 kr',
    servings: 6,
    difficulty: 'Medium',
    prepTime: '50 min',
    ingredients: [
      { name: 'blandfärs', quantity: 600, unit: 'g' },
      { name: 'potatis', quantity: 1200, unit: 'g' },
      { name: 'ägg', quantity: 1, unit: 'st' },
      { name: 'mjöl', quantity: 50, unit: 'g' },
      { name: 'mjölk', quantity: 400, unit: 'ml' },
      { name: 'smör', quantity: 80, unit: 'g' },
      { name: 'grädde', quantity: 200, unit: 'ml' }
    ],
    recipe: {
      instructions: '1. Rulla köttbullar av färs och ägg. 2. Stek gyllene. 3. Koka potatis, mosa med mjölk. 4. Gör gräddsås.'
    },
    tags: ['familj', 'klassisk', 'barnvänlig', 'svensk husmanskost']
  },
  {
    id: 'fiskpinnar-family',
    name: 'Hemgjorda fiskpinnar med sötpotatisfries',
    description: 'Nyttigare version av barnfavoriten. 4 portioner.',
    category: 'family',
    mealType: ['lunch', 'dinner'],
    estimatedCost: '70-85 kr',
    servings: 4,
    difficulty: 'Medium',
    prepTime: '35 min',
    ingredients: [
      { name: 'torskfilé', quantity: 500, unit: 'g' },
      { name: 'sötpotatis', quantity: 800, unit: 'g' },
      { name: 'ägg', quantity: 2, unit: 'st' },
      { name: 'ströbröd', quantity: 100, unit: 'g' },
      { name: 'mjöl', quantity: 50, unit: 'g' },
      { name: 'olivolja', quantity: 60, unit: 'ml' }
    ],
    recipe: {
      instructions: '1. Skär fisk i strips, panera. 2. Skär sötpotatis i stavar. 3. Ugn 220°C, 25 min. 4. Servera med dipp.'
    },
    tags: ['familj', 'fisk', 'hemgjort', 'ugn']
  },

  // Additional LCHF recipes
  {
    id: 'lchf-omelett-bacon',
    name: 'Fluffig omelett med bacon och ost',
    description: 'Perfekt LCHF-frukost med hög fettandel. 2 portioner.',
    category: 'lchf',
    mealType: ['breakfast'],
    estimatedCost: '55-70 kr',
    servings: 2,
    difficulty: 'Lätt',
    prepTime: '15 min',
    ingredients: [
      { name: 'ägg', quantity: 6, unit: 'st' },
      { name: 'bacon', quantity: 120, unit: 'g' },
      { name: 'cheddarost', quantity: 100, unit: 'g' },
      { name: 'smör', quantity: 40, unit: 'g' },
      { name: 'grädde', quantity: 100, unit: 'ml' },
      { name: 'gräslök', quantity: 20, unit: 'g' }
    ],
    recipe: {
      instructions: '1. Stek bacon knaprig. 2. Vispa ägg med grädde. 3. Gör omelett, fyll med bacon och ost. 4. Toppa med gräslök.'
    },
    tags: ['lchf', 'keto', 'frukost', 'hög fett']
  },
  {
    id: 'lchf-zucchini-lasagne',
    name: 'Zucchini-lasagne med köttfärs',
    description: 'LCHF-version utan pasta. 6 portioner.',
    category: 'lchf',
    mealType: ['dinner'],
    estimatedCost: '110-130 kr',
    servings: 6,
    difficulty: 'Medium',
    prepTime: '60 min',
    ingredients: [
      { name: 'zucchini', quantity: 800, unit: 'g' },
      { name: 'köttfärs', quantity: 600, unit: 'g' },
      { name: 'mozzarella', quantity: 200, unit: 'g' },
      { name: 'parmesan', quantity: 100, unit: 'g' },
      { name: 'grädde', quantity: 300, unit: 'ml' },
      { name: 'ägg', quantity: 2, unit: 'st' }
    ],
    recipe: {
      instructions: '1. Skiva zucchini tunt. 2. Bryn köttfärs. 3. Varva med gräddblandning och ost. 4. Ugn 180°C i 40 min.'
    },
    tags: ['lchf', 'keto', 'låg kolhydrat', 'gratäng']
  },

  // Additional Vegetarian recipes
  {
    id: 'vegetarian-chili',
    name: 'Kryddig bönchili med quinoa',
    description: 'Proteinrik vegetarisk chili. 5 portioner.',
    category: 'vegetarian',
    mealType: ['lunch', 'dinner'],
    estimatedCost: '60-75 kr',
    servings: 5,
    difficulty: 'Lätt',
    prepTime: '35 min',
    ingredients: [
      { name: 'kidneybönor', quantity: 800, unit: 'g' },
      { name: 'quinoa', quantity: 200, unit: 'g' },
      { name: 'krossade tomater', quantity: 800, unit: 'g' },
      { name: 'paprika', quantity: 300, unit: 'g' },
      { name: 'lök', quantity: 200, unit: 'g' },
      { name: 'majs', quantity: 200, unit: 'g' }
    ],
    recipe: {
      instructions: '1. Fräs lök och paprika. 2. Tillsätt tomater och bönor. 3. Låt sjuda 20 min. 4. Servera med kokad quinoa.'
    },
    tags: ['vegetarisk', 'protein', 'kryddig', 'quinoa']
  },
  {
    id: 'halloumi-sallad',
    name: 'Grillad halloumi med rostad sötpotatis',
    description: 'Näringsrik vegetarisk sallad. 4 portioner.',
    category: 'vegetarian',
    mealType: ['lunch'],
    estimatedCost: '85-100 kr',
    servings: 4,
    difficulty: 'Lätt',
    prepTime: '30 min',
    ingredients: [
      { name: 'halloumi', quantity: 300, unit: 'g' },
      { name: 'sötpotatis', quantity: 600, unit: 'g' },
      { name: 'spenat', quantity: 200, unit: 'g' },
      { name: 'valnötter', quantity: 100, unit: 'g' },
      { name: 'olivolja', quantity: 50, unit: 'ml' },
      { name: 'balsamvinäger', quantity: 30, unit: 'ml' }
    ],
    recipe: {
      instructions: '1. Rosta sötpotatis i ugn. 2. Grilla halloumi. 3. Blanda spenat med nötter. 4. Servera med vinägrett.'
    },
    tags: ['vegetarisk', 'protein', 'sallad', 'nyttigt']
  },

  // Additional Quick recipes
  {
    id: 'snabb-wraps',
    name: 'Kycklingwraps med hummus',
    description: 'Snabb lunch eller middag. 3 portioner på 10 minuter.',
    category: 'quick',
    mealType: ['lunch'],
    estimatedCost: '55-70 kr',
    servings: 3,
    difficulty: 'Lätt',
    prepTime: '10 min',
    ingredients: [
      { name: 'tortillabröd', quantity: 3, unit: 'st' },
      { name: 'färdig kycklingfilé', quantity: 300, unit: 'g' },
      { name: 'hummus', quantity: 150, unit: 'g' },
      { name: 'sallad', quantity: 150, unit: 'g' },
      { name: 'tomat', quantity: 200, unit: 'g' },
      { name: 'gurka', quantity: 150, unit: 'g' }
    ],
    recipe: {
      instructions: '1. Värm tortillor. 2. Bre på hummus. 3. Fyll med kyckling och grönsaker. 4. Rulla ihop och skär.'
    },
    tags: ['snabbt', 'wrap', 'lunch', '10 min']
  },
  {
    id: 'snabb-risotto',
    name: 'Krämig svamprisotto',
    description: 'Snabblagad risotto med färska svamp. 4 portioner.',
    category: 'quick',
    mealType: ['dinner'],
    estimatedCost: '65-80 kr',
    servings: 4,
    difficulty: 'Medium',
    prepTime: '18 min',
    ingredients: [
      { name: 'risottoris', quantity: 300, unit: 'g' },
      { name: 'blandad svamp', quantity: 400, unit: 'g' },
      { name: 'parmesan', quantity: 100, unit: 'g' },
      { name: 'vitt vin', quantity: 200, unit: 'ml' },
      { name: 'buljong', quantity: 800, unit: 'ml' },
      { name: 'smör', quantity: 50, unit: 'g' }
    ],
    recipe: {
      instructions: '1. Fräs svamp. 2. Rosta ris kort. 3. Tillsätt vin och buljong gradvis. 4. Rör i parmesan och smör.'
    },
    tags: ['snabbt', 'svamp', 'risotto', 'krämig']
  }
]

// Category definitions for navigation and SEO
export const categories = [
  {
    id: 'all',
    name: 'Alla recept',
    description: 'Bläddra bland alla våra receptförslag',
    slug: '',
    seoTitle: 'Receptinspiration - Matplan',
    seoDescription: 'Färdiga recept att importera direkt till näringskalkylatorn. Budget, fitness, familj, LCHF och vegetariska alternativ.'
  },
  {
    id: 'budget',
    name: 'Budget',
    description: 'Näringsrik mat utan att spendera för mycket',
    slug: 'budget',
    seoTitle: 'Budgetrecept - Matplan Näringsberäkning',
    seoDescription: 'Billiga och näringsrika recept för den som vill äta bra utan att spendera för mycket. Importera ingredienser direkt.'
  },
  {
    id: 'fitness',
    name: 'Fitness & Protein',
    description: 'För dig som tränar och vill maximera protein',
    slug: 'fitness',
    seoTitle: 'Proteinrika Recept för Träning - Matplan',
    seoDescription: 'Proteinrika recept perfekta för träning och muskelbygge. Omega-3, quinoa och magert kött med näringsberäkning.'
  },
  {
    id: 'family',
    name: 'Familjerecept',
    description: 'Barnvänliga rätter hela familjen gillar',
    slug: 'familj',
    seoTitle: 'Barnvänliga Familjerecept - Matplan',
    seoDescription: 'Enkla recept som hela familjen gillar. Klassiska rätter barn älskar med näringsberäkning och kostnader.'
  },
  {
    id: 'lchf',
    name: 'LCHF & Keto',
    description: 'Låg kolhydrat, hög fett',
    slug: 'lchf',
    seoTitle: 'LCHF & Keto Recept - Matplan Kalkylator',
    seoDescription: 'Låg kolhydrat recept för LCHF och keto-dieter. Beräkna näringsvärden och kostnader för ketogena måltider.'
  },
  {
    id: 'vegetarian',
    name: 'Vegetariskt',
    description: 'Växtbaserad näring',
    slug: 'vegetariskt',
    seoTitle: 'Vegetariska Recept - Matplan Näringsberäkning',
    seoDescription: 'Vegetariska och veganska recept med hög proteinandel. Linser, quinoa och växtbaserad näring med kalkylator.'
  },
  {
    id: 'quick',
    name: 'Snabba måltider',
    description: 'Under 20 minuter',
    slug: 'snabbt',
    seoTitle: 'Snabba Recept Under 20 Min - Matplan',
    seoDescription: 'Snabba och enkla recept som tillagas på under 20 minuter. Perfekt för vardagen med näringsberäkning.'
  }
]

export const getMealPlanById = (id) => {
  return mealPlans.find(plan => plan.id === id)
}

export const getMealPlansByCategory = (categoryId) => {
  if (categoryId === 'all' || !categoryId) {
    return mealPlans
  }
  return mealPlans.filter(plan => plan.category === categoryId)
}

export const getCategoryById = (id) => {
  return categories.find(cat => cat.id === id)
}

export const getAllRecipes = () => {
  return mealPlans
}