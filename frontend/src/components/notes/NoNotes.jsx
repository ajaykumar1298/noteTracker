import React from "react";

function NoNotes() {
  return (
    <div className="bg-[#111c44] border border-dashed border-gray-600 rounded-3xl p-12 text-center">
      <div className="text-6xl mb-4">📝</div>

      <h2 className="text-2xl font-semibold mb-2">No Notes Yet</h2>

      <p className="text-gray-400">Start by creating your first note.</p>
    </div>
  );
}

export default NoNotes;
