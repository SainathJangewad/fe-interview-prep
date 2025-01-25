// import React, { useState, useEffect } from 'react';
// import './Pagination.scss'

// interface PaginationProps {
//   totalItems: number;
//   itemsPerPage: number;
//   currentPage: number;
//   onPageChange: (page: number) => void;
//   maxVisiblePages: number; // Number of pages to show around the current page
// }

// const Pagination: React.FC<PaginationProps> = ({
//   totalItems,
//   itemsPerPage,
//   currentPage,
//   onPageChange,
//   maxVisiblePages,
// }) => {
//   const [totalPages, setTotalPages] = useState(0);

//   useEffect(() => {
//     setTotalPages(Math.ceil(totalItems / itemsPerPage));
//   }, [totalItems, itemsPerPage]);

//   const handlePageChange = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       onPageChange(page);
//     }
//   };

//   const renderPageNumbers = () => {
//     const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//     const endPage = Math.min(totalPages, currentPage + Math.floor(maxVisiblePages / 2));

//     const pages = [];
//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(
//         <button
//           key={i}
//           onClick={() => handlePageChange(i)}
//           className={currentPage === i ? 'active' : ''}
//         >
//           {i}
//         </button>
//       );
//     }

//     return pages;
//   };

//   return (
//     <div className="pagination">
//       <button
//         disabled={currentPage === 1}
//         onClick={() => handlePageChange(currentPage - 1)}
//       >
//         Previous
//       </button>
//       {renderPageNumbers()}
//       <button
//         disabled={currentPage === totalPages}
//         onClick={() => handlePageChange(currentPage + 1)}
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// export default Pagination;

import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  maxVisible?: number; // Optional: Max visible pages (default to 5)
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  maxVisible = 5,
}) => {
  // Generate the pagination numbers with truncation logic
  const generatePagination = () => {
    const pages: (number | string)[] = [];
    const half = Math.floor(maxVisible / 2);

    // Add the first page
    if (currentPage > half + 1) {
      pages.push(1);
      if (currentPage > half + 2) {
        pages.push("...");
      }
    }

    // Add pages around the current page
    const start = Math.max(2, currentPage - half);
    const end = Math.min(totalPages - 1, currentPage + half);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add the last page
    if (currentPage + half < totalPages - 1) {
      if (currentPage + half < totalPages - 2) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const handleClick = (page: number | string) => {
    if (typeof page === "number" && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
      {/* Previous Button */}
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {/* Render Pagination */}
      {generatePagination().map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => handleClick(page)}
            style={{
              fontWeight: page === currentPage ? "bold" : "normal",
              background: page === currentPage ? "#ddd" : "transparent",
            }}
          >
            {page}
          </button>
        ) : (
          <span key={index}>...</span>
        )
      )}

      {/* Next Button */}
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
