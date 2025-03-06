import React from "react";

import "./Pagination.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPagination = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            className={`page-btn ${currentPage === i ? "active" : ""}`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 7; i++) {
          pages.push(
            <button
              key={i}
              className={`page-btn ${currentPage === i ? "active" : ""}`}
              onClick={() => onPageChange(i)}
            >
              {i}
            </button>
          );
        }
        pages.push(<span key="dots">...</span>);
        pages.push(
          <button
            key={totalPages}
            className={`page-btn ${currentPage === totalPages ? "active" : ""}`}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        );
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          <button
            key={1}
            className={`page-btn ${currentPage === 1 ? "active" : ""}`}
            onClick={() => onPageChange(1)}
          >
            1
          </button>
        );
        pages.push(<span key="dots">...</span>);
        for (let i = totalPages - 6; i <= totalPages; i++) {
          pages.push(
            <button
              key={i}
              className={`page-btn ${currentPage === i ? "active" : ""}`}
              onClick={() => onPageChange(i)}
            >
              {i}
            </button>
          );
        }
      } else {
        pages.push(
          <button
            key={1}
            className={`page-btn ${currentPage === 1 ? "active" : ""}`}
            onClick={() => onPageChange(1)}
          >
            1
          </button>
        );
        pages.push(<span key="dots">...</span>);
        for (let i = currentPage - 3; i <= currentPage + 3; i++) {
          pages.push(
            <button
              key={i}
              className={`page-btn ${currentPage === i ? "active" : ""}`}
              onClick={() => onPageChange(i)}
            >
              {i}
            </button>
          );
        }
        pages.push(<span key="dots2">...</span>);
        pages.push(
          <button
            key={totalPages}
            className={`page-btn ${currentPage === totalPages ? "active" : ""}`}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        );
      }
    }

    return pages;
  };

  return (
    <div className="pagination">
      <button
        className="prev-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Prev
      </button>
      {renderPagination()}
      <button
        className="next-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next →
      </button>
    </div>
  );
};
