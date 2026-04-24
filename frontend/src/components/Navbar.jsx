import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const user = localStorage.getItem("username");
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex justify-between bg-gray-900 items-center p-4">
      <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-white bg-clip-text text-transparent">
        Note Tracker
      </div>
      {user && (
        <>
          <div>
            <ul className="flex flex-row gap-4">
              <li>Create Note</li>
              <li>All Notes</li>
            </ul>
          </div>

          <div className="flex flex-row gap-4 items-center">
            <span className="font-bold">Hello {user}</span>
            <button
              className="bg-gradient-to-r from-red-400 to-red-600 rounded-lg font-semibold p-2"
              onClick={() => {
                localStorage.removeItem("username");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
