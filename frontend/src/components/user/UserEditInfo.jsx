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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="bg-[#111c44] border border-gray-700 w-full max-w-md rounded-3xl p-6 shadow-2xl relative">
        {/* close btn */}
        <button
          onClick={() => setIsEditOpen(false)}
          className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold"
        >
          X
        </button>

        <h2 className="text-2xl font-bold text-white mb-2">Edit Profile</h2>

        <p className="text-gray-400 text-sm mb-6">
          Update your account details.
        </p>

        <div className="space-y-5">
          <div>
            <label className="text-sm text-gray-300">Username</label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full mt-2 bg-[#1d2a52] border border-gray-600 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-white"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full mt-2 bg-[#1d2a52] border border-gray-600 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-white"
            />
          </div>

          {/* buttons */}
          <div className="flex justify-end gap-4 items-center pt-4">
            {/* delete account */}
            <button
              onClick={handleDeleteAccount}
              className="cursor-pointer bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl font-medium text-white"
            >
              Delete Account
            </button>

            {/* save */}
            <button
              onClick={handleUpdateUser}
              className="cursor-pointer bg-green-500 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-medium"
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
