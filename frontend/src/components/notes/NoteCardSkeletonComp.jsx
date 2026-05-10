import React from "react";

function NoteCardSkeletonComp() {
  return (
    <div className="grid grid-cols-1 gap-6 animate-pulse">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="rounded-3xl p-6
      bg-white/80 dark:bg-[#1f1a17]/90
      backdrop-blur-xl
      border border-orange-200 dark:border-orange-900/40
      shadow-xl transition-all duration-300"
        >
          {/* title skeleton */}
          <div
            className="h-6 w-3/4 rounded-xl
        bg-orange-200 dark:bg-[#2a211d]"
          ></div>

          {/* description skeleton */}
          <div className="mt-4 space-y-3">
            <div
              className="h-4 rounded-lg
          bg-orange-100 dark:bg-[#2a211d]"
            ></div>

            <div
              className="h-4 w-5/6 rounded-lg
          bg-orange-100 dark:bg-[#2a211d]"
            ></div>

            <div
              className="h-4 w-2/3 rounded-lg
          bg-orange-100 dark:bg-[#2a211d]"
            ></div>
          </div>

          {/* button skeleton */}
          <div className="flex justify-end gap-3 mt-8">
            <div
              className="h-9 w-20 rounded-xl
          bg-orange-200 dark:bg-[#2a211d]"
            ></div>

            <div
              className="h-9 w-20 rounded-xl
          bg-orange-200 dark:bg-[#2a211d]"
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NoteCardSkeletonComp;
