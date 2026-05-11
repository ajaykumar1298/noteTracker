import React, { useEffect, useState } from "react";
import axios from "axios";
import { addNote, deleteNote, getNotes, updateNote } from "../api/noteApi";
import NoteForm from "../components/notes/NoteForm";
import NoNotes from "../components/notes/NoNotes";
import NoteCard from "../components/notes/NoteCard";
import EditNoteModel from "../components/notes/EditNoteModel";
import PaginationComp from "../components/PaginationComp";
import NoteCardSkeletonComp from "../components/notes/NoteCardSkeletonComp";
import toast from "react-hot-toast";
// import Pagination from "../components/pagination";

function Note() {
  // note form
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [notes, setNotes] = useState([]);

  // loading
  const [loading, setLoading] = useState(true);

  // edit states
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [page, setPage] = useState(1);

  const notesPerPage = 10;

  // fetch notes
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await getNotes();
      // small delay for smooth UI
      setTimeout(() => {
        let arr = [...res.data.notes].reverse();
        setNotes(arr);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to fetch notes");
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
        toast.error("Title and Description are required");
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
      toast.success("Note added successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add note");
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
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to delete note");
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
        toast.error("Title and Description are required");
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
      toast.success("Note updated successfully!");
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Failed to update note");
    }
  };

  // pagination
  const totalPages = Math.ceil(notes.length / notesPerPage);

  const startIndex = (page - 1) * notesPerPage;

  const endIndex = startIndex + notesPerPage;

  const currentNotes = notes.slice(startIndex, endIndex);

  useEffect(() => {
    const updatedTotalPages = Math.ceil(notes.length / notesPerPage);

    if (page > updatedTotalPages && updatedTotalPages > 0) {
      setPage(updatedTotalPages);
    }
  }, [notes, page]);

  return (
    <div
      className="min-h-screen px-4 py-10
  bg-gradient-to-br
  from-orange-50 via-amber-50 to-yellow-100
  dark:from-[#120d08] dark:via-[#1b140f] dark:to-[#24160f]
  text-gray-800 dark:text-white
  transition-all duration-300"
    >
      {/* heading */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1
          className="text-4xl sm:text-5xl font-extrabold tracking-tight
      bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500
      bg-clip-text text-transparent"
        >
          Welcome Back 👋
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mt-3 text-base sm:text-lg">
          Manage your personal notes beautifully and efficiently.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* create note */}
        <div className="lg:col-span-1">
          <NoteForm
            title={title}
            desc={desc}
            setTitle={setTitle}
            setDesc={setDesc}
            handleAddNote={handleAddNote}
          />
        </div>

        {/* notes section */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2
                className="text-3xl font-bold
            text-orange-600 dark:text-orange-400"
              >
                Your Notes
              </h2>

              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                {!loading && <>Total Notes: {notes.length}</>}
              </p>
            </div>
          </div>

          {/* skeleton loading */}
          {loading && <NoteCardSkeletonComp />}

          {/* no notes */}
          {!loading && notes.length === 0 && <NoNotes />}

          {/* notes list */}
          {!loading && (
            <div className="grid grid-cols-1 gap-6 items-stretch">
              {currentNotes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  handleEditClick={handleEditClick}
                  handleDeleteNote={handleDeleteNote}
                />
              ))}
            </div>
          )}

          {/* edit modal */}
          {isEditModalOpen && (
            <EditNoteModel
              handleCloseModal={handleCloseModal}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editDesc={editDesc}
              setEditDesc={setEditDesc}
              handleUpdateNote={handleUpdateNote}
              editId={editId}
            />
          )}

          {/* pagination */}
          {!loading && notes.length > notesPerPage && (
            <PaginationComp
              page={page}
              setPage={setPage}
              totalPages={totalPages}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Note;
