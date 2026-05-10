import { UserCircle } from "lucide-react";
import React from "react";

function UserInfo({ handleOpenEdit, user, handleLogout }) {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleOpenEdit}
        className="cursor-pointer px-4 py-2 rounded-xl text-sm font-medium
    flex items-center gap-2
    bg-white/80 dark:bg-[#1f1a17]/90
    backdrop-blur-xl
    border border-orange-200 dark:border-orange-900/40
    text-orange-600 dark:text-orange-400
    hover:border-orange-400 dark:hover:border-orange-700
    hover:scale-[1.02]
    shadow-md transition-all duration-300"
      >
        <UserCircle size={20} />

        <span>{user.username}</span>
      </button>

      <button
        onClick={handleLogout}
        className="cursor-pointer px-4 py-2 rounded-xl text-sm font-medium text-white
    bg-gradient-to-r from-red-500 to-rose-500
    hover:from-red-600 hover:to-rose-600
    shadow-md shadow-red-300/20
    hover:scale-[1.02]
    transition-all duration-300"
      >
        Logout
      </button>
    </div>
  );
}

export default UserInfo;
