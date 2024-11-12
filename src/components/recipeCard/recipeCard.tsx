'use client'
import React, { useState } from 'react';
import styles from './recipeCard.module.css';
import { FaRegStar, FaStar } from "react-icons/fa";
import { Recipe } from "../../services/types"


function RecipeCard({ recipe }: { recipe: Recipe }) {
    const [isFavorite, setIsFavorite] = useState(Boolean(localStorage.getItem(`${recipe._id}-is-favorite`)));

    const toggleFavorite = () => {
        localStorage.setItem(`${recipe._id}-is-favorite`, JSON.stringify(!isFavorite));
        setIsFavorite(!isFavorite);
    };

    return (
        <div className={styles.card}>

            <img src={recipe.image} />
            <div className={styles.cardContent}>
                <p className={styles.cardName}>{recipe.nameRecipe}</p>
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