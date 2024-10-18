/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enables class-based dark mode
  theme: {
    extend: {
      colors: {
        // Light theme (Facebook-inspired)
        "fb-light": {
          bg: "#f0f2f5",
          text: "#050505",
          primary: "#1877f2",
          secondary: "#e4e6eb",
          hover: "#e7f3ff",
          border: "#dddfe2",
        },
        // Dark theme (Facebook-inspired)
        "fb-dark": {
          bg: "#18191a",
          text: "#e4e6eb",
          primary: "#2d88ff",
          secondary: "#3a3b3c",
          hover: "#303031",
          border: "#3e4042",
        },
      },
    },
  },
  plugins: [],
};
