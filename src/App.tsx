// src/App.tsx
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  getSavedTheme,
  applyTheme,
  setThemeBasedOnDevice,
} from "./utils/themeUtils";

// components
import TopNav from "./components/TopNav"; // Import your TopNav component
import ProtectedRoute from "./components/ProtectedRoute"; // New import

// pages
import HomePage from "./pages/HomePage";
import Folders from "./pages/Folders"; // Import your Folders page
import Settings from "./pages/Settings";
import AuthPage from "./auth/AuthPage";
import Lists from "./pages/Lists"; // Add this import
import Problems from "./pages/Problems"; // Add this import

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
            <Route
              path="/folders"
              element={
                <ProtectedRoute>
                  <Folders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/folders/:folderId/lists"
              element={
                <ProtectedRoute>
                  <Lists />
                </ProtectedRoute>
              }
            />
            <Route
              path="/folders/:folderId/lists/:listId/problems"
              element={
                <ProtectedRoute>
                  <Problems />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
