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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="bg-[#111c44] w-full max-w-lg rounded-3xl border border-gray-700 shadow-2xl p-6 relative">
        <button
          onClick={handleCloseModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-1">Update Note</h2>

        <p className="text-gray-400 text-sm mb-6">
          Edit your note details below.
        </p>

        <div className="space-y-5">
          <div>
            <label className="text-sm text-gray-300">Note Title</label>

            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full mt-2 bg-[#1d2a52] border border-gray-600 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Description</label>

            <textarea
              rows="5"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              className="w-full mt-2 bg-[#1d2a52] border border-gray-600 rounded-xl px-4 py-3 outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={handleCloseModal}
              className="bg-gray-600 hover:bg-gray-700 px-5 py-2 rounded-xl"
            >
              Cancel
            </button>

            <button
              onClick={() => handleUpdateNote(editId)}
              className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-xl"
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
