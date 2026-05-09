import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserCircle } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // FIXED USER STATE
  const [user, setUser] = useState(null);

  // popup states
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // latest user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, [location]);

  const handleLogout = async function () {
    localStorage.removeItem("user");

    setUser(null);

    alert("User logged out successfully!");

    navigate("/login");
  };

  // open popup
  const handleOpenEdit = () => {
    setUsername(user.username);
    setEmail(user.email);

    setIsEditOpen(true);
  };

  // update user
  const handleUpdateUser = async () => {
    try {
      if (username.trim() === "" || email.trim() === "") {
        alert("All fields are required");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      let isEmailValid = emailRegex.test(email);

      if (!isEmailValid) {
        alert("Email is not valid");
        return;
      }

      const updatedUser = {
        username,
        email,
      };

      // api call
      const res = await axios.patch(
        "http://localhost:3000/api/auth/update-user",
        updatedUser,
        {
          withCredentials: true,
        },
      );

      // update localStorage
      localStorage.setItem("user", JSON.stringify(res.data.data.user));

      // update state
      setUser(res.data.data.user);

      alert("User updated successfully!");

      setIsEditOpen(false);
    } catch (error) {
      console.log(error);

      alert(error?.response?.data?.message || "Failed to update user");
    }
  };

  // delete account
  const handleDeleteAccount = async () => {
    try {
      const confirmDelete = confirm(
        "Are you sure you want to delete your account?",
      );

      if (!confirmDelete) return;

      await axios.delete("http://localhost:3000/api/auth/remove-user", {
        withCredentials: true,
      });

      localStorage.removeItem("user");

      setUser(null);
      setIsEditOpen(false);

      alert("Account deleted successfully!");

      navigate("/register");
    } catch (error) {
      console.log(error);

      alert(error?.response?.data?.message || "Failed to delete account");
    }
  };

  const hideUserSection =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      <div className="flex justify-between bg-[#111c44] border-b border-gray-700 items-center px-6 py-4 text-white sticky top-0 z-40">
        <div
          onClick={() => navigate("/note")}
          className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent cursor-pointer"
        >
          NoteTracker
        </div>

        {user && !hideUserSection && (
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
        )}
      </div>

      {/* edit popup */}
      {isEditOpen && (
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
      )}
    </>
  );
}

export default Navbar;
