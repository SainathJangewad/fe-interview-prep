import React, { useState } from 'react';
import './Pagination.scss'

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  truncationThreshold?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  truncationThreshold = 3,
}) => {
  const [page, setPage] = useState(currentPage);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    onPageChange(newPage);
  };

  const renderPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, page - truncationThreshold);
    let endPage = Math.min(totalPages, page + truncationThreshold);

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages.map((p, index) =>
      p === '...' ? (
        <span key={index} className="pagination-ellipsis">
          ...
        </span>
      ) : (
        <button
          key={index}
          className={`pagination-item ${p === page ? 'active' : ''}`}
          onClick={() => handlePageChange(p as number)}
          aria-label={`Go to page ${p}`}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </button>
      )
    );
  };

  return (
    <nav role="navigation" aria-label="Pagination">
      <button
        className="pagination-item"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        &laquo;
      </button>
      {renderPageNumbers()}
      <button
        className="pagination-item"
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        &raquo;
      </button>
    </nav>
  );
};

export default Pagination;