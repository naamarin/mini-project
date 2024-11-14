// components/Pagination/Pagination.js
'use client'
import React from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import styles from './pagination.module.css';

const Pagination = ({ currentPage, totalPages, goToNextPage, goToPreviousPage }) => {
    return (
        <div className={styles.pagination}>
            <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={styles.pageButton}
            >
                <MdNavigateBefore />
            </button>
            <span className={styles.pageInfo}>
                {currentPage} of {totalPages}
            </span>
            <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={styles.pageButton}
            >
                <MdNavigateNext />
            </button>
        </div>
    );
};

export default Pagination;
