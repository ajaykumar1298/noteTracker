import React, { useState } from "react";

function NoteCard({ note, handleEditClick, handleDeleteNote }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const MAX_LENGTH = 180;

  const shouldShowButton = note.desc.length > MAX_LENGTH;

  const displayedText = isExpanded ? note.desc : note.desc.slice(0, MAX_LENGTH);

  return (
    <div
      className="rounded-3xl p-6 shadow-xl flex flex-col
  bg-white/80 dark:bg-[#1f1a17]/90
  backdrop-blur-xl
  border border-yellow-200 dark:border-yellow-900/40
  hover:border-yellow-400 dark:hover:border-yellow-700
  hover:-translate-y-1
  transition-all duration-300"
    >
      {/* Title */}
      <h3
        className="text-xl font-bold
    text-orange-600 dark:text-orange-400
    break-words mb-3"
      >
        {note.title}
      </h3>

      {/* Description */}
      <div>
        <p className="text-gray-700 dark:text-gray-300 leading-7 break-words">
          {displayedText}
          {!isExpanded && shouldShowButton && "..."}
        </p>

        {shouldShowButton && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 text-sm font-medium cursor-pointer transition-all"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-5 flex justify-end gap-3">
        <button
          onClick={() => handleEditClick(note)}
          className="px-4 py-2 rounded-xl text-sm font-medium text-white
    bg-orange-500 hover:bg-orange-600
     cursor-pointer"
        >
          Edit
        </button>

        <button
          onClick={() => handleDeleteNote(note._id)}
          className="px-4 py-2 rounded-xl text-sm font-medium text-white
          bg-red-500 hover:bg-red-600  
          cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
