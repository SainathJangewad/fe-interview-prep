import React from "react";
import { useFilters } from "./useFilters";

const Products: React.FC<{ products: any[] }> = ({ products }) => {
    const { filters } = useFilters();

    // 1️⃣ Filtering
    const filteredProducts = products.filter((p) => {
        // Price range filter
        if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) {
            return false;
        }

        // Category filter
        if (filters.categories.length > 0 && !filters.categories.includes(p.category)) {
            return false;
        }

        // Brand filter
        if (filters.brand && p.brand !== filters.brand) {
            return false;
        }

        // Rating filter
        if (filters.rating && p.rating < filters.rating) {
            return false;
        }

        return true;
    });

    // 2️⃣ Sorting
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (filters.sortBy) {
            case "price_asc":
                return a.price - b.price;
            case "price_desc":
                return b.price - a.price;
            case "rating":
                return b.rating - a.rating;
            default:
                return 0;
        }
    });

    return (
        <div className="products">
            {sortedProducts.length > 0 ? (
                sortedProducts.map((p) => (
                    <div key={p.id} className="product-card">
                        <h3>{p.name}</h3>
                        <p>₹{p.price}</p>
                        <p>{"★".repeat(p.rating)}</p>
                        <p>{p.category} - {p.brand}</p>
                    </div>
                ))
            ) : (
                <p>No products found</p>
            )}
        </div>
    );
};

export default Products;
