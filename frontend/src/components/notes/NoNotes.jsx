import React from "react";

function NoNotes() {
  return (
    <div
      className="rounded-3xl p-12 text-center
  bg-white/80 dark:bg-[#1f1a17]/90
  backdrop-blur-xl
  border border-dashed border-orange-300 dark:border-orange-900/40
  shadow-xl transition-all duration-300"
    >
      <div className="text-6xl mb-4">📝</div>

      <h2 className="text-2xl font-semibold mb-2 text-orange-600 dark:text-orange-400">
        No Notes Yet
      </h2>

      <p className="text-gray-600 dark:text-gray-400">
        Start by creating your first note.
      </p>
    </div>
  );
}

export default NoNotes;
