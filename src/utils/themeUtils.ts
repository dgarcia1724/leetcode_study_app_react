// src/utils/themeUtils.ts
export const applyTheme = (theme: string) => {
  const root = window.document.documentElement;

  if (theme === "light") {
    root.classList.add("light");
    root.classList.remove("dark");
  } else if (theme === "dark") {
    root.classList.add("dark");
    root.classList.remove("light");
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

  // Apply the appropriate theme
  if (prefersDarkMode) {
    root.classList.add("dark");
    root.classList.remove("light");
  } else {
    root.classList.add("light");
    root.classList.remove("dark");
  }
};
