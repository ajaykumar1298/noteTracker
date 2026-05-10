import React, { useState } from "react";

function NoteCard({ note, handleEditClick, handleDeleteNote }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const MAX_LENGTH = 180;

  const shouldShowButton = note.desc.length > MAX_LENGTH;

  const displayedText = isExpanded ? note.desc : note.desc.slice(0, MAX_LENGTH);

  return (
    <div className="bg-[#111c44] border border-gray-700 hover:border-blue-500 transition-all duration-300 rounded-2xl p-6 shadow-lg hover:-translate-y-1 flex flex-col">
      {/* Title */}
      <h3 className="text-xl font-bold text-blue-400 break-words mb-3">
        {note.title}
      </h3>

      {/* Description */}
      <div>
        <p className="text-gray-300 leading-7 break-words">
          {displayedText}
          {!isExpanded && shouldShowButton && "..."}
        </p>

        {shouldShowButton && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-blue-400 hover:text-blue-300 text-sm font-medium cursor-pointer"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-5 flex justify-end gap-3">
        <button
          onClick={() => handleEditClick(note)}
          className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
        >
          Update
        </button>

        <button
          onClick={() => handleDeleteNote(note._id)}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
