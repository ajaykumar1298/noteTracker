import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col  justify-center
bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100
dark:from-[#120d08] dark:via-[#1b140f] dark:to-[#24160f]
transition-all duration-300 text-center px-4"
    >
      <h1 className="text-6xl font-bold text-orange-500 dark:text-orange-400">
        404
      </h1>

      <p className="text-xl font-semibold text-gray-800 dark:text-white mt-2">
        Page Not Found
      </p>

      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
        The page you are looking for doesn’t exist.
      </p>

      <button
        onClick={() => navigate("/login")}
        className="mt-6 text-orange-500 dark:text-orange-400 font-medium hover:underline"
      >
        Go to Login
      </button>
    </div>
  );
}

export default NotFound;
