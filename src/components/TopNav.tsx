import React from "react";
import { NavLink } from "react-router-dom";
import { FiSettings } from "react-icons/fi"; // You can use any icon library for settings

export default function TopNav() {
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
    </nav>
  );
}
