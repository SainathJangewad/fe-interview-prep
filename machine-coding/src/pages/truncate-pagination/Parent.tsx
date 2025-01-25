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
            {/* Your content here */}
            {/* <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        maxVisiblePages={5} // Show at most 5 pages at a time
      /> */}

            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                maxVisible={5} // Optional, defaults to 5
            />
        </div>
    );
};

export default Parent;