import { ObjectId } from "mongodb";

export interface Recipe {
    _id: ObjectId;
    nameRcipe: string;
    category: string;
    image: number;
    ingredients:  Array<{ name: string; quantity: string }>;
    preparationInstructions: string;
}


  
