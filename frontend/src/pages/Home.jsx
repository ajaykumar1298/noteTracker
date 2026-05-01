import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const user = sessionStorage.getItem("username");

  const [data, setData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editNote, setEditNote] = useState({
    title: "",
    desc: "",
    id: "",
  });

  // crate note
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddNote = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/note/add",
        { title, desc: description },
        {
          withCredentials: true,
        },
      );
      console.log(res);
      alert(res.data.message);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
      const msg = error?.response?.data?.message || "Something went wrong";
      alert(msg);
    }
  };

  //delete note
  const handleDelete = async function (note) {
    try {
      const res = await axios.delete(
        "http://localhost:3000/api/note/remove/" + note._id,
        {
          withCredentials: true,
        },
      );

      alert(res.data.message);

      setData((prev) => prev.filter((n) => n._id !== note._id));
    } catch (error) {
      console.log(error);
      const msg = error?.response?.data?.message || "Something went wrong";
      alert(msg);
    }
  };

  // fetch note
  const handleNotes = async function () {
    try {
      let res = await axios.get("http://localhost:3000/api/note/all-notes", {
        withCredentials: true,
      });

      setData(res.data.data.notes);
    } catch (error) {
      console.log(error);
      setData([]);
    }
  };

  //  model handle
  const handleEditClick = (note) => {
    setEditNote({
      title: note.title,
      desc: note.desc,
      id: note._id,
    });

    setIsModalOpen(true);
  };

  // update note
  const handleUpdate = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/note/update/${editNote.id}`,
        {
          title: editNote.title,
          desc: editNote.desc,
        },
        { withCredentials: true },
      );

      alert(res.data.message);

      setData((prev) =>
        prev.map((n) =>
          n._id === editNote.id
            ? { ...n, title: editNote.title, desc: editNote.desc }
            : n,
        ),
      );

      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Update failed");
    }
  };

  // auth check
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // load notes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleNotes();
  }, []);

  if (!user) return null;

  // data not found
  if (data.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white px-4">
        <h1 className="text-2xl font-bold mb-2">No Notes Yet 📭</h1>
        <p className="text-gray-400 mb-4">Start by creating your first note</p>

        <button
          onClick={() => navigate("/Create-note")}
          className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg cursor-pointer"
        >
          Create Note
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white  py-8">
      {/* all notes */}
      <div className="max-w-4xl mx-auto px-4 ">
        {/* Heading */}
        <h1 className="text-3xl font-bold mb-8  text-center">📒 All Notes</h1>

        {/* Notes List */}
        <div className="space-y-4">
          {data.map((note) => (
            <div
              key={note._id}
              className="w-full bg-gray-950 rounded-xl shadow-md p-5 flex flex-col gap-3 transition duration-200 border border-transparent hover:border-blue-400 hover:ring-2 hover:ring-blue-400"
            >
              {/* Title */}
              <h2 className="text-xl font-semibold text-blue-400">
                {note.title}
              </h2>

              {/* Description */}
              <p className="text-gray-300">{note.desc}</p>

              {/* Footer */}
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400">✍️ {note.user.username}</p>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(note)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-1 cursor-pointer rounded-lg text-sm"
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-500 hover:bg-red-600 px-4 py-1 cursor-pointer rounded-lg text-sm"
                    onClick={() => handleDelete(note)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* edit model */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)} // outside click close
        >
          {/* Modal Box */}
          <div
            className="bg-[#0f172a] text-white w-[420px] rounded-2xl p-6 shadow-xl border border-gray-700"
            onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
          >
            <h2 className="text-2xl font-bold mb-5">Edit Note ✏️</h2>

            {/* Title */}
            <label className="text-sm text-gray-400 mb-1 block">Title</label>
            <input
              type="text"
              value={editNote.title}
              onChange={(e) =>
                setEditNote({ ...editNote, title: e.target.value })
              }
              className="w-full p-3 mb-4 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Description */}
            <label className="text-sm text-gray-400 mb-1 block">
              Description
            </label>
            <textarea
              value={editNote.desc}
              onChange={(e) =>
                setEditNote({ ...editNote, desc: e.target.value })
              }
              className="w-full p-3 mb-5 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
