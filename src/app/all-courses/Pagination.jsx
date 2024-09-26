"use client";

import { useEffect, useState } from "react";

const Pagination = () => {
  const [countPerPage] = useState(3);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("http://localhost:3000/api/courses")
      .then((res) => res.json())
      .then((data) => setCount(data.length));
  }, []);

  // for pagination------------------------------------------------------
  const numberOfPage = Math.ceil(count / countPerPage);
  const pages = [...Array(numberOfPage).keys()];

  const handlePageButton = (e) => {
    setCurrentPage(e);
  };

  return (
    <div>
      {/* pagination */}
      <div className=" w-3/5 mx-auto">
        <div className="join flex justify-center mb-12">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageButton(currentPage - 1)}
            className="join-item btn rounded-lg text-red-400 border-red-400 bg-transparent text-xl"
          >
            «
          </button>
          {pages.map((page, index) => (
            <>
              <button
                onClick={() => handlePageButton(index + 1)}
                key={index}
                className={`${
                  currentPage === index + 1
                    ? "bg-red-400 text-white"
                    : "bg-base-100 border text-red-400 border-red-400"
                } join-item btn mx-1`}
              >
                {index + 1}
              </button>
            </>
          ))}

          <button
            disabled={currentPage === numberOfPage}
            onClick={() => handlePageButton(currentPage + 1)}
            className="join-item btn rounded-lg text-red-400 border-red-400 bg-transparent text-xl"
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
