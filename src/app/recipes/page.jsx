'use client'
import React, { useState, useEffect } from 'react';
import styles from './recipes.module.css';
import RecipeCard from '../../components/recipeCard/recipeCard';
import RecipesHeader from '../../components/recipesHeader/recipesHeader';
import { getRecipes } from '@/services/recipes';
import PopUpRecipe from '@/components/PopUpRecipe/PopUpRecipe'

function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [renderedRecipes, setRenderedRecipes] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    const [isPopUp, setIsPopUp] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const data = await getRecipes();
                setRecipes(data);
                setRenderedRecipes(data);
            }
            catch (err) {
                setError('Failed to fetch recipes');
            }
            finally {
                setLoading(false);
            }
        };
        fetchRecipes();
    }, []);

    const filterFavorites = () => {
        const favorites = recipes.filter(recipe => localStorage.getItem(`${recipe._id}-is-favorite`) === 'true');
        setRenderedRecipes(favorites);
    }

    const filterCategory = (category) => {
        if (category === 'All') {
            setRenderedRecipes(recipes);
        } else {
            const filtered = recipes.filter(recipe => recipe.category === category);
            setRenderedRecipes(filtered);
        }
    };

    const handleSearch = (query) => {
        const filtered = recipes.filter(recipe =>
            recipe.nameRecipe.toLowerCase().includes(query.toLowerCase())
        );
        setRenderedRecipes(filtered);
    };

    const allRecipes = () => {
        setRenderedRecipes(recipes);
    }

    return (
        <div>
          <RecipesHeader onSelect={filterCategory} onSearch={handleSearch} />
          <h1>Recipes</h1>
          <div className={styles.filter} onClick={filterFavorites}>favorites</div>
          <div className={styles.filter} onClick={allRecipes}>all</div>
         
          {isPopUp && selectedRecipe && (
            <PopUpRecipe 
              recipe={selectedRecipe} 
              setIsPopUp={setIsPopUp} 
            />
         
         )}
          <div className={styles.recipes}>
            {renderedRecipes.map((recipe, index) => (
              <div key={index}>
                <RecipeCard
                  recipe={recipe}
                  setIsPopUp={setIsPopUp}
                  setSelectedRecipe={setSelectedRecipe} 
                />
              </div>
            ))}
          </div>
        </div>
      );
}

export default Recipes;