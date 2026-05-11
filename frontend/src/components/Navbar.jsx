import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { deleteUser, updateUser } from "../api/authApi";
import UserInfo from "./user/UserInfo";
import UserEditInfo from "./user/UserEditInfo";
import ThemeToggle from "./ThemeToggler";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // user state
  const [user, setUser] = useState(null);

  // mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // dark mode
  const [darkMode, setDarkMode] = useState(false);

  // popup states
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // dark mode
  useEffect(() => {
    const theme = sessionStorage.getItem("theme");

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      sessionStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      sessionStorage.setItem("theme", "dark");
    }

    setDarkMode(!darkMode);
  };

  // latest user from sessionStorage
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    setUser(storedUser);
  }, [location]);

  // user logout
  const handleLogout = async () => {
    setIsMenuOpen(false);

    sessionStorage.removeItem("user");

    setUser(null);

    alert("User logged out successfully!");

    navigate("/login");
  };

  // open popup
  const handleOpenEdit = () => {
    setUsername(user.username);
    setEmail(user.email);

    setIsEditOpen(true);

    setIsMenuOpen(false);
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

      // update sessionStorage
      sessionStorage.setItem("user", JSON.stringify(res.data.user));

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

      sessionStorage.removeItem("user");

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
      {/* navbar */}
      <div
        className="flex justify-between items-center px-4 sm:px-6 py-4 sticky top-0 z-40
bg-white/80 dark:bg-[#1a120b]/90
backdrop-blur-xl
 dark:border-orange-900/40
shadow-none
transition-all duration-300 text-gray-800 dark:text-white"
      >
        {/* logo */}
        <div
          onClick={() => navigate("/note")}
          className="text-2xl font-bold 
bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 
bg-clip-text text-transparent cursor-pointer"
        >
          NoteTracker
        </div>

        {/* desktop view */}
        <div className="hidden sm:flex items-center gap-4">
          <ThemeToggle toggleTheme={toggleTheme} darkMode={darkMode} />

          {user && !hideUserSection && (
            <UserInfo
              handleOpenEdit={handleOpenEdit}
              user={user}
              handleLogout={handleLogout}
            />
          )}
        </div>

        {/* mobile hamburger */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-xl
bg-orange-100 dark:bg-[#2a1d14]
hover:scale-105 transition duration-200"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* overlay */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="sm:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
        />
      )}

      {/* mobile dropdown */}
      {isMenuOpen && (
        <div
          className="sm:hidden fixed top-[74px] right-4 z-50
w-56 rounded-2xl
bg-white dark:bg-[#1f1711]
shadow-2xl
border border-orange-100 dark:border-orange-900/40
p-4 flex flex-col gap-4
animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <ThemeToggle toggleTheme={toggleTheme} darkMode={darkMode} />

          {user && !hideUserSection && (
            <UserInfo
              handleOpenEdit={handleOpenEdit}
              user={user}
              handleLogout={handleLogout}
            />
          )}
        </div>
      )}

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
