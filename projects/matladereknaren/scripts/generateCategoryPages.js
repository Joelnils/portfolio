import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Category definitions with SEO data
const categories = [
  {
    id: 'budget',
    name: 'Budgetrecept',
    description: 'Näringsrik mat utan att spendera för mycket',
    slug: 'budget',
    seoTitle: 'Budgetrecept - Matplan Näringsberäkning',
    seoDescription: 'Billiga och näringsrika recept för den som vill äta bra utan att spendera för mycket. Importera ingredienser direkt.',
    recipes: [
      'Kyckling och ris med grönsaker - 6 portioner (~80-100 kr)',
      'Enkel pastasås med kött - 5 portioner (~60-80 kr)',
      'Näringsrik äggomelett - 4 portioner (~40-50 kr)'
    ]
  },
  {
    id: 'fitness',
    name: 'Fitness & Protein',
    description: 'För dig som tränar och vill maximera protein',
    slug: 'fitness',
    seoTitle: 'Proteinrika Recept för Träning - Matplan',
    seoDescription: 'Proteinrika recept perfekta för träning och muskelbygge. Omega-3, quinoa och magert kött med näringsberäkning.',
    recipes: [
      'Bakad lax med quinoa och broccoli - 4 portioner (~150-180 kr)',
      'Kycklingwok med spenat och sötpotatis - 5 portioner (~90-110 kr)',
      'Proteinrik äggröra med keso - 3 portioner (~50-65 kr)'
    ]
  },
  {
    id: 'familj',
    name: 'Familjerecept',
    description: 'Barnvänliga rätter hela familjen gillar',
    slug: 'familj',
    seoTitle: 'Barnvänliga Familjerecept - Matplan',
    seoDescription: 'Enkla recept som hela familjen gillar. Klassiska rätter barn älskar med näringsberäkning och kostnader.',
    recipes: [
      'Krämig korvgryta med potatis - 6 portioner (~80-100 kr)',
      'Fiskpinnar med potatismos och ärtor - 4 portioner (~60-75 kr)'
    ]
  },
  {
    id: 'lchf',
    name: 'LCHF & Keto',
    description: 'Låg kolhydrat, hög fett',
    slug: 'lchf',
    seoTitle: 'LCHF & Keto Recept - Matplan Kalkylator',
    seoDescription: 'Låg kolhydrat recept för LCHF och keto-dieter. Beräkna näringsvärden och kostnader för ketogena måltider.',
    recipes: [
      'Krämig laxsallad med avokado - 4 portioner (~120-140 kr)',
      'Kycklinggratäng med broccoli - 5 portioner (~100-120 kr)'
    ]
  },
  {
    id: 'vegetariskt',
    name: 'Vegetariska Recept',
    description: 'Växtbaserad näring',
    slug: 'vegetariskt',
    seoTitle: 'Vegetariska Recept - Matplan Näringsberäkning',
    seoDescription: 'Vegetariska och veganska recept med hög proteinandel. Linser, quinoa och växtbaserad näring med kalkylator.',
    recipes: [
      'Kryddig röd linsgryta med kokosmjölk - 6 portioner (~70-90 kr)',
      'Färgglad quinoa-bowl med tahini - 4 portioner (~80-100 kr)'
    ]
  },
  {
    id: 'snabbt',
    name: 'Snabba Måltider',
    description: 'Under 20 minuter',
    slug: 'snabbt',
    seoTitle: 'Snabba Recept Under 20 Min - Matplan',
    seoDescription: 'Snabba och enkla recept som tillagas på under 20 minuter. Perfekt för vardagen med näringsberäkning.',
    recipes: [
      'Snabb äggröra med skinka och ost - 2 portioner (~40-50 kr) - 10 min',
      'Pastasallad med färdig pesto - 4 portioner (~60-75 kr) - 15 min'
    ]
  }
]

function generateCategoryPage(category) {
  const recipeList = category.recipes.map(recipe => `<li class="text-gray-700">${recipe}</li>`).join('\n        ')

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
        "numberOfItems": ${category.recipes.length}
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
    </style>
  </head>
  <body>
    <div class="container">
      <a href="../" class="back-link">← Tillbaka till alla kategorier</a>

      <div class="header">
        <h1 class="title">${category.name}</h1>
        <p class="subtitle">${category.description}</p>
        <a href="../" class="cta-button">🍱 Öppna Matplan Kalkylator</a>
      </div>

      <div class="content">
        <h2 style="color: #1f2937; margin-top: 0;">Recept i denna kategori:</h2>
        <ul class="recipe-list">
        ${recipeList}
        </ul>

        <p style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #f3f4f6; color: #6b7280;">
          <strong>Så fungerar det:</strong> Öppna kalkylatorn ovan och klicka på "💡 Inspiration" för att importera något av dessa recept direkt.
          Alla ingredienser läggs automatiskt till och näringsvärden beräknas åt dig!
        </p>
      </div>
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
      }
      .category-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 24px -4px rgb(0 0 0 / 0.1);
        border-color: #10b981;
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
            <h2><a href="${cat.slug}/">${cat.name}</a></h2>
            <p>${cat.description}</p>
            <span class="recipe-count">${cat.recipes.length} recept</span>
          </div>
        `).join('')}
      </div>
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

console.log('✅ All category pages generated successfully!')