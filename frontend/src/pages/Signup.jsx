import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4 pt-16">
      {/* BIG TITLE OUTSIDE */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-orange-400 to-white text-transparent bg-clip-text">
          Note Tracker
        </h1>
      </div>

      {/* CARD */}
      <div className="flex justify-center">
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-2xl">
          <h2 className="text-xl text-center text-gray-200 mb-6">Create your account</h2>

          <form className="space-y-4">
            {/* Handle */}
            <div>
              <label className="text-gray-400 text-sm">User Handle</label>
              <input
                type="text"
                placeholder="Enter handle"
                className="text-sm w-full mt-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Username */}
            <div>
              <label className="text-gray-400 text-sm">User Name</label>
              <input
                type="text"
                placeholder="Enter username"
                className="text-sm w-full mt-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-400 text-sm">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className="text-sm w-full mt-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-400 text-sm">Password</label>
              <input
                type="password"
                placeholder="Create password"
                className="text-sm w-full mt-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-gradient-to-r from-green-400 to-green-600 rounded-lg font-semibold  shadow-lg"
            >
              Signup
            </button>

            {/* Login Redirect */}
            <div className="text-center mt-4 text-gray-400 text-sm">
              Already have an account?{" "}
              <span onClick={() => navigate("/login")} className="text-blue-400 cursor-pointer hover:underline">
                Login
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
