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
    <div className="text-white min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 px-4 pt-16 ">
      <div className="flex justify-center">
        <div className="p-8 w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl">
          <h2 className="text-xl text-center text-gray-200 mb-6">
            Login to your account
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="text-gray-400 text-sm">
                Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter user Email"
                className="w-full mt-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-gray-400 text-sm">
                password
              </label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter user password"
                className="w-full mt-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold "
              onClick={() => {
                handleLogin();
              }}
            >
              Login
            </button>
          </div>
          <div className="text-center mt-4 text-gray-400 text-sm">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-400 cursor-pointer hover:underline"
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
