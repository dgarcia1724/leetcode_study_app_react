// src/App.tsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  getSavedTheme,
  applyTheme,
  setThemeBasedOnDevice,
} from "./utils/themeUtils";

// components
import TopNav from "./components/TopNav"; // Import your TopNav component

// pages
import Auth from "./auth/Auth"; // Import your Auth component
import HomePage from "./pages/HomePage";
import Folders from "./pages/Folders"; // Import your Folders page
import Settings from "./pages/Settings";
import AuthPage from "./auth/AuthPage";

function App() {
  useEffect(() => {
    const savedTheme = getSavedTheme();
    if (savedTheme) {
      applyTheme(savedTheme);
    } else {
      setThemeBasedOnDevice(); // Apply device theme if no preference is set
    }
  }, []);

  return (
    <>
      <Router>
        <div className="flex flex-col min-h-screen">
          <TopNav /> {/* Add TopNav component here */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} /> {/* Add Auth route */}
            <Route path="/folders" element={<Folders />} />{" "}
            {/* Add Folders route */}
            <Route path="/settings" element={<Settings />} />{" "}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
