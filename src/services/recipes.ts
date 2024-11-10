import { http } from '@/services/http';
import { Recipe } from '@/services/http'

// get all the recipes
export const getRecipes = async () => {
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
export const postRecipe = async (newRecipe:Recipe) => {
    try {
        const response = await http.post(newRecipe);
        return response.data; 
    } catch (error) {
        console.error('Error posting recipe:', error); 
        throw error; 
    }
};

// update recipe
export const updateRecipe = async (updateRecipe:Recipe) => {
    try {
        const response = await http.patch(updateRecipe);
        return response.data; 
    } catch (error) {
        console.error('Error updating recipe:', error);
        throw error; 
    }
};


// delete recipe
export const deleteRecipe = async (idRecipe:string) => {
    try {
        const response = await http.delete(`/${idRecipe}`); 
        return response.data; 
    } catch (error) {
        console.error('Error deleting card:', error); 
        throw error; 
    }
};

