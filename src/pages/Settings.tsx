import React, { useEffect, useState } from "react";
import {
  applyTheme,
  saveThemePreference,
  getSavedTheme,
  setThemeBasedOnDevice,
} from "../utils/themeUtils";

const Settings: React.FC = () => {
  const [theme, setTheme] = useState<string>("");

  useEffect(() => {
    const savedTheme = getSavedTheme();
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      setTheme("device");
      setThemeBasedOnDevice();
    }
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    if (newTheme === "device") {
      setThemeBasedOnDevice();
      localStorage.removeItem("theme");
    } else {
      applyTheme(newTheme);
      saveThemePreference(newTheme);
    }
  };

  return (
    <div className="p-4 bg-fb-light-bg dark:bg-fb-dark-bg text-fb-light-text dark:text-fb-dark-text min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div>
        <label className="block text-lg font-medium mb-2">Theme</label>
        <select
          value={theme}
          onChange={(e) => handleThemeChange(e.target.value)}
          className="border-fb-light-border dark:border-fb-dark-border p-2 rounded bg-fb-light-secondary dark:bg-fb-dark-secondary"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="device">Device Default</option>
        </select>
      </div>
    </div>
  );
};

export default Settings;
