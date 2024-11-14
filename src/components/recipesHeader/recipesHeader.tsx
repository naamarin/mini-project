'use client'
import React, { useState, useEffect } from 'react';
import styles from './recipesHeader.module.css';
import categoriesStore from '@/store/categoriesStore';

const fakeCategories = ['All', 'Dessert', 'Breakfast', 'Main Course', 'Salad']

function RecipesHeader({ onSelect, onSearch }: { onSelect: Function, onSearch: Function }) {

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [search, setSearch] = useState('');
    const {categories} = categoriesStore();

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
        <div className={styles.wrapper}>
            <select
                className={styles.input}
                value={selectedCategory}
                onChange={handleSelect}
            >
                {['All', ...categories].map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <div>

                <input
                    className={styles.input}
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