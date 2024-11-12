'use client'
import React, { useState } from 'react';
import styles from './recipeCard.module.css';
import { FaRegStar, FaStar } from "react-icons/fa";


// types.ts
export type Recipe = {
    id: string;
    nameRcipe: string;
    category: string;
    image: string; // URL as a string
    ingredients: string[]; // Array of ingredient strings
    preparationInstructions: string; // Instructions as a single string, or array if multiple steps
};

function RecipeCard({ recipe }: { recipe: Recipe }) {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        // const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        // console.log(favorites);
        // favorites.push(recipe.id);
        // console.log(favorites);
        // localStorage.setItem('favorites', favorites);
        localStorage.setItem(`${recipe.id}-is-favorite`, JSON.stringify(!isFavorite));
        setIsFavorite(!isFavorite);
    };

    return (
        <div className={styles.card}>

            <img src={recipe.image} />
            <div className={styles.cardContent}>
                <p className={styles.cardName}>{recipe.nameRcipe}</p>
                <p className={styles.cardCategory}>{recipe.category}</p>
                <p className={styles.cardDescription}>{recipe.preparationInstructions}</p>
                <button className={styles.infoButton}>More Info</button>
                <button onClick={toggleFavorite}>
                    {isFavorite ? <FaStar className={styles.starIcon} /> : <FaRegStar className={styles.starIcon} />}
                </button>

            </div>
        </div>
    );
}

export default RecipeCard;