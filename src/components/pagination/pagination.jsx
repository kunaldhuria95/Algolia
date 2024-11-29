import React, { useState } from "react";
import styles from './pagination.module.css'
const Pagination = ({ totalPages, currentPage, handleFilterChange }) => {

    const handleNext = () => {
        if (currentPage < totalPages) {
            handleFilterChange("page", currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            handleFilterChange("page", currentPage - 1);
        }
    };

    const generatePages = () => {
        const pages = [];
        if (totalPages > 1) {

            // Always include the first and last pages
            pages.push(1);
            if (currentPage > 4) pages.push("...");

            // Include pages around the current page
            for (let i = Math.max(2, currentPage - 2); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 3) pages.push("...");
            pages.push(totalPages);


        }


        return pages;
    };

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: '30%' }}>
            <button className={styles.btn} onClick={handlePrev} disabled={currentPage === 1}>
                Prev
            </button>
            {generatePages().map((page, index) => (
                <button
                    key={index}
                    className={styles.btn}
                    onClick={() => typeof page === "number" && handleFilterChange("page", page)}
                    disabled={page === currentPage || page === "..."}
                    style={{
                        fontWeight: page === currentPage ? "bold" : "normal",
                        cursor: page === "..." ? "default" : "pointer",
                    }}
                >
                    {page}
                </button>
            ))}
            <button className={styles.btn} onClick={handleNext} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
