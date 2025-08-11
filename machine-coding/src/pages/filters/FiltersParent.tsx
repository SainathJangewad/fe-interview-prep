import React from "react";
import { FiltersComponent } from "./FiltersComponent";
import Products from "./Products";

const ALL_PRODUCTS = [
    { id: 1, name: "iPhone 15", price: 79999, rating: 5, category: "Electronics", brand: "Apple" },
    { id: 2, name: "Samsung Galaxy S23", price: 69999, rating: 4, category: "Electronics", brand: "Samsung" },
    { id: 3, name: "Nike Shoes", price: 5999, rating: 4, category: "Clothing", brand: "Nike" },
    { id: 4, name: "The Great Gatsby", price: 499, rating: 5, category: "Books", brand: "Penguin" },
    { id: 5, name: "Sony TV", price: 45999, rating: 4, category: "Home", brand: "Sony" },
];

const FiltersParent: React.FC = () => {
    return (
        <div style={{ display: "flex", gap: "20px" }}>
            {/* Filters Sidebar */}
            <FiltersComponent />

            {/* Products List */}
            <Products products={ALL_PRODUCTS} />
        </div>
    );
};

export default FiltersParent;
