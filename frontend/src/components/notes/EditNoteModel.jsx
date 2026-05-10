import React from "react";

function EditNoteModel({
  handleCloseModal,
  editTitle,
  setEditTitle,
  editDesc,
  setEditDesc,
  handleUpdateNote,
  editId,
}) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex justify-center items-center z-50 px-4">
      <div
        className="w-full max-w-lg rounded-3xl p-6 relative
    bg-white/90 dark:bg-[#1f1a17]/95
    backdrop-blur-xl
    border border-orange-200 dark:border-orange-900/40
    shadow-2xl transition-all duration-300"
      >
        <button
          onClick={handleCloseModal}
          className="absolute top-4 right-4
      text-gray-500 dark:text-gray-400
      hover:text-orange-500 dark:hover:text-orange-400
      text-2xl transition-all"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">
          Update Note
        </h2>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
          Edit your note details below.
        </p>

        <div className="space-y-5">
          <div>
            <label className="text-sm text-orange-700 dark:text-orange-300">
              Note Title
            </label>

            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full mt-2 rounded-xl px-4 py-3
          bg-orange-50 dark:bg-[#2a211d]
          text-gray-800 dark:text-white
          border border-orange-200 dark:border-orange-800
          outline-none focus:ring-2 focus:ring-orange-400
          transition-all"
            />
          </div>

          <div>
            <label className="text-sm text-orange-700 dark:text-orange-300">
              Description
            </label>

            <textarea
              rows="5"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              className="w-full mt-2 rounded-xl px-4 py-3 resize-none
          bg-orange-50 dark:bg-[#2a211d]
          text-gray-800 dark:text-white
          border border-orange-200 dark:border-orange-800
          outline-none focus:ring-2 focus:ring-orange-400
          transition-all"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={handleCloseModal}
              className="px-5 py-2 rounded-xl
          bg-gray-400 dark:bg-[#2a211d]
          text-gray-700 dark:text-gray-300
          hover:bg-gray-500 dark:hover:bg-[#3a2b24]
          transition-all"
            >
              Cancel
            </button>

            <button
              onClick={() => handleUpdateNote(editId)}
              className="px-5 py-2 rounded-xl text-white
          bg-gradient-to-r from-orange-500 to-amber-500
          hover:from-orange-600 hover:to-amber-600
          transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditNoteModel;
