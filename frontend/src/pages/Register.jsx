import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/validators";
import { registerUser } from "../api/authApi";
import { setUser } from "../utils/storage";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleRegister = async function () {
    try {
      if (!form.username || !form.email || !form.password) {
        alert("All fields are required");
        return;
      }
      if (!validateEmail(form.email)) {
        alert("Invalid Email");
        return;
      }

      const data = await registerUser(form);
      let userDetail = {
        username: data.data.user.username,
        email: data.data.user.email,
      };
      setUser(userDetail);
      alert("New user add successfully!");
      navigate("/note");
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "something went wrong");
    }
  };

  return (
    <div
      className="min-h-screen px-4 pt-16
bg-gradient-to-br
from-orange-50
via-amber-50
to-yellow-100
dark:from-[#120d08]
dark:via-[#1b140f]
dark:to-[#24160f]
transition-all duration-300"
    >
      <div className="flex justify-center">
        <div
          className="p-8 w-full max-w-md
    bg-white/80 dark:bg-[#1f1a17]/90
    backdrop-blur-xl
    rounded-3xl
     dark:border-orange-900/40
    shadow-2xl"
        >
          <h2
            className="text-2xl font-bold text-center
      text-orange-600 dark:text-orange-400 mb-6"
          >
            Register
          </h2>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="text-orange-700 dark:text-orange-300 "
              >
                User Name
              </label>

              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="Enter user name"
                className="w-full mt-1 p-3 rounded-xl
            bg-orange-50 dark:bg-[#2a211d]
            text-gray-800 dark:text-white
            border border-orange-200 dark:border-yellow-800
            focus:outline-none focus:ring-1 focus:ring-orange-400
            text-sm transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-orange-700 dark:text-orange-300"
              >
                User Email
              </label>

              <input
                required={true}
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Enter user email"
                className="w-full mt-1 p-3 rounded-xl
            bg-orange-50 dark:bg-[#2a211d]
            text-gray-800 dark:text-white
            border border-orange-200 dark:border-yellow-800
            focus:outline-none focus:ring-1 focus:ring-orange-400
            text-sm transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-orange-700 dark:text-orange-300 "
              >
                User Password
              </label>

              <input
                type="text"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Enter user password"
                className="w-full mt-1 p-3 rounded-xl
            bg-orange-50 dark:bg-[#2a211d]
            text-gray-800 dark:text-white
            border border-orange-200 dark:border-yellow-800
            focus:outline-none focus:ring-1 focus:ring-orange-400
            text-sm transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-4 bg-orange-500 hover:bg-orange-600
          rounded-xl font-semibold text-white"
              onClick={() => {
                handleRegister();
              }}
            >
              Register
            </button>

            <div className="text-center mt-4 text-gray-600 dark:text-gray-400 text-sm">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/")}
                className="text-orange-500 dark:text-orange-400 cursor-pointer hover:underline font-medium"
              >
                Login
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
