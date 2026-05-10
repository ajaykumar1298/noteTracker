import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { validateEmail } from "../utils/validators";
import { loginUser } from "../api/authApi";
import { setUser } from "../utils/storage";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      if (!email || !password) {
        alert("All fields are required");
        return;
      }

      if (!validateEmail(email)) {
        alert("Invalid Email");
        return;
      }

      const data = await loginUser({ email, password });
      let userDetail = {
        username: data.data.user.username,
        email: data.data.user.email,
      };
      setUser(userDetail);
      alert("Login Successful");
      navigate("/note");
    } catch (error) {
      console.log(error);

      alert(error?.response?.data?.message || "Login Failed");
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
    border border-orange-200 dark:border-orange-900/40
    shadow-2xl"
        >
          <h2
            className="text-2xl font-bold text-center
      text-orange-600 dark:text-orange-400 mb-6"
          >
            Login to your account
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="text-orange-700 dark:text-orange-300 text-sm"
              >
                Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter user Email"
                className="w-full mt-1 p-3 rounded-xl
            bg-orange-50 dark:bg-[#2a211d]
            text-gray-800 dark:text-white
            border border-orange-200 dark:border-orange-800
            focus:outline-none focus:ring-2 focus:ring-orange-400
            text-sm transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-orange-700 dark:text-orange-300 text-sm"
              >
                password
              </label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter user password"
                className="w-full mt-1 p-3 rounded-xl
            bg-orange-50 dark:bg-[#2a211d]
            text-gray-800 dark:text-white
            border border-orange-200 dark:border-orange-800
            focus:outline-none focus:ring-2 focus:ring-orange-400
            text-sm transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-4
          bg-gradient-to-r from-orange-600 to-amber-500
          hover:from-orange-700 hover:to-amber-600
          rounded-xl font-semibold text-white"
              onClick={() => {
                handleLogin();
              }}
            >
              Login
            </button>
          </div>
          <div className="text-center mt-4 text-gray-600 dark:text-gray-400 text-sm">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-orange-500 dark:text-orange-400 cursor-pointer hover:underline font-medium"
            >
              Signup
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
