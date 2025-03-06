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
          React.createElement(
            "button",
            {
              key: i,
              className: `page-btn ${currentPage === i ? "active" : ""}`,
              onClick: () => onPageChange(i),
            },
            i
          )
        );
      }
    } else {
      for (let i = 1; i <= 7; i++) {
        pages.push(
          React.createElement(
            "button",
            {
              key: i,
              className: `page-btn ${currentPage === i ? "active" : ""}`,
              onClick: () => onPageChange(i),
            },
            i
          )
        );
      }
      pages.push(React.createElement("span", { key: "dots" }, "..."));
      pages.push(
        React.createElement(
          "button",
          {
            key: totalPages,
            className: `page-btn ${currentPage === totalPages ? "active" : ""}`,
            onClick: () => onPageChange(totalPages),
          },
          totalPages
        )
      );
    }

    return pages;
  };

  return React.createElement(
    "div",
    { className: "pagination" },
    React.createElement(
      "button",
      {
        className: "prev-btn",
        onClick: () => onPageChange(currentPage - 1),
        disabled: currentPage === 1,
      },
      "← Prev"
    ),
    renderPagination(),
    React.createElement(
      "button",
      {
        className: "next-btn",
        onClick: () => onPageChange(currentPage + 1),
        disabled: currentPage === totalPages,
      },
      "Next →"
    )
  );
};
