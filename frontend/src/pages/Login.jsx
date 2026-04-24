import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4 pt-16">
      {/* BIG TITLE OUTSIDE */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-orange-400 to-white text-transparent bg-clip-text">
          Note Tracker
        </h1>
      </div>

      {/* CARD (slightly top aligned) */}
      <div className="flex justify-center">
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-2xl">
          <h2 className="text-xl text-center text-gray-200 mb-6">Login to your account</h2>

          <form className="space-y-4">
            {/* Handle */}
            <div>
              <label className="text-gray-400 text-sm">User Handle</label>
              <input
                type="text"
                placeholder="Enter handle"
                className="w-full mt-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
              />
            </div>

            {/* Divider */}
            <div className="flex items-center gap-2">
              <hr className="flex-1 border-gray-600" />
              <span className="text-gray-500 text-xs">OR</span>
              <hr className="flex-1 border-gray-600" />
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-400 text-sm">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full mt-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-400 text-sm">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full mt-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-gradient-to-r from-green-400 to-green-600 rounded-lg font-semibold "
            >
              Login
            </button>

            {/* Signup */}
            <div className="text-center mt-4 text-gray-400 text-sm">
              Don’t have an account?{" "}
              <span onClick={() => navigate("/signup")} className="text-blue-400 cursor-pointer hover:underline">
                Signup
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
