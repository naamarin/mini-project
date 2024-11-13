'use client';
import styles from './PopUpRecipe.module.css';
import { Recipe } from '@/services/types'
import { FaRegStar, FaStar } from "react-icons/fa";
import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';

interface PopUpRecipeProps {
    recipe: Recipe;
    setIsPopUp: Dispatch<SetStateAction<boolean>>;
}

const PopUpRecipe: React.FC<PopUpRecipeProps> = ({ recipe, setIsPopUp }) => {

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favoriteStatus = localStorage.getItem(`${recipe._id}-is-favorite`) === 'true';
        setIsFavorite(favoriteStatus);
    }, [recipe._id]);
   

    return (
        <>
            <div className={styles.overlay} onClick={() => setIsPopUp(false)}></div>
            <div className={styles.PopUpRecipe}>
               
                <div className={styles.containerDetalisRecipe}>

                    <button className={styles.btn} onClick={() => setIsPopUp(false)}>x</button>
                    <div className={styles.detalisRecipe}>
                        <h1>{recipe.nameRecipe}</h1>
                        <div className={styles.category}>
                            <p>{recipe.category}</p>
                            <div >
                                {isFavorite ? <FaStar className={styles.starIcon} /> : <FaRegStar className={styles.FaRegStar} />}
                            </div>
                        </div>
                    </div>

                    <img className={styles.image} src={recipe.image} alt={recipe.nameRecipe} />

                    <div className={styles.ingredients}>
                        <h2 className={styles.h2}>Ingeridents</h2>
                        <ul className={styles.listIngredients}>
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient.name} - {ingredient.quantity}</li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.instructions}>
                        <h2 className={styles.h2}>Instructions</h2>
                        <p>{recipe.preparationInstructions}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PopUpRecipe;
