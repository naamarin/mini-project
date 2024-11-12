'use client'
import React, { useState } from 'react';
import styles from './recipesHeader.module.css';
import Link from 'next/link';


const fakeCategories = ['All', 'Dessert', 'Breakfast', 'Main Course', 'Salad']

function RecipesHeader({ onSelect, onSearch }: { onSelect: Function, onSearch: Function }) {

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [search, setSearch] = useState('');

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
        onSelect(event.target.value);
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearch(query);
        onSearch(query);
    };
    
    return (
        <div className={styles.container}>
            <select
                value={selectedCategory}
                onChange={handleSelect}
            >
                {fakeCategories.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <div>
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search..."
                />
            </div>
            <Link href="/addRecipe"> 
                <button>add recipe</button> 
            </Link>
        </div>
    );
}

export default RecipesHeader;