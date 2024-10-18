import React from "react";
import { NavLink } from "react-router-dom";
import { FiSettings } from "react-icons/fi"; // You can use any icon library for settings

export default function TopNav() {
  return (
    <nav className="bg-white text-gray-600 p-4 flex justify-between items-center shadow-md">
      <div className="flex space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-blue-600 font-semibold text-lg ${
              isActive ? "text-blue-600 border-b-2 border-blue-600" : ""
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/folders"
          className={({ isActive }) =>
            `hover:text-blue-600 font-semibold text-lg ${
              isActive ? "text-blue-600 border-b-2 border-blue-600" : ""
            }`
          }
        >
          Folders
        </NavLink>
      </div>
      <NavLink
        to="/settings"
        className={({ isActive }) =>
          `hover:text-blue-600 ${isActive ? "text-blue-600" : "text-gray-600"}`
        }
      >
        <FiSettings className="h-6 w-6" />
      </NavLink>
    </nav>
  );
}
