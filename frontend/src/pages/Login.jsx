import { useNavigate } from "react-router-dom";
import { userApi, setUser } from "../services/api";

function Login() {
  const navigate = useNavigate();

  const handleLogin = async function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      const res = await userApi(data, "/auth/login");
      alert(res.data.message);
      await setUser(res);
      window.dispatchEvent(new Event("storage"));
      navigate("/");
    } catch (error) {
      console.log(error);
      const msg = error?.response?.data?.message || "Something went wrong";
      alert(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 px-4 pt-16">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-semibold bg-gradient-to-r from-blue-400 to-white text-transparent bg-clip-text">
          Note Tracker
        </h1>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-2xl">
          <h2 className="text-xl text-center text-gray-200 mb-6">Login to your account</h2>

          <form
            className="space-y-4"
            onSubmit={e => {
              handleLogin(e);
            }}
          >
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
            <button type="submit" className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold ">
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
