import React from "react";

function NoteForm({ title, desc, setTitle, setDesc, handleAddNote }) {
  return (
    <div className="bg-[#111c44] border border-gray-700 rounded-3xl p-6 shadow-2xl sticky top-6">
      <h2 className="text-2xl font-bold mb-1">Create Note</h2>

      <p className="text-gray-400 text-sm mb-6">
        Add your thoughts and ideas quickly.
      </p>

      <div className="space-y-5">
        <div>
          <label className="text-sm text-gray-300">Note Title</label>

          <input
            type="text"
            placeholder="Enter note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-2 bg-[#1d2a52] border border-gray-600 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Description</label>

          <textarea
            rows="6"
            placeholder="Write your note description..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full mt-2 bg-[#1d2a52] border border-gray-600 rounded-xl px-4 py-3 outline-none focus:border-blue-500 resize-none"
          />
        </div>

        <button
          onClick={handleAddNote}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.01] transition-all py-3 rounded-xl font-semibold"
        >
          Add Note
        </button>
      </div>
    </div>
  );
}

export default NoteForm;
