"use client";
import React, { useEffect, useState } from 'react';
import styles from './recipes.module.css';
import RecipeCard from '../components/recipeCard/recipeCard';

function Recipes() {
    const [recipes,setRecipes] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    
    useEffect(() => {
        const fetchRecipes = async () => {
            try{
                const data = await getRecipes();
                setRecipes(data);
            }
            catch (err){
                setError('Failed to fetch recipes');
            }
            finally{
                setLoading(false);
            }
        };
        fetchRecipes();
    },[]);

    return (
        <div className={styles.recipes}>
            {recipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
}

export default Recipes;