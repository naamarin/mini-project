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

    // בדיקה ראשונית של מצב ה"אהוב" והגדרת ה-state
    useEffect(() => {
        const favoriteStatus = localStorage.getItem(`${recipe._id}-is-favorite`) === 'true';
        setIsFavorite(favoriteStatus);
    }, [recipe._id]);

    // פונקציה לשינוי מצב ה"אהוב" ושמירתו ב-localStorage
    const toggleFavorite = () => {
        const newFavoriteStatus = !isFavorite;
        setIsFavorite(newFavoriteStatus);
        localStorage.setItem(`${recipe._id}-is-favorite`, newFavoriteStatus.toString());
    };

    return (
        <>
            <div className={styles.overlay} onClick={() => setIsPopUp(false)}></div>
            <div className={styles.PopUpRecipe}>

                {/* קונטיינר לתוכן */}
                <div className={styles.containerDetalisRecipe}>
                    {/*כותרות*/}
                    <button className={styles.btn} onClick={() => setIsPopUp(false)}>x</button>
                    <div className={styles.detalisRecipe}>
                        <h1>{recipe.nameRecipe}</h1>
                        <div className={styles.category}>
                            <p>{recipe.category}</p>
                            <div onClick={toggleFavorite}>
                                {isFavorite ? <FaStar className={styles.starIcon} /> : <FaRegStar className={styles.FaRegStar} />}
                            </div>
                        </div>
                    </div>
                    {/*תמונה*/}
                    <img className={styles.image} src={recipe.image} alt={recipe.nameRecipe} />
                    {/*רכיבים*/}
                    <div className={styles.ingredients}>
                        <h2 className={styles.h2}>Ingeridents</h2>
                        <ul className={styles.listIngredients}>
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient.name} - {ingredient.quantity}</li>
                            ))}
                        </ul>
                    </div>
                    {/*אופן ההכנה*/}
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
