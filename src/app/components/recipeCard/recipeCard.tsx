'use client'
import React from 'react';
import styles from './recipeCard.module.css';


// types.ts
export type Recipe = {
    id: string;
    name: string;
    category: string;
    image: string; // URL as a string
    ingredients: string[]; // Array of ingredient strings
    instructions: string; // Instructions as a single string, or array if multiple steps
};


function RecipeCard(recipe: Recipe) {
    console.log(recipe, );
    return (
        <div className={styles.card}>

            <img src={recipe.image} />
            <div className={styles.cardContent}>
                <p className={styles.cardTitle}>{recipe.name}</p>
                <p className={styles.cardTitle}>{recipe.category}</p>
                <p className={styles.cardDescription}>{recipe.instructions}</p>
            </div>
        </div>
    );
}

export default RecipeCard;