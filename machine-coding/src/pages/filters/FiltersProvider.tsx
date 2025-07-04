import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

export type SortOption = "price_asc" | "price_desc" | "rating";
export interface Filters {
    sortBy: SortOption;
    priceRange: [number, number];
    categories: string[];
    brand: string;
    rating: number;
    page: number;
}

const defaultFilters: Filters = {
    sortBy: "price_asc",
    priceRange: [0, 1000],
    categories: [],
    brand: "",
    rating: 0,
    page: 1,
};

const FiltersContext = createContext<{
    filters: Filters;
    updateFilters: (newFilters: Partial<Filters>) => void;
    resetFilters: () => void;
}>({
    filters: defaultFilters,
    updateFilters: () => { },
    resetFilters: () => { },
});

export const FiltersProvider = ({ children }: { children: React.ReactNode }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const initialFilters: Filters = useMemo(() => ({
        sortBy: (searchParams.get("sort") as SortOption) || "price_asc",
        priceRange: [
            Number(searchParams.get("min")) || 0,
            Number(searchParams.get("max")) || 1000,
        ],
        categories: searchParams.get("categories")?.split(",") || [],
        brand: searchParams.get("brand") || "",
        rating: Number(searchParams.get("rating")) || 0,
        page: Number(searchParams.get("page")) || 1,
    }), [searchParams]);

    const [filters, setFilters] = useState<Filters>(initialFilters);

    const updateFilters = (newFilters: Partial<Filters>) => {
        const updated = { ...filters, ...newFilters };
        setFilters(updated);

        const params = new URLSearchParams();
        params.set("sort", updated.sortBy);
        params.set("min", String(updated.priceRange[0]));
        params.set("max", String(updated.priceRange[1]));
        if (updated.categories.length) params.set("categories", updated.categories.join(","));
        else params.delete("categories");
        if (updated.brand) params.set("brand", updated.brand);
        if (updated.rating) params.set("rating", String(updated.rating));
        params.set("page", String(updated.page));

        setSearchParams(params);
    };

    const resetFilters = () => {
        setFilters(defaultFilters);
        setSearchParams({});
    };

    useEffect(() => {
        setFilters(initialFilters);
    }, [searchParams]);

    return (
        <FiltersContext.Provider value={{ filters, updateFilters, resetFilters }}>
            {children}
        </FiltersContext.Provider>
    );
};

export const useFiltersContext = () => useContext(FiltersContext);