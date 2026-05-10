import { UserCircle } from "lucide-react";
import React from "react";

function UserInfo({ handleOpenEdit, user, handleLogout }) {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleOpenEdit}
        className="cursor-pointer border border-gray-600 hover:border-blue-500 px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2"
      >
        <UserCircle size={20} />

        <span>{user.username}</span>
      </button>

      <button
        onClick={handleLogout}
        className="cursor-pointer bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl text-sm font-medium transition-all"
      >
        Logout
      </button>
    </div>
  );
}

export default UserInfo;
