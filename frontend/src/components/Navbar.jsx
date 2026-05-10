import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserCircle } from "lucide-react";
import { deleteUser, updateUser } from "../api/authApi";
import UserInfo from "./user/UserInfo";
import UserEditInfo from "./user/UserEditInfo";
import ThemeToggle from "./ThemeToggler";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // user state
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

  // user logout
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

      const editData = {
        username,
        email,
      };

      // api call
      const res = await updateUser(editData);

      // update localStorage
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // update state
      setUser(res.data.user);

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

      await deleteUser();
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
          className="text-base sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent cursor-pointer"
        >
          NoteTracker
        </div>
        <div className="flex flex-row gap-4">
          <ThemeToggle />

          {user && !hideUserSection && (
            <UserInfo
              handleOpenEdit={handleOpenEdit}
              user={user}
              handleLogout={handleLogout}
            />
          )}
        </div>
      </div>

      {/* edit popup */}
      {isEditOpen && (
        <UserEditInfo
          setIsEditOpen={setIsEditOpen}
          username={username}
          setUsername={setUsername}
          email={email}
          setEmail={setEmail}
          handleDeleteAccount={handleDeleteAccount}
          handleUpdateUser={handleUpdateUser}
        />
      )}
    </>
  );
}

export default Navbar;
