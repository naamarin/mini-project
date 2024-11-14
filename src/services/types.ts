import { ObjectId } from "mongodb";
import { z } from 'zod';
import categoriesStore from '@/store/categoriesStore';

export interface Recipe {
    _id: ObjectId;
    nameRecipe: string;
    category: string;
    image: string;
    ingredients: Array<{ name: string; quantity: string }>;
    preparationInstructions: string;
}

export const recipeSchema = z.object({
    nameRecipe: z.string().min(1, "You need to write the recipe name"),
    category: z.string()
    .min(1, "You need to choose a category")
    .refine(
        (val) => categoriesStore.getState().categories.includes(val),
        "Selected category is not valid"
    ),
      image: z.string().url("You need enter a URL of the recipe"),
      ingredients: z
        .array(
          z.object({
            name: z.string().min(1, "Ingredient name is required"),
            quantity: z.string().min(1, "Ingredient quantity is required"),
          })
        )
        .min(1, "You need to enter at least one ingredient"),
        preparationInstructions: z.string().min(1, "You need to enter instructions"),
    });
  
export type RecipeFormData = z.infer<typeof recipeSchema>;