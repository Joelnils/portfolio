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

// Get nutrition data for a specific food item
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

    // Search for the food item
    const foodItem = await searchFood(query.trim());
    
    if (!foodItem) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ 
          success: false,
          error: 'Livsmedel ej hittat i databasen',
          query: query 
        })
      };
    }

    // Get nutrition data
    const nutritionData = await getNutritionData(foodItem.id);
    
    if (!nutritionData) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ 
          success: false,
          error: 'Näringsdata ej tillgänglig',
          query: query 
        })
      };
    }

    // Convert to our expected format
    const standardizedData = {
      kcal: nutritionData['Energi (kcal)']?.value || 0,
      protein: nutritionData['Protein']?.value || 0,
      carbs: nutritionData['Kolhydrater']?.value || 0,
      fat: nutritionData['Fett']?.value || 0,
      per100g: true
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: standardizedData,
        foodName: foodItem.namn,
        source: 'Livsmedelsverket',
        foodId: foodItem.id
      })
    };

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