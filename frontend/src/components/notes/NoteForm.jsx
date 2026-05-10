import React from "react";

function NoteForm({ title, desc, setTitle, setDesc, handleAddNote }) {
  return (
    <div
      className="rounded-3xl p-6 sticky top-6
  bg-white/80 dark:bg-[#1f1a17]/90
  backdrop-blur-xl
  border border-orange-200 dark:border-yellow-900/40
  shadow-2xl transition-all duration-300"
    >
      <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">
        Create Note
      </h2>

      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
        Add your thoughts and ideas quickly.
      </p>

      <div className="space-y-5">
        <div>
          <label className=" text-orange-700 dark:text-orange-300">
            Note Title
          </label>

          <input
            type="text"
            placeholder="Enter note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-2 rounded-xl px-4 py-3
  bg-orange-50 dark:bg-[#2a211d]
  text-gray-800 dark:text-white
  placeholder:text-gray-500 dark:placeholder:text-gray-400
  border border-orange-200 dark:border-yellow-800
  outline-none focus:ring-1 focus:ring-orange-400
  transition-all"
          />
        </div>

        <div>
          <label className=" text-orange-700 dark:text-orange-300">
            Description
          </label>

          <textarea
            rows="6"
            placeholder="Write your note description..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full mt-2 rounded-xl px-4 py-3
  bg-orange-50 dark:bg-[#2a211d]
  text-gray-800 dark:text-white
  placeholder:text-gray-500 dark:placeholder:text-gray-400
  border border-orange-200 dark:border-yellow-800
  outline-none focus:ring-1 focus:ring-orange-400
  transition-all"
          />
        </div>

        <button
          onClick={handleAddNote}
          className="w-full py-3 rounded-xl font-semibold text-white bg-orange-500 hover:bg-orange-600"
        >
          Add Note
        </button>
      </div>
    </div>
  );
}

export default NoteForm;
