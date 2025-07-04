import React from "react";
import { useFilters } from "./useFilters";
import "./FiltersComponent.scss";

const CATEGORIES = ["Electronics", "Clothing", "Books", "Home"];
const BRANDS = ["Apple", "Samsung", "Nike", "Sony"];

export const FiltersComponent: React.FC = () => {
    const { filters, updateFilters, resetFilters } = useFilters();

    const toggleCategory = (cat: string) => {
        const updated = filters.categories.includes(cat)
            ? filters.categories.filter((c) => c !== cat)
            : [...filters.categories, cat];
        updateFilters({ categories: updated });
    };

    console.log(filters);

    return (
        <div className="filter-box">
            <div className="filter-section">
                <label>Sort By:</label>
                <select value={filters.sortBy} onChange={(e) => updateFilters({ sortBy: e.target.value as any })}>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="rating">Rating</option>
                </select>
            </div>

            <div className="filter-section">
                <label>Price Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}</label>
                <input
                    type="range"
                    min={0}
                    max={5000}
                    value={filters.priceRange[1]}
                    onChange={(e) => updateFilters({ priceRange: [0, Number(e.target.value)] })}
                />
            </div>

            <div className="filter-section">
                <label>Categories:</label>
                {CATEGORIES.map((c) => (
                    <label key={c}><input type="checkbox" checked={filters.categories.includes(c)} onChange={() => toggleCategory(c)} /> {c}</label>
                ))}
            </div>

            <div className="filter-section">
                <label>Brand:</label>
                <select value={filters.brand} onChange={(e) => updateFilters({ brand: e.target.value })}>
                    <option value="">All</option>
                    {BRANDS.map((b) => (
                        <option key={b} value={b}>{b}</option>
                    ))}
                </select>
            </div>

            <div className="filter-section">
                <label>Rating:</label>
                {[5, 4, 3, 2, 1].map((r) => (
                    <label key={r}><input type="radio" name="rating" checked={filters.rating === r} onChange={() => updateFilters({ rating: r })} /> {"★".repeat(r)}</label>
                ))}
            </div>

            <div className="filter-section">
                <button onClick={resetFilters}>Reset Filters</button>
            </div>
        </div>
    );
};