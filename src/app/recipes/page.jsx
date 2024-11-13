'use client'
import React, { useState, useEffect } from 'react';
import styles from './recipes.module.css';
import RecipeCard from '../../components/recipeCard/recipeCard';
import RecipesHeader from '../../components/recipesHeader/recipesHeader';
import { getRecipes } from '@/services/recipes';
import PopUpRecipe from '@/components/PopUpRecipe/PopUpRecipe'
import Link from 'next/link';

function Recipes() {
 const [recipes, setRecipes] = useState([]);
 const [renderedRecipes, setRenderedRecipes] = useState([]);
 const [loading, setLoading] = useState(true);
//  const [error, setError] = useState(null);
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
   const favorites = renderedRecipes.filter(recipe => localStorage.getItem(`${recipe._id}-is-favorite`) === 'true');
   setRenderedRecipes(favorites);
 }

 const filterCategory = (category) => {
   if (category === 'All') {
     setRenderedRecipes(recipes);
   } else {
     const filtered = renderedRecipes.filter(recipe => recipe.category === category);
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
       <h1 className={styles.title}>Recipes</h1>
       <div className={styles.header}>
       <RecipesHeader onSelect={filterCategory} onSearch={handleSearch} />
       <div className={styles.wrapper}>
         <div className={styles.filter} onClick={filterFavorites}>Favorites</div>
         <div className={styles.filter} onClick={allRecipes}>All</div>
         <Link href="/addRecipe">
           <button className={styles.addButton}>Add</button>
         </Link>
       </div>
     </div>

     {loading ? (
       <h1 style={{ marginLeft: '4rem' }}>Loading...</h1>
     ) : (
       <>
         {isPopUp && selectedRecipe && (
           <PopUpRecipe
             recipe={selectedRecipe}
             setIsPopUp={setIsPopUp}
           />
         )}
         <div className={styles.recipes}>
           {renderedRecipes.map((recipe, index) => (
             <RecipeCard
               key={index}
               recipe={recipe}
               setIsPopUp={setIsPopUp}
               setSelectedRecipe={setSelectedRecipe}
             />
           ))}
         </div>
       </>
     )}
   </div>
 );
}

export default Recipes;
