import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";

function Navbar() {
  const user = sessionStorage.getItem("username");
  const navigate = useNavigate();

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const [userData, setUserData] = useState({
    username: sessionStorage.getItem("username") || "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="flex justify-between bg-gray-900 items-center p-4">
      {/* Logo */}
      <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
        Note Tracker
      </div>

      {/* Links */}
      {user && (
        <>
          <div>
            <ul className="flex flex-row gap-4 text-white">
              <li>
                <NavLink to={"/"}>All Notes</NavLink>
              </li>
              <li>
                <NavLink to={"/Create-note"}>Create Note</NavLink>
              </li>
            </ul>
          </div>

          {/* Right Side */}
          <div className="flex flex-row gap-4 items-center">
            {/* USER BUTTON */}
            <button
              onClick={() => setIsUserModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white rounded-lg font-semibold px-4 py-2 transition"
            >
              <UserCircle size={22} />
              <span className="font-bold">Hello {user}</span>
            </button>

            {/* LOGOUT */}
            <button
              className="bg-gradient-to-r from-red-400 to-red-600 rounded-lg font-semibold p-2 text-white"
              onClick={() => {
                sessionStorage.removeItem("username");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        </>
      )}

      {/* ================= USER MODAL ================= */}
      {isUserModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setIsUserModalOpen(false)} // outside click close
        >
          {/* Modal Box */}
          <div
            className="bg-[#0f172a] text-white w-[420px] rounded-2xl p-6 shadow-xl border border-gray-700"
            onClick={(e) => e.stopPropagation()} // prevent close inside click
          >
            <h2 className="text-2xl font-bold mb-5">👤 Profile Settings</h2>

            {/* Username */}
            <label className="text-sm text-gray-400 mb-1 block">Username</label>
            <input
              value={userData.username}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
              className="w-full p-3 mb-4 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Email */}
            <label className="text-sm text-gray-400 mb-1 block">Email</label>
            <input
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              className="w-full p-3 mb-4 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Password */}
            <label className="text-sm text-gray-400 mb-1 block">Password</label>
            <input
              type="password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              className="w-full p-3 mb-5 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Buttons */}
            <div className="flex justify-between items-center">
              {/* DELETE ACCOUNT */}
              <button
                onClick={() => alert("Delete API call here")}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-sm font-semibold"
              >
                Delete Account
              </button>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsUserModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
                >
                  Cancel
                </button>

                <button
                  onClick={() => alert("Update API call here")}
                  className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
