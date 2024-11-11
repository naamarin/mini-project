'use client'
import React, { useState } from 'react';
import styles from './recipesHeader.module.css';

const fakeCategories = ['All', 'Asian', 'Breakfast', 'Mexican', 'Salad', 'Pasta']

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
        </div>
    );
}

export default RecipesHeader;