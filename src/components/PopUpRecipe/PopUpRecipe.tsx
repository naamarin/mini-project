'use client';
import styles from './PopUpRecipe.module.css';
import { Recipe } from '@/services/types'
import { FaRegStar } from "react-icons/fa";

const PopUpRecipe = ({ recipe }: { recipe: Recipe }) => {

    return (
        <div className={styles.PopUpRecipe}>
            <div className={styles.containerDetalisRecipe}>
                <img className={styles.image} src={recipe.image} alt={recipe.nameRecipe} />
                <div className={styles.detalisRecipe}>
                    <h1>{recipe.nameRecipe}</h1>
                    <div className={styles.category}>
                        <p>{recipe.category}</p>
                        <FaRegStar />
                    </div>
                    <div className={styles.ingredients}>
                        <h2>Ingeridents</h2>
                        <ul className={styles.listIngredients}>
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient.name} - {ingredient.quantity}</li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
            <div className={styles.instructions}>
                <h2>Instructions</h2>
                <p>{recipe.preparationInstructions}</p>
            </div>
        </div>
    );
}

export default PopUpRecipe;