import { writeFileSync, mkdirSync, readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Import the actual meal plans data
const mealPlansPath = join(__dirname, '../src/data/mealPlans.js')
const mealPlansContent = readFileSync(mealPlansPath, 'utf8')

// Extract mealPlans array from the file (simple regex extraction)
const mealPlansMatch = mealPlansContent.match(/export const mealPlans = (\[[\s\S]*?\n\])/m)
if (!mealPlansMatch) {
  throw new Error('Could not extract mealPlans from mealPlans.js')
}

// Parse the meal plans (we'll use a simple eval since this is a build script)
const mealPlans = eval(mealPlansMatch[1])

// Import goal-based recipes
const goalBasedPath = join(__dirname, '../src/data/goalBasedMealPlans.js')
const goalBasedContent = readFileSync(goalBasedPath, 'utf8')

// Extract goalBasedRecipes array from the file
const goalBasedMatch = goalBasedContent.match(/export const goalBasedRecipes = (\[[\s\S]*?\n\])/m)
let goalBasedRecipes = []
if (goalBasedMatch) {
  goalBasedRecipes = eval(goalBasedMatch[1])
}

// Combine all recipes
const allRecipes = [...mealPlans, ...goalBasedRecipes]

// Helper function to get recipes by category
function getRecipesByCategory(categoryId) {
  return allRecipes.filter(recipe => recipe.category === categoryId)
}

// Category definitions with SEO data and icons
const categories = [
  {
    id: 'budget',
    name: 'Budgetrecept',
    description: 'Näringsrik mat utan att spendera för mycket',
    icon: '💰',
    slug: 'budget',
    seoTitle: 'Budgetrecept - Matplan Näringsberäkning',
    seoDescription: 'Billiga och näringsrika recept för den som vill äta bra utan att spendera för mycket. Importera ingredienser direkt.'
  },
  {
    id: 'fitness',
    name: 'Fitness & Protein',
    description: 'För dig som tränar och vill maximera protein',
    icon: '💪',
    slug: 'fitness',
    seoTitle: 'Proteinrika Recept för Träning - Matplan',
    seoDescription: 'Proteinrika recept perfekta för träning och muskelbygge. Omega-3, quinoa och magert kött med näringsberäkning.'
  },
  {
    id: 'family',
    name: 'Familjerecept',
    description: 'Barnvänliga rätter hela familjen gillar',
    icon: '👨‍👩‍👧‍👦',
    slug: 'familj',
    seoTitle: 'Barnvänliga Familjerecept - Matplan',
    seoDescription: 'Enkla recept som hela familjen gillar. Klassiska rätter barn älskar med näringsberäkning och kostnader.'
  },
  {
    id: 'lchf',
    name: 'LCHF & Keto',
    description: 'Låg kolhydrat, hög fett',
    icon: '🥑',
    slug: 'lchf',
    seoTitle: 'LCHF & Keto Recept - Matplan Kalkylator',
    seoDescription: 'Låg kolhydrat recept för LCHF och keto-dieter. Beräkna näringsvärden och kostnader för ketogena måltider.'
  },
  {
    id: 'vegetarian',
    name: 'Vegetariska Recept',
    description: 'Växtbaserad näring',
    icon: '🌱',
    slug: 'vegetariskt',
    seoTitle: 'Vegetariska Recept - Matplan Näringsberäkning',
    seoDescription: 'Vegetariska och veganska recept med hög proteinandel. Linser, quinoa och växtbaserad näring med kalkylator.'
  },
  {
    id: 'quick',
    name: 'Snabba Måltider',
    description: 'Under 20 minuter',
    icon: '⚡',
    slug: 'snabbt',
    seoTitle: 'Snabba Recept Under 20 Min - Matplan',
    seoDescription: 'Snabba och enkla recept som tillagas på under 20 minuter. Perfekt för vardagen med näringsberäkning.'
  },
  {
    id: 'kaloriunderskott',
    name: 'Kaloriunderskott',
    description: 'För viktminskning - högprotein, lågkalorit',
    icon: '🎯',
    slug: 'kaloriunderskott',
    seoTitle: 'Kaloriunderskott Recept - Matplan Viktminskning',
    seoDescription: 'Måltider optimerade för viktminskning med hög protein och låg kalori. 5-dagars meal prep för kaloriunderskott.'
  },
  {
    id: 'kaloriöverskott',
    name: 'Kaloriöverskott',
    description: 'För viktuppgång - näringsrikt, kaloritätt',
    icon: '💪',
    slug: 'kalorioverskott',
    seoTitle: 'Kaloriöverskott Recept - Matplan Muskelbygge',
    seoDescription: 'Näringsrika måltider för viktuppgång och muskelbygge. Hälsosamma fetter och kvalitetsprotein för kaloriöverskott.'
  }
]

// Function to generate recipe card HTML
function generateRecipeCard(recipe) {
  const categoryColors = {
    budget: { bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-500' },
    fitness: { bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-500' },
    family: { bg: 'bg-yellow-50', border: 'border-yellow-200', badge: 'bg-yellow-500' },
    lchf: { bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-500' },
    vegetarian: { bg: 'bg-emerald-50', border: 'border-emerald-200', badge: 'bg-emerald-500' },
    quick: { bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-500' },
    kaloriunderskott: { bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-500' },
    kaloriöverskott: { bg: 'bg-indigo-50', border: 'border-indigo-200', badge: 'bg-indigo-500' }
  }

  const colors = categoryColors[recipe.category] || categoryColors.budget

  return `
    <div class="recipe-card ${colors.bg} ${colors.border}">
      <div class="card-header">
        <div class="card-title-row">
          <h3 class="recipe-title">${recipe.name}</h3>
          <span class="category-badge ${colors.badge}">${recipe.category}</span>
        </div>
        <p class="recipe-description">${recipe.description}</p>

        <div class="recipe-stats">
          <div class="stat">
            <span class="stat-label">Kostnad:</span>
            <span class="stat-value">${recipe.estimatedCost}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Portioner:</span>
            <span class="stat-value">${recipe.servings} st</span>
          </div>
          <div class="stat">
            <span class="stat-label">Svårighet:</span>
            <span class="stat-value">${recipe.difficulty}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Tid:</span>
            <span class="stat-value">${recipe.prepTime}</span>
          </div>
        </div>
      </div>

      <div class="ingredients-section">
        <h4 class="section-title">Ingredienser (${recipe.ingredients.length} st)</h4>
        <div class="ingredients-list">
          ${recipe.ingredients.map(ing =>
            `<div class="ingredient-item">
              <span class="ingredient-name">${ing.name}</span>
              <span class="ingredient-amount">${ing.quantity} ${ing.unit}</span>
            </div>`
          ).join('')}
        </div>
      </div>

      <div class="recipe-instructions">
        <h4 class="section-title">Tillagning</h4>
        <p class="instructions-text">${recipe.recipe.instructions}</p>
      </div>

      <div class="recipe-tags">
        ${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>

      <div class="card-action">
        <a href="../../?import=${encodeURIComponent(recipe.id)}" class="import-button">
          🍱 Använd i kalkylatorn
        </a>
      </div>
    </div>
  `
}

function groupRecipesByMealType(recipes) {
  const grouped = {
    breakfast: [],
    lunch: [],
    dinner: [],
    snack: []
  }

  recipes.forEach(recipe => {
    if (recipe.mealType) {
      recipe.mealType.forEach(mealType => {
        if (grouped[mealType]) {
          grouped[mealType].push(recipe)
        }
      })
    }
  })

  return grouped
}

function generateMealTypeSection(mealType, recipes, mealTypeNames) {
  if (recipes.length === 0) return ''

  const mealTypeName = mealTypeNames[mealType]
  const mealIcon = {
    breakfast: '🌅',
    lunch: '🥪',
    dinner: '🍽️',
    snack: '🍎'
  }[mealType]

  return `
    <div class="meal-type-section">
      <h2 class="meal-type-title">
        <span class="meal-icon">${mealIcon}</span>
        ${mealTypeName} (${recipes.length} recept)
      </h2>
      <div class="recipes-grid">
        ${recipes.map(recipe => generateRecipeCard(recipe)).join('\n')}
      </div>
    </div>
  `
}

function generateCategoryPage(category) {
  const recipes = getRecipesByCategory(category.id)
  const groupedRecipes = groupRecipesByMealType(recipes)

  const mealTypeNames = {
    breakfast: 'Frukost',
    lunch: 'Lunch',
    dinner: 'Middag',
    snack: 'Mellanmål'
  }

  // Generate sections for each meal type that has recipes
  const mealTypeSections = ['breakfast', 'lunch', 'dinner', 'snack']
    .map(mealType => generateMealTypeSection(mealType, groupedRecipes[mealType], mealTypeNames))
    .filter(section => section !== '')
    .join('\n')

  return `<!doctype html>
<html lang="sv">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="../../favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${category.seoTitle}</title>
    <meta name="description" content="${category.seoDescription}">
    <meta name="keywords" content="${category.slug}, recept, näringsberäkning, matplan, kalkylator, svenska recept">
    <link rel="canonical" href="https://joelfredriksson.com/projects/matladereknaren/inspiration/${category.slug}/">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://joelfredriksson.com/projects/matladereknaren/inspiration/${category.slug}/">
    <meta property="og:title" content="${category.seoTitle}">
    <meta property="og:description" content="${category.seoDescription}">
    <meta property="og:image" content="https://joelfredriksson.com/og-image.svg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://joelfredriksson.com/projects/matladereknaren/inspiration/${category.slug}/">
    <meta property="twitter:title" content="${category.seoTitle}">
    <meta property="twitter:description" content="${category.seoDescription}">
    <meta property="twitter:image" content="https://joelfredriksson.com/og-image.svg">

    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-MX68NQ0BPF"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-MX68NQ0BPF');
    </script>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "${category.name}",
      "description": "${category.seoDescription}",
      "url": "https://joelfredriksson.com/projects/matladereknaren/inspiration/${category.slug}/",
      "mainEntity": {
        "@type": "ItemList",
        "name": "${category.name}",
        "description": "${category.description}",
        "numberOfItems": ${recipes.length}
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Matplan",
            "item": "https://joelfredriksson.com/projects/matladereknaren/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Inspiration",
            "item": "https://joelfredriksson.com/projects/matladereknaren/inspiration/"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "${category.name}",
            "item": "https://joelfredriksson.com/projects/matladereknaren/inspiration/${category.slug}/"
          }
        ]
      }
    }
    </script>

    <style>
      body {
        font-family: Inter, system-ui, sans-serif;
        line-height: 1.6;
        margin: 0;
        padding: 0;
        background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
        min-height: 100vh;
      }
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
      }
      .header {
        background: white;
        border-radius: 16px;
        padding: 2rem;
        margin-bottom: 2rem;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        text-align: center;
      }
      .title {
        font-size: 2.5rem;
        font-weight: 700;
        color: #1f2937;
        margin: 0 0 1rem 0;
      }
      .subtitle {
        font-size: 1.2rem;
        color: #6b7280;
        margin-bottom: 2rem;
      }
      .content {
        background: white;
        border-radius: 16px;
        padding: 2rem;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        margin-bottom: 2rem;
      }
      .recipe-list {
        list-style: none;
        padding: 0;
        margin: 1rem 0;
      }
      .recipe-list li {
        padding: 0.75rem 0;
        border-bottom: 1px solid #f3f4f6;
      }
      .recipe-list li:last-child {
        border-bottom: none;
      }
      .cta-button {
        display: inline-block;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        text-decoration: none;
        font-weight: 600;
        font-size: 1.1rem;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        transition: all 0.2s;
      }
      .cta-button:hover {
        transform: translateY(-1px);
        box-shadow: 0 8px 16px -4px rgb(0 0 0 / 0.2);
      }
      .back-link {
        color: #10b981;
        text-decoration: none;
        font-weight: 500;
        margin-bottom: 1rem;
        display: inline-block;
      }
      .back-link:hover {
        color: #059669;
      }

      /* Meal Type Section Styles */
      .meal-type-section {
        margin: 3rem 0;
      }
      .meal-type-title {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 1.75rem;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 2rem;
        padding-bottom: 0.75rem;
        border-bottom: 3px solid #10b981;
      }
      .meal-icon {
        font-size: 2rem;
      }

      /* Recipe Card Styles */
      .recipes-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 2rem;
        margin-bottom: 2rem;
      }
      .recipe-card {
        background: white;
        border-radius: 16px;
        padding: 1.5rem;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        border: 2px solid;
        transition: all 0.3s;
      }
      .recipe-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px -4px rgb(0 0 0 / 0.1);
      }
      .card-header {
        margin-bottom: 1.5rem;
      }
      .card-title-row {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: 0.75rem;
      }
      .recipe-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #1f2937;
        margin: 0;
        flex: 1;
        margin-right: 1rem;
      }
      .category-badge {
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: uppercase;
      }
      .recipe-description {
        color: #6b7280;
        font-size: 0.875rem;
        margin-bottom: 1rem;
        line-height: 1.5;
      }
      .recipe-stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
        font-size: 0.75rem;
      }
      .stat {
        display: flex;
        flex-direction: column;
      }
      .stat-label {
        color: #9ca3af;
        font-weight: 500;
      }
      .stat-value {
        color: #1f2937;
        font-weight: 600;
        margin-top: 0.125rem;
      }
      .section-title {
        font-size: 0.875rem;
        font-weight: 600;
        color: #1f2937;
        margin: 0 0 0.75rem 0;
      }
      .ingredients-section {
        margin-bottom: 1.5rem;
      }
      .ingredients-list {
        font-size: 0.75rem;
      }
      .ingredient-item {
        display: flex;
        justify-content: space-between;
        padding: 0.25rem 0;
        border-bottom: 1px solid #f3f4f6;
      }
      .ingredient-item:last-child {
        border-bottom: none;
      }
      .ingredient-name {
        color: #374151;
      }
      .ingredient-amount {
        color: #9ca3af;
        font-weight: 500;
      }
      .recipe-instructions {
        margin-bottom: 1.5rem;
      }
      .instructions-text {
        color: #6b7280;
        font-size: 0.75rem;
        line-height: 1.6;
      }
      .recipe-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem;
        margin-bottom: 1.5rem;
      }
      .tag {
        background: #f3f4f6;
        color: #6b7280;
        padding: 0.25rem 0.5rem;
        border-radius: 8px;
        font-size: 0.75rem;
        font-weight: 500;
      }
      .card-action {
        padding-top: 1rem;
        border-top: 1px solid #f3f4f6;
        text-align: center;
      }
      .import-button {
        display: inline-block;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        font-size: 0.875rem;
        box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.1);
        transition: all 0.2s;
        margin: 0 auto;
        text-align: center;
      }
      .import-button:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 8px -2px rgb(0 0 0 / 0.1);
      }

      /* Color classes */
      .bg-blue-50 { background-color: #eff6ff; }
      .border-blue-200 { border-color: #bfdbfe; }
      .bg-blue-500 { background-color: #3b82f6; }
      .bg-red-50 { background-color: #fef2f2; }
      .border-red-200 { border-color: #fecaca; }
      .bg-red-500 { background-color: #ef4444; }
      .bg-yellow-50 { background-color: #fffbeb; }
      .border-yellow-200 { border-color: #fde68a; }
      .bg-yellow-500 { background-color: #eab308; }
      .bg-green-50 { background-color: #f0fdf4; }
      .border-green-200 { border-color: #bbf7d0; }
      .bg-green-500 { background-color: #22c55e; }
      .bg-emerald-50 { background-color: #ecfdf5; }
      .border-emerald-200 { border-color: #a7f3d0; }
      .bg-emerald-500 { background-color: #10b981; }
      .bg-purple-50 { background-color: #faf5ff; }
      .border-purple-200 { border-color: #e9d5ff; }
      .bg-purple-500 { background-color: #a855f7; }
    </style>
  </head>
  <body>
    <div class="container">
      <a href="../" class="back-link">← Tillbaka till alla kategorier</a>

      <div class="header">
        <h1 class="title">${category.name}</h1>
        <p class="subtitle">${category.description}</p>
        <a href="../../" class="cta-button">🍱 Öppna Matplan Kalkylator</a>
      </div>

      ${mealTypeSections}

      <div class="content">
        <p style="color: #6b7280; text-align: center;">
          <strong>Så fungerar det:</strong> Klicka på "🍱 Använd i kalkylatorn" på något av recepten ovan så öppnas kalkylatorn med alla ingredienser automatiskt tillagda.
          Näringsvärden och kostnader beräknas direkt åt dig!
        </p>
      </div>

      <!-- Footer -->
      <footer style="background: white; border-top: 1px solid #e5e7eb; margin-top: 4rem; border-radius: 16px;">
        <div style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
            <!-- Brand Section -->
            <div>
              <h3 style="color: #1f2937; font-size: 1.125rem; font-weight: 600; margin: 0 0 1rem 0;">Matplan</h3>
              <p style="color: #6b7280; font-size: 0.875rem; line-height: 1.5; margin: 0;">
                Beräkna näringsvärden för hela veckohandlingen och se hur många matlådor det blir.
                Enkelt, gratis och utan registrering.
              </p>
            </div>

            <!-- Links Section -->
            <div>
              <h4 style="color: #1f2937; font-size: 1rem; font-weight: 500; margin: 0 0 1rem 0;">Utforska</h4>
              <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <a href="../" style="color: #6b7280; text-decoration: none; font-size: 0.875rem; transition: color 0.2s;">Receptinspiration</a>
                <a href="../budget/" style="color: #6b7280; text-decoration: none; font-size: 0.875rem; transition: color 0.2s;">Budgetrecept</a>
                <a href="../fitness/" style="color: #6b7280; text-decoration: none; font-size: 0.875rem; transition: color 0.2s;">Fitnessrecept</a>
                <a href="../vegetariskt/" style="color: #6b7280; text-decoration: none; font-size: 0.875rem; transition: color 0.2s;">Vegetariska recept</a>
              </div>
            </div>

            <!-- Contact/Info Section -->
            <div>
              <h4 style="color: #1f2937; font-size: 1rem; font-weight: 500; margin: 0 0 1rem 0;">Om projektet</h4>
              <p style="color: #6b7280; font-size: 0.875rem; line-height: 1.5; margin: 0 0 0.75rem 0;">
                Skapat för att förenkla meal prep och veckoplanering av mat.
              </p>
              <a href="https://joelfredriksson.com" style="color: #10b981; text-decoration: none; font-size: 0.875rem; transition: color 0.2s;" target="_blank" rel="noopener noreferrer">
                Av Joel Fredriksson →
              </a>
            </div>
          </div>

          <!-- Bottom Section -->
          <div style="border-top: 1px solid #e5e7eb; padding-top: 1.5rem; display: flex; flex-direction: column; align-items: center; gap: 1rem;">
            <p style="color: #9ca3af; font-size: 0.875rem; margin: 0;">
              © ${new Date().getFullYear()} Matplan. Alla rättigheter förbehållna.
            </p>
            <div style="display: flex; align-items: center; gap: 1rem;">
              <span style="color: #9ca3af; font-size: 0.875rem;">Gjord med</span>
              <span style="color: #ef4444;">❤️</span>
              <span style="color: #9ca3af; font-size: 0.875rem;">i Sverige</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </body>
</html>`
}

// Create directories and generate pages
const distDir = join(__dirname, '../dist/inspiration')
mkdirSync(distDir, { recursive: true })

// Generate overview page
const overviewPage = `<!doctype html>
<html lang="sv">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="../favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Receptinspiration - Matplan</title>
    <meta name="description" content="Färdiga recept att importera direkt till näringskalkylatorn. Budget, fitness, familj, LCHF och vegetariska alternativ.">
    <link rel="canonical" href="https://joelfredriksson.com/projects/matladereknaren/inspiration/">

    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-MX68NQ0BPF"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-MX68NQ0BPF');
    </script>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <style>
      body {
        font-family: Inter, system-ui, sans-serif;
        line-height: 1.6;
        margin: 0;
        padding: 0;
        background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
        min-height: 100vh;
      }
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
      }
      .header {
        text-align: center;
        margin-bottom: 3rem;
      }
      .title {
        font-size: 3rem;
        font-weight: 700;
        color: #1f2937;
        margin: 0 0 1rem 0;
      }
      .subtitle {
        font-size: 1.2rem;
        color: #6b7280;
        margin-bottom: 2rem;
      }
      .categories {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
      }
      .category-card {
        background: white;
        border-radius: 16px;
        padding: 2rem;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        transition: all 0.3s;
        border: 2px solid transparent;
        text-align: center;
      }
      .category-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 24px -4px rgb(0 0 0 / 0.1);
        border-color: #10b981;
      }
      .category-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
        display: block;
      }
      .category-card h2 {
        margin: 0 0 1rem 0;
        color: #1f2937;
        font-size: 1.5rem;
        font-weight: 600;
      }
      .category-card a {
        text-decoration: none;
        color: inherit;
      }
      .category-card a:hover {
        color: #10b981;
      }
      .category-card p {
        color: #6b7280;
        margin-bottom: 1rem;
      }
      .recipe-count {
        background: #10b981;
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.875rem;
        font-weight: 500;
      }
      .back-link {
        display: inline-block;
        color: #10b981;
        text-decoration: none;
        font-weight: 500;
        margin-bottom: 2rem;
      }
      .back-link:hover {
        color: #059669;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <a href="../" class="back-link">← Tillbaka till kalkylatorn</a>

      <div class="header">
        <h1 class="title">💡 Receptinspiration</h1>
        <p class="subtitle">Välj den typ av mat som passar dig bäst</p>
      </div>

      <div class="categories">
        ${categories.map(cat => `
          <div class="category-card">
            <div class="category-icon">${cat.icon}</div>
            <h2><a href="${cat.slug}/">${cat.name}</a></h2>
            <p>${cat.description}</p>
            <span class="recipe-count">${getRecipesByCategory(cat.id).length} recept</span>
          </div>
        `).join('')}
      </div>

      <!-- Footer -->
      <footer style="background: white; border-top: 1px solid #e5e7eb; margin-top: 4rem; border-radius: 16px;">
        <div style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
            <!-- Brand Section -->
            <div>
              <h3 style="color: #1f2937; font-size: 1.125rem; font-weight: 600; margin: 0 0 1rem 0;">Matplan</h3>
              <p style="color: #6b7280; font-size: 0.875rem; line-height: 1.5; margin: 0;">
                Beräkna näringsvärden för hela veckohandlingen och se hur många matlådor det blir.
                Enkelt, gratis och utan registrering.
              </p>
            </div>

            <!-- Links Section -->
            <div>
              <h4 style="color: #1f2937; font-size: 1rem; font-weight: 500; margin: 0 0 1rem 0;">Utforska</h4>
              <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <a href="../" style="color: #6b7280; text-decoration: none; font-size: 0.875rem; transition: color 0.2s;">Kalkylator</a>
                <a href="budget/" style="color: #6b7280; text-decoration: none; font-size: 0.875rem; transition: color 0.2s;">Budgetrecept</a>
                <a href="fitness/" style="color: #6b7280; text-decoration: none; font-size: 0.875rem; transition: color 0.2s;">Fitnessrecept</a>
                <a href="vegetariskt/" style="color: #6b7280; text-decoration: none; font-size: 0.875rem; transition: color 0.2s;">Vegetariska recept</a>
              </div>
            </div>

            <!-- Contact/Info Section -->
            <div>
              <h4 style="color: #1f2937; font-size: 1rem; font-weight: 500; margin: 0 0 1rem 0;">Om projektet</h4>
              <p style="color: #6b7280; font-size: 0.875rem; line-height: 1.5; margin: 0 0 0.75rem 0;">
                Skapat för att förenkla meal prep och veckoplanering av mat.
              </p>
              <a href="https://joelfredriksson.com" style="color: #10b981; text-decoration: none; font-size: 0.875rem; transition: color 0.2s;" target="_blank" rel="noopener noreferrer">
                Av Joel Fredriksson →
              </a>
            </div>
          </div>

          <!-- Bottom Section -->
          <div style="border-top: 1px solid #e5e7eb; padding-top: 1.5rem; display: flex; flex-direction: column; align-items: center; gap: 1rem;">
            <p style="color: #9ca3af; font-size: 0.875rem; margin: 0;">
              © ${new Date().getFullYear()} Matplan. Alla rättigheter förbehållna.
            </p>
            <div style="display: flex; align-items: center; gap: 1rem;">
              <span style="color: #9ca3af; font-size: 0.875rem;">Gjord med</span>
              <span style="color: #ef4444;">❤️</span>
              <span style="color: #9ca3af; font-size: 0.875rem;">i Sverige</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </body>
</html>`

writeFileSync(join(distDir, 'index.html'), overviewPage)

// Generate individual category pages
categories.forEach(category => {
  const categoryDir = join(distDir, category.slug)
  mkdirSync(categoryDir, { recursive: true })

  const pageContent = generateCategoryPage(category)
  writeFileSync(join(categoryDir, 'index.html'), pageContent)

  console.log(`Generated: /inspiration/${category.slug}/`)
})

// Generate calorie calculator static page
function generateCalorieCalculatorPage() {
  return `<!doctype html>
<html lang="sv">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="../favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Kaloriräknare - Matplan</title>
    <meta name="description" content="Beräkna dina personliga kaloriemål baserat på din kropp och dina mål. BMR, TDEE och veckomål för effektiv meal prep-planering.">
    <meta name="keywords" content="kaloriräknare, BMR, TDEE, kaloriemål, näringsberäkning, meal prep, svenska">
    <link rel="canonical" href="https://joelfredriksson.com/projects/matladereknaren/kalorirakn are/">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://joelfredriksson.com/projects/matladereknaren/kalorirakn are/">
    <meta property="og:title" content="Kaloriräknare - Matplan">
    <meta property="og:description" content="Beräkna dina personliga kaloriemål baserat på din kropp och dina mål. BMR, TDEE och veckomål för meal prep.">
    <meta property="og:image" content="https://joelfredriksson.com/og-image.svg">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://joelfredriksson.com/projects/matladereknaren/kalorirakn are/">
    <meta property="twitter:title" content="Kaloriräknare - Matplan">
    <meta property="twitter:description" content="Beräkna dina personliga kaloriemål baserat på din kropp och dina mål.">

    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-MX68NQ0BPF"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-MX68NQ0BPF');
    </script>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <style>
      body {
        font-family: Inter, system-ui, sans-serif;
        line-height: 1.6;
        margin: 0;
        padding: 0;
        background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
        min-height: 100vh;
      }
      .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
      }
      .header {
        text-align: center;
        margin-bottom: 3rem;
      }
      .title {
        font-size: 3rem;
        font-weight: 700;
        color: #1f2937;
        margin: 0 0 1rem 0;
      }
      .subtitle {
        font-size: 1.2rem;
        color: #6b7280;
        margin-bottom: 2rem;
      }
      .calculator-card {
        background: white;
        border-radius: 16px;
        padding: 3rem;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        border: 2px solid #e5e7eb;
        text-align: center;
      }
      .features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin: 3rem 0;
      }
      .feature {
        text-align: center;
        padding: 1.5rem;
        background: white;
        border-radius: 12px;
        box-shadow: 0 2px 4px rgb(0 0 0 / 0.05);
      }
      .feature-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }
      .cta-button {
        display: inline-block;
        background: #10b981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        text-decoration: none;
        font-weight: 600;
        font-size: 1.1rem;
        margin: 2rem 0;
        transition: all 0.3s;
      }
      .cta-button:hover {
        background: #059669;
        transform: translateY(-2px);
      }
      .back-link {
        display: inline-block;
        color: #10b981;
        text-decoration: none;
        font-weight: 500;
        margin-bottom: 2rem;
      }
      .back-link:hover {
        color: #059669;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <a href="../" class="back-link">← Tillbaka till kalkylatorn</a>

      <div class="header">
        <h1 class="title">🎯 Kaloriräknare</h1>
        <p class="subtitle">Beräkna dina personliga kaloriemål baserat på din kropp och dina mål</p>
      </div>

      <div class="calculator-card">
        <h2 style="color: #1f2937; margin-bottom: 1.5rem;">Professionell näringsberäkning</h2>
        <p style="color: #6b7280; margin-bottom: 2rem;">
          Använd vår avancerade kaloriräknare för att få personliga rekommendationer
          baserat på din ålder, vikt, längd, aktivitetsnivå och mål.
        </p>

        <a href="../?calculator=true" class="cta-button">
          🧮 Öppna kaloriräknaren
        </a>

        <p style="color: #9ca3af; font-size: 0.9rem; margin-top: 1rem;">
          Resultatet visar veckomål för flexibel meal prep-planering
        </p>
      </div>

      <div class="features">
        <div class="feature">
          <div class="feature-icon">⚖️</div>
          <h3 style="color: #1f2937; margin-bottom: 1rem;">BMR Beräkning</h3>
          <p style="color: #6b7280; font-size: 0.9rem;">
            Basalomsättning enligt Mifflin-St Jeor ekvationen för exakta resultat
          </p>
        </div>

        <div class="feature">
          <div class="feature-icon">🏃‍♂️</div>
          <h3 style="color: #1f2937; margin-bottom: 1rem;">Aktivitetsnivå</h3>
          <p style="color: #6b7280; font-size: 0.9rem;">
            5 olika aktivitetsnivåer från stillasittande till mycket aktiv
          </p>
        </div>

        <div class="feature">
          <div class="feature-icon">🎯</div>
          <h3 style="color: #1f2937; margin-bottom: 1rem;">Personliga Mål</h3>
          <p style="color: #6b7280; font-size: 0.9rem;">
            Kaloriunderskott, överskott eller vikthållning med makronäringsfördelning
          </p>
        </div>

        <div class="feature">
          <div class="feature-icon">📊</div>
          <h3 style="color: #1f2937; margin-bottom: 1rem;">Veckomål</h3>
          <p style="color: #6b7280; font-size: 0.9rem;">
            Flexibla veckomål istället för dagliga för enklare meal prep-planering
          </p>
        </div>
      </div>

      <!-- Footer -->
      <footer style="background: white; border-top: 1px solid #e5e7eb; margin-top: 4rem; border-radius: 16px;">
        <div style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
            <!-- Brand Section -->
            <div>
              <h3 style="color: #1f2937; font-size: 1.125rem; font-weight: 600; margin: 0 0 1rem 0;">Matplan</h3>
              <p style="color: #6b7280; font-size: 0.875rem; line-height: 1.5; margin: 0;">
                Beräkna näringsvärden för hela veckohandlingen och se hur många matlådor det blir.
                Enkelt, gratis och utan registrering.
              </p>
            </div>

            <!-- Links Section -->
            <div>
              <h4 style="color: #1f2937; font-size: 1rem; font-weight: 500; margin: 0 0 1rem 0;">Utforska</h4>
              <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <a href="../" style="color: #6b7280; text-decoration: none; font-size: 0.875rem; transition: color 0.2s;">Kalkylator</a>
                <a href="../inspiration/" style="color: #6b7280; text-decoration: none; font-size: 0.875rem; transition: color 0.2s;">Receptinspiration</a>
                <a href="../inspiration/budget/" style="color: #6b7280; text-decoration: none; font-size: 0.875rem; transition: color 0.2s;">Budgetrecept</a>
                <a href="../inspiration/fitness/" style="color: #6b7280; text-decoration: none; font-size: 0.875rem; transition: color 0.2s;">Fitnessrecept</a>
              </div>
            </div>

            <!-- Contact/Info Section -->
            <div>
              <h4 style="color: #1f2937; font-size: 1rem; font-weight: 500; margin: 0 0 1rem 0;">Om projektet</h4>
              <p style="color: #6b7280; font-size: 0.875rem; line-height: 1.5; margin: 0 0 0.75rem 0;">
                Skapat för att förenkla meal prep och veckoplanering av mat.
              </p>
              <a href="https://joelfredriksson.com" style="color: #10b981; text-decoration: none; font-size: 0.875rem; transition: color 0.2s;" target="_blank" rel="noopener noreferrer">
                Av Joel Fredriksson →
              </a>
            </div>
          </div>

          <!-- Bottom Section -->
          <div style="border-top: 1px solid #e5e7eb; padding-top: 1.5rem; display: flex; flex-direction: column; align-items: center; gap: 1rem;">
            <p style="color: #9ca3af; font-size: 0.875rem; margin: 0;">
              © 2025 Matplan. Alla rättigheter förbehållna.
            </p>
            <div style="display: flex; align-items: center; gap: 1rem;">
              <span style="color: #9ca3af; font-size: 0.875rem;">Gjord med</span>
              <span style="color: #ef4444;">❤️</span>
              <span style="color: #9ca3af; font-size: 0.875rem;">i Sverige</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </body>
</html>`
}

// Generate calorie calculator page
const calculatorDir = join(distDir, 'kalorirakn are')
mkdirSync(calculatorDir, { recursive: true })
const calculatorPageContent = generateCalorieCalculatorPage()
writeFileSync(join(calculatorDir, 'index.html'), calculatorPageContent)
console.log('Generated: /kalorirakn are/')

console.log('✅ All category pages generated successfully!')