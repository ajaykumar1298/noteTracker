import React from "react";

function NoteCardSkeleton() {
  return (
    <div className="grid grid-cols-1  gap-6 animate-pulse">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="bg-[#111c44] border border-gray-700 rounded-3xl p-6"
        >
          <div className="h-6 bg-[#1d2a52] rounded w-3/4"></div>

          <div className="mt-4 space-y-3">
            <div className="h-4 bg-[#1d2a52] rounded"></div>

            <div className="h-4 bg-[#1d2a52] rounded w-5/6"></div>

            <div className="h-4 bg-[#1d2a52] rounded w-2/3"></div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <div className="h-9 w-20 bg-[#1d2a52] rounded-lg"></div>

            <div className="h-9 w-20 bg-[#1d2a52] rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NoteCardSkeleton;
