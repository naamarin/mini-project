'use client'
import React, { useState, useEffect } from 'react';
import styles from './recipes.module.css';
import RecipeCard from '../../components/recipeCard/recipeCard';
import RecipesHeader from '../../components/recipesHeader/recipesHeader';
import { getRecipes } from '@/services/recipes';
import PopUpRecipe from '@/components/PopUpRecipe/PopUpRecipe'
import Link from 'next/link';
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import Pagination from '../../components/Pagination/Pagination';


function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [renderedRecipes, setRenderedRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const [isPopUp, setIsPopUp] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                setLoading(true);
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
        const filtered = renderedRecipes.filter(recipe =>
            recipe.nameRecipe.toLowerCase().includes(query.toLowerCase())
        );
        setRenderedRecipes(filtered);
    };

    const allRecipes = () => {
        setRenderedRecipes(recipes);
    }

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = renderedRecipes.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(renderedRecipes.length / itemsPerPage);

    const goToNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Recipes</h1>
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
                <>
                    <h1 style={{ marginLeft: '4rem' }}>Loading...</h1>
                </>
            ) : (
                <>
                    {isPopUp && selectedRecipe && (
                        <PopUpRecipe
                            recipe={selectedRecipe}
                            setIsPopUp={setIsPopUp}
                        />
                    )}
                    <div className={styles.recipes}>
                        {currentItems.map((recipe, index) => (
                            <RecipeCard
                                key={index}
                                recipe={recipe}
                                setIsPopUp={setIsPopUp}
                                setSelectedRecipe={setSelectedRecipe}
                            />
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        goToNextPage={goToNextPage}
                        goToPreviousPage={goToPreviousPage}
                    />
                </>
            )}
            <footer className={styles.footer}>
                <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Recipes;
