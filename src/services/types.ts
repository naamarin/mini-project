import { ObjectId } from "mongodb";

export interface Recipe {
    _id: ObjectId;
    nameRecipe: string;
    category: string;
    image: string;
    ingredients: Array<{ name: string; quantity: string }>;
    preparationInstructions: string;
}



