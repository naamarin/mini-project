'use client'
import React, { useState } from 'react';
import styles from './recipeCard.module.css';
import { FaRegStar, FaStar } from "react-icons/fa";


// types.ts
export type Recipe = {
    id: string;
    name: string;
    category: string;
    image: string; // URL as a string
    ingredients: string[]; // Array of ingredient strings
    instructions: string; // Instructions as a single string, or array if multiple steps
};


function RecipeCard({ recipe }: { recipe: Recipe }) {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <div className={styles.card}>

            <img src={recipe.image} />
            <div className={styles.cardContent}>
                <p className={styles.cardName}>{recipe.name}</p>
                <p className={styles.cardCategory}>{recipe.category}</p>
                <p className={styles.cardDescription}>{recipe.instructions}</p>
                <button className={styles.infoButton}>More Info</button>
                <button onClick={toggleFavorite}>
                    {isFavorite ? <FaRegStar className={styles.starIcon} /> : <FaStar className={styles.starIcon} />}
                </button>

            </div>
        </div>
    );
}

export default RecipeCard;