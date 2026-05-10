import React from "react";

function PaginationComp({ page, setPage, totalPages }) {
  return (
    <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className={`px-4 py-2 rounded-xl font-medium border transition-all duration-300
    ${
      page === 1
        ? "bg-orange-100 dark:bg-[#2a211d] border-orange-200 dark:border-orange-900/40 text-gray-400 cursor-not-allowed"
        : "bg-orange-500 hover:bg-orange-600 border-orange-500 text-white shadow-lg"
    }`}
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => setPage(index + 1)}
          className={`w-10 h-10 rounded-xl font-semibold border transition-all duration-300
      ${
        page === index + 1
          ? "bg-gradient-to-r from-orange-500 to-amber-500 border-orange-500 text-white shadow-lg"
          : "bg-white dark:bg-[#1f1a17] border-orange-200 dark:border-orange-900/40 text-orange-500 hover:bg-orange-500 hover:text-white"
      }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className={`px-4 py-2 rounded-xl font-medium border transition-all duration-300
    ${
      page === totalPages
        ? "bg-orange-100 dark:bg-[#2a211d] border-orange-200 dark:border-orange-900/40 text-gray-400 cursor-not-allowed"
        : "bg-orange-500 hover:bg-orange-600 border-orange-500 text-white shadow-lg"
    }`}
      >
        Next
      </button>
    </div>
  );
}

export default PaginationComp;
