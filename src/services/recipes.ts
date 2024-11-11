import { http } from '@/services/http';
import { Recipe } from '@/services/types'
import { RecipeFormData } from '@/components/FromRecipe/FormRecipe'

// get all the recipes
export const getRecipes = async () => {
    console.log("in getRecipes");
    try {
        const response = await http.get('');
        return response.data; 
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; 
    }
};

//get specific recipe
export const getOneRecipe = async (idRecipe:string) => {
    try {
        const response = await http.get(`/${idRecipe}`);
        return response.data; 
    } catch (error) {
        console.error('Error fetching recipe:', error);
        throw error; 
    }
};

// Post recipe
export const postRecipe = async (newRecipe:RecipeFormData) => {
    try {
        const response = await http.post('/',newRecipe);
        return response.data; 
    } catch (error) {
        console.error('Error posting recipe:', error); 
        throw error; 
    }
};




