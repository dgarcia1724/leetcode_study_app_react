// src/utils/themeUtils.ts
export const applyTheme = (theme: string) => {
  const root = window.document.documentElement;

  // Remove all theme classes
  root.classList.remove("light", "dark");

  // Apply the selected theme
  if (theme === "light") {
    root.classList.add("light");
  } else if (theme === "dark") {
    root.classList.add("dark");
  }
};

export const saveThemePreference = (theme: string) => {
  localStorage.setItem("theme", theme);
};

export const getSavedTheme = (): string | null => {
  return localStorage.getItem("theme");
};

export const setThemeBasedOnDevice = () => {
  const root = window.document.documentElement;
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  // Apply system preference
  if (prefersDarkMode) {
    root.classList.add("dark");
  } else {
    root.classList.add("light");
  }
};
