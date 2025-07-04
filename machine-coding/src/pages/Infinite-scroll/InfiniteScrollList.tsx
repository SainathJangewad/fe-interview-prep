import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Define the type for the data you're fetching
interface Item {
    id: number;
    title: string;
    // Add other fields as needed
}

const InfiniteScrollList: React.FC = () => {
    // State to store the list of items
    const [items, setItems] = useState<Item[]>([]);
    // State to track the current page for pagination
    const [page, setPage] = useState(1);
    // State to prevent duplicate API calls
    const [loading, setLoading] = useState(false);
    // State to check if more data is available
    const [hasMore, setHasMore] = useState(true);

    // Fetch data from the API
    const fetchData = useCallback(async () => {
        // 1. Prevent duplicate or overlapping API calls
        if (loading || !hasMore) return;

        // Set loading to true to indicate data is being fetched
        setLoading(true);

        try {
            // Fetch data for the current page
            const response = await axios.get<Item[]>(
                `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
            );
            const newItems = response.data;

            // 2. Check if there is more data to load
            if (newItems.length === 0) {
                setHasMore(false); // No more data available
            } else {
                // Append new data to the existing list
                setItems((prevItems) => [...prevItems, ...newItems]);
                // 3. Increment the page for the next fetch
                setPage((prevPage) => prevPage + 1);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            // Reset loading state after fetching is complete
            setLoading(false);
        }
    }, [page, loading, hasMore]); // Dependencies for useCallback

    // 4. Load initial data when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    // 5. Implement infinite scroll with a scroll event listener
    useEffect(() => {
        const handleScroll = () => {
            // Calculate scroll position
            const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
            // Key Points About Scroll Properties:
            // scrollTop:
            // Tracks how far the user has scrolled down the page.
            // Example: If the user scrolls 500px down, scrollTop will be 500.
            // clientHeight:
            // Represents the height of the visible viewport.
            // Example: If the viewport height is 800px, clientHeight will be 800.
            // scrollHeight:
            // Represents the total height of the page, including non-visible content.
            // Example: If the total page height is 2000px, scrollHeight will be 2000.
            // Threshold:
            // A small value (e.g., 10) to trigger the fetch slightly before the user reaches the absolute bottom.
            // Example: scrollHeight - 10 ensures the fetch is triggered when the user is 10px away from the bottom.

            // 6. Trigger fetchData when the user is near the bottom of the page
            if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
                fetchData();
            }
        };

        // Attach the scroll event listener
        window.addEventListener('scroll', handleScroll);

        // 7. Clean up the event listener when the component unmounts
        return () => window.removeEventListener('scroll', handleScroll);
    }, [fetchData, loading]); // Dependencies for useEffect

    return (
        <div>
            <h1>Infinite Scrolling List</h1>
            <ul>
                {/* Render the list of items */}
                {items.map((item) => (
                    <li key={item.id} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                        {item.title}
                    </li>
                ))}
            </ul>

            {/* 8. Show a loading indicator while fetching data */}
            {loading && <p>Loading...</p>}

            {/* 9. Show a message when no more data is available */}
            {!hasMore && <p>No more items to load.</p>}
        </div>
    );
};


export default InfiniteScrollList;

// Algorithm: Infinite Scrolling List Implementation
// 1. Initialize state:
//    - `items`: Array to store fetched data.
//    - `page`: Current page number for pagination.
//    - `loading`: Boolean to track if data is being fetched.
//    - `hasMore`: Boolean to check if more data is available.

// 2. Fetch data from the API:
//    - Use `axios` to fetch data for the current page.
//    - Append new data to `items` and increment `page`.
//    - If no more data is returned, set `hasMore` to false.

// 3. Load initial data:
//    - Call `fetchData` on component mount to load the first page.

// 4. Implement infinite scroll:
//    - Add a scroll event listener to the window.
//    - When the user scrolls near the bottom of the page (e.g., `scrollTop + clientHeight >= scrollHeight - 10`):
//      - Call `fetchData` to load the next page of data.
//    - Clean up the event listener on component unmount.

// 5. Render the list:
//    - Map over `items` to render each item in a list.
//    - Show a loading indicator while fetching data.
//    - Display a message if no more items are available.
