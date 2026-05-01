import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = async function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        data,
        {
          withCredentials: true,
        },
      );
      alert(res.data.message);
      let username = res?.data?.data?.user?.username;
      let email = res?.data?.data?.user?.email;
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("email", email);
      window.dispatchEvent(new Event("storage"));
      navigate("/");
    } catch (error) {
      console.log(error);
      const msg = error?.response?.data?.message || "Something went wrong";
      alert(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4 pt-16">
      {/* BIG TITLE OUTSIDE */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-white text-transparent bg-clip-text">
          Note Tracker
        </h1>
      </div>

      {/* CARD (slightly top aligned) */}
      <div className="flex justify-center">
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-2xl">
          <h2 className="text-xl text-center text-gray-200 mb-6">
            Login to your account
          </h2>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              handleLogin(e);
            }}
          >
            {/* Handle */}
            {/* <div>
              <label htmlFor="userHandle" className="text-gray-400 text-sm">
                User Handle
              </label>
              <input
                id="userHandle"
                name="userHandle"
                type="text"
                placeholder="Enter handle"
                className="w-full mt-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
            </div> */}

            {/* Divider */}
            {/* <div className="flex items-center gap-2">
              <hr className="flex-1 border-gray-600" />
              <span className="text-gray-500 text-xs">OR</span>
              <hr className="flex-1 border-gray-600" />
            </div> */}

            {/* Email */}
            <div>
              <label htmlFor="email" className="text-gray-400 text-sm">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email"
                className="w-full mt-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="text-gray-400 text-sm">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                className="w-full mt-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold "
            >
              Login
            </button>

            {/* Signup */}
            <div className="text-center mt-4 text-gray-400 text-sm">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-blue-400 cursor-pointer hover:underline"
              >
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
