import React from "react";
import { NavLink } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth"; // Assuming you have an AuthContext

export default function TopNav() {
  const { user: currentUser } = useAuth(); // Get the current user from your AuthContext

  return (
    <nav className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 p-4 flex justify-between items-center shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="flex space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-lg ${
              isActive
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                : ""
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/folders"
          className={({ isActive }) =>
            `hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-lg ${
              isActive
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                : ""
            }`
          }
        >
          Folders
        </NavLink>
      </div>
      <div className="flex items-center space-x-4">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `hover:text-blue-600 dark:hover:text-blue-400 ${
              isActive
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300"
            }`
          }
        >
          <FiSettings className="h-6 w-6" />
        </NavLink>
        {currentUser ? (
          <div className="flex items-center space-x-2 bg-[#1877F2] text-white font-semibold py-2 px-4 rounded-md">
            <FaUserCircle className="h-6 w-6" />
            <span className="max-w-[150px] truncate">{currentUser.email}</span>
          </div>
        ) : (
          <NavLink
            to="/auth"
            className="bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold py-2 px-4 rounded-md"
          >
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
}
