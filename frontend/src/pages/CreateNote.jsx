import { useState } from "react";
import { addNote } from "../services/api";

function CreateNote() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddNote = async () => {
    try {
      const res = await addNote({ title, desc: description });
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

  return (
    <div className="min-h-screen px-6 py-10">
      <h1 className="text-3xl font-semibold text-white mb-8 text-center">
        Create Note
      </h1>

      <div className="w-full max-w-5xl mx-auto">
        {/* Title */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2 text-sm">Title</label>
          <input
            type="text"
            placeholder="Enter note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2 text-sm">
            Description
          </label>
          <textarea
            rows="10"
            placeholder="Enter note description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleAddNote}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          Add Note
        </button>
      </div>
    </div>
  );
}

export default CreateNote;
