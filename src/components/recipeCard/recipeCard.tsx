'use client'
import React, { useState, Dispatch, SetStateAction } from 'react';
import styles from './recipeCard.module.css';
import { FaRegStar, FaStar } from "react-icons/fa";
import { Recipe } from '@/services/types';

interface recipeCardProps {
    recipe: Recipe;
    setIsPopUp: Dispatch<SetStateAction<boolean>>;
    setSelectedRecipe: React.Dispatch<React.SetStateAction<Recipe | null>>;  
  }

const RecipeCard: React.FC<recipeCardProps> = ({ recipe, setIsPopUp, setSelectedRecipe }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        localStorage.setItem(`${recipe._id}-is-favorite`, JSON.stringify(!isFavorite));
        setIsFavorite(!isFavorite);
    };

    const showPopUp = () => {
        setSelectedRecipe(recipe);  
        setIsPopUp(true);        
      };

    return (

        <div className={styles.card}>

            <img src={recipe.image} />
            <div className={styles.cardContent}>
                <p className={styles.cardName}>{recipe.nameRecipe}</p>
                <p className={styles.cardCategory}>{recipe.category}</p>
                <p className={styles.cardDescription}>{recipe.preparationInstructions}</p>
                <button className={styles.infoButton} onClick={showPopUp}>More Info</button>
                <button onClick={toggleFavorite}>
                    {isFavorite ? <FaStar className={styles.starIcon} /> : <FaRegStar className={styles.starIcon} />}
                </button>
            </div>
        </div>
    );
}

export default RecipeCard;