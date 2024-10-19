import React from "react";
import { NavLink } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-gray-900 flex flex-col items-center justify-center">
      <h1 className="text-blue-600 dark:text-blue-400 font-bold text-4xl text-center mb-8">
        LeetCode Spaced Repetition Study App
      </h1>
      <div className="flex space-x-4">
        <NavLink
          to="/auth"
          className="bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold py-2 px-4 rounded-md"
        >
          Sign In
        </NavLink>
        <NavLink
          to="/auth"
          className="bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold py-2 px-4 rounded-md"
        >
          Get Started
        </NavLink>
      </div>
    </div>
  );
};

export default HomePage;
