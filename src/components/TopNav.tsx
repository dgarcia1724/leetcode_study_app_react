import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useAuth } from "../hooks/useAuth"; // Assuming you have an AuthContext

export default function TopNav() {
  const { user: currentUser } = useAuth(); // Get the current user from your AuthContext
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        {currentUser ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between space-x-2 bg-[#1877F2] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#166FE5] w-64"
            >
              <div className="flex items-center space-x-2">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="User profile"
                    className="h-6 w-6 rounded-full"
                  />
                ) : (
                  <FaUserCircle className="h-6 w-6" />
                )}
                <span className="max-w-[150px] truncate">
                  {currentUser.email}
                </span>
              </div>
              {isDropdownOpen ? (
                <IoMdArrowDropup className="h-6 w-6" />
              ) : (
                <IoMdArrowDropdown className="h-6 w-6" />
              )}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1">
                <NavLink
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Settings
                </NavLink>
                {/* Add more dropdown options here */}
              </div>
            )}
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
