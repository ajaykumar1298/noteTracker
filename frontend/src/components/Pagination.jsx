import React from "react";

function Pagination({ page, setPage, totalPages }) {
  return (
    <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className={`px-4 py-2 rounded-xl font-medium transition-all ${
          page === 1
            ? "bg-gray-700 cursor-not-allowed"
            : "bg-[#111c44] hover:bg-blue-600"
        }`}
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => setPage(index + 1)}
          className={`w-10 h-10 rounded-xl font-semibold transition-all ${
            page === index + 1
              ? "bg-blue-600"
              : "bg-[#111c44] hover:bg-blue-500"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className={`px-4 py-2 rounded-xl font-medium transition-all ${
          page === totalPages
            ? "bg-gray-700 cursor-not-allowed"
            : "bg-[#111c44] hover:bg-blue-600"
        }`}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
