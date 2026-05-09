import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async function () {
    try {
      // check email
      if (email.trim() == "") {
        alert("Email cannot be empty");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let checkEmail = emailRegex.test(email);
      if (!checkEmail) {
        alert("email is not valid");
        return;
      }

      //check password
      if (password.trim() == "") {
        alert("password cannot be empty");
        return;
      }

      //   login user
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: res.data.data.user.email,
          username: res.data.data.user.username,
        }),
      );
      alert("user logged in successfully!");
      navigate("/note");
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "something went wrong");
    }
  };
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));

  //   if (user) {
  //     navigate("/note");
  //   }
  // }, []);

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
