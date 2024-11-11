'use client'
import React, { useState, useEffect } from 'react';
import styles from './recipes.module.css';
import RecipeCard from '../../components/recipeCard/recipeCard';
import RecipesHeader from '../../components/recipesHeader/recipesHeader';
import { getRecipes } from '@/services/recipes';

const fakeRecipes = [
    {
        "id": "1",
        "name": "Spaghetti Bolognese",
        "category": "Pasta",
        "image": "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/easy_spaghetti_bolognese_93639_16x9.jpg",
        "ingredients": [
            "200g spaghetti",
            "100g ground beef",
            "1 can of crushed tomatoes",
            "1 onion, diced",
            "2 cloves garlic, minced",
            "Salt and pepper to taste",
            "Olive oil",
            "Parmesan cheese for garnish"
        ],
        "instructions": [
            "Boil spaghetti according to package instructions. Drain and set aside.",
            "In a pan, heat olive oil and sauté onions and garlic until translucent.",
            "Add ground beef and cook until browned.",
            "Add crushed tomatoes, salt, and pepper. Simmer for 15-20 minutes.",
            "Serve sauce over spaghetti and garnish with Parmesan cheese."
        ]
    },
    {
        "id": "2",
        "name": "Chicken Caesar Salad",
        "category": "Salad",
        "image": "https://img.taste.com.au/J6WbLwTn/w720-h480-cfill-q80/taste/2016/11/caesar-salad-29418-1.jpeg",
        "ingredients": [
            "1 romaine lettuce, chopped",
            "200g grilled chicken breast, sliced",
            "1/4 cup Caesar dressing",
            "Croutons",
            "Parmesan cheese, shredded",
            "Salt and pepper to taste"
        ],
        "instructions": [
            "In a large bowl, toss lettuce with Caesar dressing.",
            "Top with grilled chicken, croutons, and shredded Parmesan.",
            "Season with salt and pepper to taste."
        ]
    },
    {
        "id": "3",
        "name": "Beef Tacos",
        "category": "Mexican",
        "image": "https://www.thespruceeats.com/thmb/ses2M4uDBQ-Sk3RUoHqj1a8aXuY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/chicken-tinga-tinga-de-pollo-4773239-Hero_01-1bd1d960c02a4fdb812323b8c60fd55b.jpg",
        "ingredients": [
            "200g ground beef",
            "1 packet taco seasoning",
            "8 small tortillas",
            "1 cup shredded lettuce",
            "1/2 cup diced tomatoes",
            "1/2 cup shredded cheese",
            "Sour cream and salsa for serving"
        ],
        "instructions": [
            "In a pan, cook ground beef with taco seasoning according to package instructions.",
            "Warm tortillas in a skillet or microwave.",
            "Assemble tacos with beef, lettuce, tomatoes, and cheese.",
            "Serve with sour cream and salsa."
        ]
    },
    {
        "id": "4",
        "name": "Vegetable Stir-Fry",
        "category": "Asian",
        "image": "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/sachas_stir-fry_17077_16x9.jpg",
        "ingredients": [
            "1 cup broccoli florets",
            "1 bell pepper, sliced",
            "1 carrot, julienned",
            "1 zucchini, sliced",
            "2 tbsp soy sauce",
            "1 tbsp sesame oil",
            "1 clove garlic, minced",
            "Salt and pepper to taste"
        ],
        "instructions": [
            "In a wok, heat sesame oil and sauté garlic until fragrant.",
            "Add broccoli, bell pepper, carrot, and zucchini. Stir-fry for 5-7 minutes.",
            "Add soy sauce, salt, and pepper. Stir well.",
            "Serve hot over rice or noodles."
        ]
    },
    {
        "id": "5",
        "name": "Blueberry Pancakes",
        "category": "Breakfast",
        "image": "https://www.inspiredtaste.net/wp-content/uploads/2019/02/Easy-Homemade-Blueberry-Pancakes-Recipe-2-1200.jpg",
        "ingredients": [
            "1 cup flour",
            "2 tbsp sugar",
            "1 tsp baking powder",
            "1/2 tsp baking soda",
            "1 cup milk",
            "1 egg",
            "1/2 cup blueberries",
            "Butter or oil for cooking"
        ],
        "instructions": [
            "In a bowl, mix flour, sugar, baking powder, and baking soda.",
            "Add milk and egg, and whisk until smooth. Fold in blueberries.",
            "In a skillet, heat butter or oil and pour 1/4 cup batter for each pancake.",
            "Cook until bubbles form, then flip and cook until golden. Serve warm."
        ]
    }
]


function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [renderedRecipes, setRenderedRecipes] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    
    useEffect(() => {
        const fetchRecipes = async () => {
            try{
                console.log('Fetching');
                const data = await getRecipes();
                console.log("-----------------", data);
                setRecipes(data);
                setRenderedRecipes(data); 
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

    const filterFavorites = () => {
        const favorites = recipes.filter(recipe => localStorage.getItem(`${recipe.id}-is-favorite`) === 'true');
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
            recipe.name.toLowerCase().includes(query.toLowerCase())
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


            <div className={styles.recipes}>
                {renderedRecipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </div>


    );
}

export default Recipes;