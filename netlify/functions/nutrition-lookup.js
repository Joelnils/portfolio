const https = require('https');

// Helper function to make HTTPS requests
const makeRequest = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed);
        } catch (error) {
          reject(new Error('Failed to parse JSON response'));
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
};

// Swedish to English translation mapping for common ingredients
const swedishToEnglish = {
  // Basic proteins
  'ägg': 'eggs',
  'kyckling': 'chicken',
  'kycklingfilé': 'chicken breast',
  'kycklingfärs': 'chicken mince',
  'köttfärs': 'ground beef',
  'nötkött': 'beef',
  'fläskkött': 'pork',
  'fisk': 'fish',
  'lax': 'salmon',

  // Grains and starches
  'ris': 'rice',
  'pasta': 'pasta',
  'potatis': 'potato',
  'bröd': 'bread',
  'havre': 'oats',
  'havregryn': 'oats',
  'quinoa': 'quinoa',

  // Vegetables
  'tomat': 'tomato',
  'lök': 'onion',
  'vitlök': 'garlic',
  'morötter': 'carrots',
  'broccoli': 'broccoli',
  'spenat': 'spinach',
  'krossade tomater': 'crushed tomatoes',
  'frysta grönsaker': 'frozen vegetables',

  // Fruits
  'äpple': 'apple',
  'banan': 'banana',
  'banan mogen': 'banana ripe',
  'avokado': 'avocado',

  // Dairy and alternatives
  'mjölk': 'milk',
  'smör': 'butter',
  'ost': 'cheese',
  'grädde': 'cream',
  'yoghurt': 'yogurt',
  'havredryck': 'oat milk',
  'havredryck vanilj': 'oat milk vanilla',
  'havredryck naturell': 'oat milk plain',

  // Oils and fats
  'olivolja': 'olive oil',
  'rapsolja': 'canola oil',
  'kokosolja': 'coconut oil',

  // Legumes and nuts
  'bönor': 'beans',
  'linser': 'lentils',
  'mandel': 'almonds',
  'nötter': 'nuts',
  'cashewnötter': 'cashews',
  'jordnötter': 'peanuts',

  // Baking and spices
  'bakpulver': 'baking powder',
  'bikarbonat': 'baking soda',
  'salt': 'salt',
  'socker': 'sugar',
  'brun farin': 'brown sugar',
  'strösocker': 'granulated sugar',
  'kanel': 'cinnamon',
  'vaniljsås': 'vanilla sauce',
  'vanilj': 'vanilla',
  'kardemumma': 'cardamom',
  'kryddor': 'spices',

  // Common recipe ingredients
  'tomatpuré': 'tomato paste',
  'kokosmjölk': 'coconut milk',
  'citron': 'lemon',
  'lime': 'lime',
  'ingefära': 'ginger',
  'chili': 'chili',
  'paprikapulver': 'paprika powder',
  'currypulver': 'curry powder',
  'honung': 'honey',
  'sirap': 'syrup',
  'jäst': 'yeast'
};

// Search for food items in Livsmedelsverket database
const searchFood = async (query) => {
  try {
    // Using the new Livsmedelsverket API endpoint
    const searchUrl = `https://dataportal.livsmedelsverket.se/livsmedel/api/v1/livsmedel?namn=${encodeURIComponent(query)}`;
    const response = await makeRequest(searchUrl);
    
    if (response && response.length > 0) {
      // Return the first match
      return response[0];
    }
    
    return null;
  } catch (error) {
    console.error('Search error:', error);
    return null;
  }
};

// Get nutrition data for a specific food item from Livsmedelsverket
const getNutritionData = async (foodId) => {
  try {
    const nutritionUrl = `https://dataportal.livsmedelsverket.se/livsmedel/api/v1/livsmedel/${foodId}/naringsvarden`;
    const response = await makeRequest(nutritionUrl);

    if (response && response.length > 0) {
      // Convert the nutrition array to a more usable format
      const nutritionMap = {};
      response.forEach(item => {
        nutritionMap[item.naringsAmne] = {
          value: item.varde,
          unit: item.enhet
        };
      });

      return nutritionMap;
    }

    return null;
  } catch (error) {
    console.error('Nutrition data error:', error);
    return null;
  }
};

// Search for food items in USDA database
const searchUSDAFood = async (query) => {
  try {
    const searchUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&api_key=DEMO_KEY&pageSize=1&dataType=SR%20Legacy,Foundation`;
    const response = await makeRequest(searchUrl);

    if (response && response.foods && response.foods.length > 0) {
      // Return the first high-quality match (prefer SR Legacy or Foundation data)
      const food = response.foods[0];

      // Extract nutrition data directly from the search results
      const nutritionMap = {};
      if (food.foodNutrients) {
        food.foodNutrients.forEach(nutrient => {
          // Map USDA nutrient names to our expected format
          switch (nutrient.nutrientName) {
            case 'Energy':
              if (nutrient.unitName === 'KCAL') {
                nutritionMap.kcal = nutrient.value || 0;
              }
              break;
            case 'Protein':
              nutritionMap.protein = nutrient.value || 0;
              break;
            case 'Carbohydrate, by difference':
              nutritionMap.carbs = nutrient.value || 0;
              break;
            case 'Total lipid (fat)':
              nutritionMap.fat = nutrient.value || 0;
              break;
          }
        });
      }

      // Ensure we have at least basic nutrition data
      if (nutritionMap.kcal !== undefined || nutritionMap.protein !== undefined) {
        return {
          name: food.description,
          nutrition: {
            kcal: nutritionMap.kcal || 0,
            protein: nutritionMap.protein || 0,
            carbs: nutritionMap.carbs || 0,
            fat: nutritionMap.fat || 0,
            per100g: true
          }
        };
      }
    }

    return null;
  } catch (error) {
    console.error('USDA search error:', error);
    return null;
  }
};

// Try to translate Swedish ingredient to English
const translateIngredient = (query) => {
  const lowerQuery = query.toLowerCase().trim();

  // Check for exact matches first
  if (swedishToEnglish[lowerQuery]) {
    return swedishToEnglish[lowerQuery];
  }

  // Check for partial matches (e.g., "kycklingfilé med kryddor" -> "chicken breast")
  for (const [swedish, english] of Object.entries(swedishToEnglish)) {
    if (lowerQuery.includes(swedish)) {
      return english;
    }
  }

  // Return original if no translation found
  return query;
};

// Main handler function
exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow GET and POST methods
  if (event.httpMethod !== 'GET' && event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    let query;
    
    if (event.httpMethod === 'GET') {
      query = event.queryStringParameters?.q;
    } else {
      const body = JSON.parse(event.body || '{}');
      query = body.query;
    }

    if (!query || query.trim() === '') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Query parameter is required' })
      };
    }

    const searchQuery = query.trim();

    // Step 1: Try Livsmedelsverket first (Swedish database)
    let result = null;
    let dataSource = 'Unknown';

    const foodItem = await searchFood(searchQuery);

    if (foodItem) {
      const nutritionData = await getNutritionData(foodItem.id);

      if (nutritionData) {
        // Convert Livsmedelsverket data to our standard format
        const standardizedData = {
          kcal: nutritionData['Energi (kcal)']?.value || 0,
          protein: nutritionData['Protein']?.value || 0,
          carbs: nutritionData['Kolhydrater']?.value || 0,
          fat: nutritionData['Fett']?.value || 0,
          per100g: true
        };

        result = {
          success: true,
          data: standardizedData,
          foodName: foodItem.namn,
          source: 'Livsmedelsverket',
          foodId: foodItem.id
        };
        dataSource = 'Livsmedelsverket';
      }
    }

    // Step 2: If Livsmedelsverket failed, try USDA with translation
    if (!result) {
      console.log(`Livsmedelsverket failed for "${searchQuery}", trying USDA...`);

      // Try with English translation first
      const translatedQuery = translateIngredient(searchQuery);
      let usdaResult = null;

      if (translatedQuery !== searchQuery) {
        console.log(`Translated "${searchQuery}" to "${translatedQuery}"`);
        usdaResult = await searchUSDAFood(translatedQuery);
      }

      // If translation didn't work, try original query
      if (!usdaResult) {
        usdaResult = await searchUSDAFood(searchQuery);
      }

      if (usdaResult) {
        result = {
          success: true,
          data: usdaResult.nutrition,
          foodName: usdaResult.name,
          source: 'USDA FoodData Central',
          originalQuery: searchQuery,
          translatedQuery: translatedQuery !== searchQuery ? translatedQuery : undefined
        };
        dataSource = 'USDA';
      }
    }

    // Step 3: Return result or error
    if (result) {
      console.log(`Successfully found data from ${dataSource} for "${searchQuery}"`);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result)
      };
    } else {
      console.log(`No data found for "${searchQuery}" in any database`);
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Livsmedel ej hittat i någon databas',
          query: searchQuery,
          tried: ['Livsmedelsverket', 'USDA FoodData Central']
        })
      };
    }

  } catch (error) {
    console.error('Function error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false,
        error: 'Serverfel vid hämtning av data',
        details: error.message 
      })
    };
  }
};