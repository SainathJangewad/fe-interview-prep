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

    // Determine the range of pages to display around the current page
    let startPage = Math.max(1, page - truncationThreshold); // Ensure we don't go below page 1
    let endPage = Math.min(totalPages, page + truncationThreshold); // Ensure we don't go beyond totalPages



    // If the startPage is greater than 1, always show page 1
    if (startPage > 1) {
      pages.push(1); // First page should always be visible

      // If startPage is at least 3, it means there is a gap (e.g., 1, ..., 4)
      if (startPage > 2) {
        pages.push('...'); // Show '...' when there's a gap of at least 1 page (startPage - 1 > 1)
      }
    }

    // Add the main range of pages (around the current page)
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i); // Display all pages from startPage to endPage
    }

    // If the endPage is less than totalPages, ensure the last page is visible
    if (endPage < totalPages) {
      // If endPage is at least 2 less than totalPages, there's a gap (e.g., 7, ..., 10)
      if (endPage < totalPages - 1) {
        pages.push('...'); // Show '...' when there's a gap of at least 1 page (totalPages - endPage > 1)
      }
      pages.push(totalPages); // Last page should always be visible
    }

    // Render pagination elements
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
          // The `aria-current="page"` attribute improves accessibility by indicating the currently selected page.
          // This helps screen readers understand which page is active.

          // **How does the screen reader know the active page?**
          // - `aria-current="page"` tells the screen reader that *this specific button* is the active page.
          // - The button itself contains `{p}` (the page number), so the screen reader reads it aloud.
          // - Example: If page 3 is active, the button will be:
          //   <button aria-current="page">3</button>
          //   The screen reader will say: "Page 3, current page."
          // - Other buttons (e.g., 4, 5) won't have `aria-current`, so they will be read as normal buttons.
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


// Let's break it down step by step to understand the logic behind calculating startPage and endPage in the pagination function.

// 1. What do startPage and endPage represent ?
//   These values define the visible range of pages around the current page.

// 2. How are startPage and endPage calculated ?

// let startPage = Math.max(1, page - truncationThreshold);
// let endPage = Math.min(totalPages, page + truncationThreshold);
// truncationThreshold(e.g., 2 or 3) is the number of pages we want to show on each side of the current page.
// page is the currently active page.
// totalPages is the total number of pages in the pagination.

// 3. Why use Math.max(1, page - truncationThreshold) for startPage ?
// This ensures that startPage never goes below 1.

// Example:
// If page = 3 and truncationThreshold = 2, then startPage = 3 - 2 = 1(valid).
// If page = 1 and truncationThreshold = 2, then startPage = 1 - 2 = -1, but Math.max(1, -1) = 1(prevents negative values).
// 4. Why use Math.min(totalPages, page + truncationThreshold) for endPage ?
//This ensures that endPage never exceeds totalPages.

//Example:
// If page = 8, totalPages = 10, and truncationThreshold = 2, then:
// endPage = 8 + 2 = 10(valid).
// If page = 9, totalPages = 10, and truncationThreshold = 2, then:
// endPage = 9 + 2 = 11, but Math.min(10, 11) = 10(prevents going beyond totalPages).

// 5. Example Scenarios
// Case 1: page = 5, totalPages = 10, truncationThreshold = 2
// startPage = Math.max(1, 5 - 2) = Math.max(1, 3) = 3
// endPage = Math.min(10, 5 + 2) = Math.min(10, 7) = 7
// ✅ Output: 1 ... 3 4 5 6 7 ... 10

// Case 2: page = 1, totalPages = 10, truncationThreshold = 2
// startPage = Math.max(1, 1 - 2) = Math.max(1, -1) = 1
// endPage = Math.min(10, 1 + 2) = Math.min(10, 3) = 3
// ✅ Output: 1 2 3 ... 10

// Case 3: page = 9, totalPages = 10, truncationThreshold = 2
// startPage = Math.max(1, 9 - 2) = Math.max(1, 7) = 7
// endPage = Math.min(10, 9 + 2) = Math.min(10, 11) = 10
// ✅ Output: 1 ... 7 8 9 10

// 6. Summary
// startPage = max(1, page - truncationThreshold): Ensures we don't start before page 1.
// endPage = min(totalPages, page + truncationThreshold): Ensures we don't exceed totalPages.
// This logic dynamically determines the range of visible pages around the current page.

// --------------------------
//  i observed that when i press tab button it goes to next button in pagination button list and when i press the enter key it fires the onclick event and current paginatio button is selected.my Q is how the click event automatically firing from 'enter' key but not from other keys
// ans:
// Good observation! The reason the Enter key triggers the onClick event on pagination buttons but other keys(like Arrow keys, Tab, etc.) do not is because of how browsers handle keyboard interactions with buttons.

// Why does Enter trigger onClick ?
//   Native Button Behavior

// The < button > element in HTML is natively interactive, meaning browsers automatically associate it with common user interactions.
// By default, pressing Enter while focusing on a button triggers a click event.
// Default Key Events on Buttons

// When a button is focused:
// Enter(or Space) → Triggers click(as if the user physically clicked it).
// Tab → Moves focus to the next interactive element.
// Arrow keys → Do nothing unless explicitly handled.
// Why doesn't Tab trigger onClick?

// Tab key only moves focus; it does not perform any action on the focused element.
// Once a button is focused via Tab, pressing Enter activates it.