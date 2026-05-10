import React, { useEffect, useState } from "react";
import axios from "axios";
import { addNote, deleteNote, getNotes, updateNote } from "../api/noteApi";

function Note() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [notes, setNotes] = useState([]);

  // CHANGED
  const [loading, setLoading] = useState(true);

  // edit states
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [page, setPage] = useState(1);

  const notesPerPage = 6;

  // fetch notes
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await getNotes();
      // small delay for smooth UI
      setTimeout(() => {
        setNotes(res.data.notes);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Failed to fetch notes");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // add note
  const handleAddNote = async () => {
    try {
      if (title.trim() === "" || desc.trim() === "") {
        alert("Title and Description are required");
        return;
      }
      const newNote = {
        title,
        desc,
      };

      const res = await addNote(newNote);

      setNotes([res.data.note, ...notes]);
      setTitle("");
      setDesc("");
      alert("Note added successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to add note");
    }
  };

  // delete note
  const handleDeleteNote = async (id) => {
    try {
      const confirmDelete = confirm(
        "Are you sure you want to delete this note?",
      );
      if (!confirmDelete) return;
      await deleteNote(id);
      const updatedNotes = notes.filter((note) => note._id !== id);
      setNotes(updatedNotes);
      alert("Note deleted successfully!");
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Failed to delete note");
    }
  };

  // open edit modal
  const handleEditClick = (note) => {
    setEditId(note._id);
    setEditTitle(note.title);
    setEditDesc(note.desc);

    setIsEditModalOpen(true);
  };

  // close modal
  const handleCloseModal = () => {
    setIsEditModalOpen(false);

    setEditId(null);
    setEditTitle("");
    setEditDesc("");
  };

  // update note
  const handleUpdateNote = async (id) => {
    try {
      if (editTitle.trim() === "" || editDesc.trim() === "") {
        alert("Title and Description are required");
        return;
      }

      const updatedData = {
        title: editTitle,
        desc: editDesc,
      };

      const res = await updateNote(id, updatedData);

      const newNotes = notes.map((note) =>
        note._id === id ? res.data.note : note,
      );
      setNotes(newNotes);
      setIsEditModalOpen(false);
      alert("Note updated successfully!");
    } catch (error) {
      console.log(error);

      alert(error?.response?.data?.message || "Failed to update note");
    }
  };

  // pagination
  const totalPages = Math.ceil(notes.length / notesPerPage);

  const startIndex = (page - 1) * notesPerPage;

  const endIndex = startIndex + notesPerPage;

  const currentNotes = notes.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-[#071028] text-white px-4 py-10">
      {/* heading */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl font-bold">Welcome Back 👋</h1>

        <p className="text-gray-400 mt-2">
          Manage your personal notes beautifully and efficiently.
        </p>
      </div>

      {/* layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* create note */}
        <div className="lg:col-span-1">
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
        </div>

        {/* notes section */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold">Your Notes</h2>

              <p className="text-gray-400 text-sm mt-1">
                {!loading && <>Total Notes: {notes.length}</>}
              </p>
            </div>
          </div>

          {/* skeleton loading */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
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
          )}

          {/* no notes */}
          {!loading && notes.length === 0 && (
            <div className="bg-[#111c44] border border-dashed border-gray-600 rounded-3xl p-12 text-center">
              <div className="text-6xl mb-4">📝</div>

              <h2 className="text-2xl font-semibold mb-2">No Notes Yet</h2>

              <p className="text-gray-400">
                Start by creating your first note.
              </p>
            </div>
          )}

          {/* notes list */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentNotes.map((note) => (
                <div
                  key={note._id}
                  className="bg-[#111c44] border border-gray-700 hover:border-blue-500 transition-all rounded-3xl p-6 shadow-lg hover:-translate-y-1"
                >
                  <h3 className="text-xl font-bold text-blue-400 break-words">
                    {note.title}
                  </h3>

                  <p className="text-gray-300 mt-4 leading-7 break-words">
                    {note.desc}
                  </p>

                  <div className="mt-6 flex justify-end gap-5 items-center">
                    <button
                      onClick={() => handleEditClick(note)}
                      className="text-sm bg-orange-400 hover:bg-orange-500 p-2 rounded-lg cursor-pointer"
                    >
                      Update
                    </button>

                    <button
                      className="cursor-pointer bg-red-500 hover:bg-red-600 text-sm rounded-lg p-2"
                      onClick={() => {
                        handleDeleteNote(note._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* edit modal */}
          {isEditModalOpen && (
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
          )}

          {/* pagination */}
          {!loading && notes.length > notesPerPage && (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Note;
