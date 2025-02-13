import React, { useState } from 'react';
import Pagination from './Pagination';

const Parent: React.FC = () => {
    // const [currentPage, setCurrentPage] = useState(1);
    // const totalItems = 100;
    // const itemsPerPage = 10;

    // const handlePageChange = (page: number) => {
    //     setCurrentPage(page);
    // };

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 20;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        console.log("Current Page:", page);
    };

    return (
        <div>
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                truncationThreshold={3}
            />
        </div>
    );
};

export default Parent;