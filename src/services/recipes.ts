import { http } from '@/services/http';
import { Recipe } from '@/services/types';
import { RecipeFormData } from '@/components/FromRecipe/FormRecipe';

// Constants
const CACHE_KEY = 'recipesCache';
const CACHE_TIMESTAMP_KEY = 'recipesCacheTimestamp';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

// Helper function to get cached data
const getCachedData = () => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  const cacheTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

  if (cachedData && cacheTimestamp) {
    const now = Date.now();
    const timestamp = parseInt(cacheTimestamp, 10);

    // Check if cached data is still within the valid duration
    if (now - timestamp < CACHE_DURATION) {
      return JSON.parse(cachedData) as Recipe[];
    }
  }
  return null;
};

// Helper function to set cached data
const setCachedData = (data: Recipe[]) => {
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
};

// Get all recipes with caching
export const getRecipes = async () => {
  console.log("in getRecipes");

  // Try to get cached data
  const cachedRecipes = getCachedData();
  if (cachedRecipes) {
    return cachedRecipes;
  }

  // If no valid cached data, fetch from the server
  try {
    const response = await http.get('');
    const recipes = response.data;
    setCachedData(recipes);
    return recipes;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Get specific recipe
export const getOneRecipe = async (idRecipe: string) => {
  try {
    const response = await http.get(`/${idRecipe}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    throw error;
  }
};

// Post recipe
export const postRecipe = async (newRecipe: RecipeFormData) => {
  try {
    const response = await http.post('/', newRecipe);
    return response.data;
  } catch (error) {
    console.error('Error posting recipe:', error);
    throw error;
  }
};


//Before cach

// import { http } from '@/services/http';
// import { Recipe } from '@/services/types'
// import  {RecipeFormData}   from '@/components/FromRecipe/FormRecipe'

// // get all the recipes
// export const getRecipes = async () => {
//     console.log("in getRecipes");
//     try {
//         const response = await http.get('');
//         return response.data; 
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error; 
//     }
// };

// //get specific recipe
// export const getOneRecipe = async (idRecipe:string) => {
//     try {
//         const response = await http.get(`/${idRecipe}`);
//         return response.data; 
//     } catch (error) {
//         console.error('Error fetching recipe:', error);
//         throw error; 
//     }
// };

// // Post recipe
// export const postRecipe = async (newRecipe: RecipeFormData) => {
//     try {
//         const response = await http.post('/',newRecipe);
//         return response.data; 
//     } catch (error) {
//         console.error('Error posting recipe:', error); 
//         throw error; 
//     }
// };
