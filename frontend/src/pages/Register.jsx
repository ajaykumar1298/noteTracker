import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleRegister = async function () {
    try {
      if (form.username.trim() == "") {
        alert("Username cannot be empty");
        return;
      }
      if (form.email.trim() == "") {
        alert("Email cannot be empty");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let email = emailRegex.test(form.email);
      if (!email) {
        alert("email is not valid");
        return;
      }
      if (form.password.trim() == "") {
        alert("Password cannot be empty");
        return;
      }

      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          username: form.username,
          email: form.email,
          password: form.password,
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
      alert("New user add successfully!");
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
    <div className="text-white min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 px-4 pt-16">
      <div className="flex justify-center">
        <div className="p-8 w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl">
          <h2 className="text-xl text-center text-gray-200 mb-6">Register</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="text-gray-400 text-sm">
                User Name
              </label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="Enter user name"
                className="w-full mt-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-gray-400 text-sm">
                User Email
              </label>
              <input
                required={true}
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Enter user email"
                className="w-full mt-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-gray-400 text-sm">
                User Password
              </label>
              <input
                type="text"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Enter user password"
                className="w-full mt-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold "
              onClick={() => {
                handleRegister();
              }}
            >
              Register
            </button>
            <div className="text-center mt-4 text-gray-400 text-sm">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/")}
                className="text-blue-400 cursor-pointer hover:underline"
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
