import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

function ThemeToggle({ toggleTheme, darkMode }) {
  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center w-16 h-8 px-1 rounded-full bg-orange-400 dark:bg-[#2c1d14] transition-all duration-300 shadow-inner"
    >
      <div
        className={`absolute top-1 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md transition-all duration-300 ${
          darkMode ? "translate-x-8" : "translate-x-0"
        }`}
      >
        {darkMode ? (
          <Moon size={16} className="text-orange-500" />
        ) : (
          <Sun size={16} className="text-yellow-500" />
        )}
      </div>
    </button>
  );
}

export default ThemeToggle;
