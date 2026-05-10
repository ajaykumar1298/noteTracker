import React from "react";

function UserEditInfo({
  setIsEditOpen,
  username,
  setUsername,
  email,
  setEmail,
  handleDeleteAccount,
  handleUpdateUser,
}) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex justify-center items-center z-50 px-4">
      <div
        className="w-full max-w-md rounded-3xl p-6 relative
    bg-white/90 dark:bg-[#1f1a17]/95
    backdrop-blur-xl
    border border-orange-200 dark:border-yellow-900/40

    shadow-2xl transition-all duration-300"
      >
        {/* close btn */}
        <button
          onClick={() => setIsEditOpen(false)}
          className="cursor-pointer absolute top-4 right-4
      text-gray-500 dark:text-gray-400
      hover:text-orange-500 dark:hover:text-orange-400
      text-xl font-bold transition-all"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">
          Edit Profile
        </h2>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
          Update your account details.
        </p>

        <div className="space-y-5">
          <div>
            <label className=" text-orange-700 dark:text-orange-300">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full mt-2 rounded-xl px-4 py-3
          bg-orange-50 dark:bg-[#2a211d]
          text-gray-800 dark:text-white
          border border-orange-200 dark:border-yellow-800
          outline-none focus:ring-1 focus:ring-orange-400
          transition-all"
            />
          </div>

          <div>
            <label className=" text-orange-700 dark:text-orange-300">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full mt-2 rounded-xl px-4 py-3
          bg-orange-50 dark:bg-[#2a211d]
          text-gray-800 dark:text-white
          border border-orange-200 dark:border-yellow-800
          outline-none focus:ring-1 focus:ring-orange-400
          transition-all"
            />
          </div>

          {/* buttons */}
          <div className="flex justify-end gap-4 items-center pt-4">
            {/* delete account */}
            <button
              onClick={handleDeleteAccount}
              className="cursor-pointer px-5 py-2 rounded-xl font-medium text-white bg-red-500 hover:bg-red-600"
            >
              Delete Account
            </button>

            {/* save */}
            <button
              onClick={handleUpdateUser}
              className="cursor-pointer px-5 py-2 rounded-xl font-medium text-white bg-orange-500 hover:bg-orange-600"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserEditInfo;
