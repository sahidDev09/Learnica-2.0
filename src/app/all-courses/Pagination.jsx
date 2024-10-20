// /components/Pagination.js
import React from "react";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(
    totalItems > 0 ? totalItems / itemsPerPage : 0
  );
  const pages =
    numberOfPages > 0
      ? [...Array(numberOfPages).keys()].map((num) => num + 1)
      : [];

  const handlePageChange = (page) => {
    if (page >= 1 && page <= numberOfPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="w-3/5 mx-auto">
      <div className="flex justify-center pb-12">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="join-item btn rounded-lg text-red-400 border-red-400 bg-transparent text-xl">
          «
        </button>

        {pages.map((page, index) => (
          <button
            onClick={() => handlePageChange(page)}
            key={index}
            className={`join-item btn mx-1 ${
              currentPage === page
                ? "bg-red-400 text-white"
                : "bg-base-100 border text-red-400 border-red-400"
            }`}>
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === numberOfPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="join-item btn rounded-lg text-red-400 border-red-400 bg-transparent text-xl">
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;
