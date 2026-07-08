/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#03C75A", // 네이버 그린 스타일
        secondary: "#FF9800", // 웜 오렌지
        "background-light": "#F5F6F8",
        "background-dark": "#121212",
        "surface-light": "#FFFFFF",
        "surface-dark": "#1E1E1E",
        "border-light": "#E5E7EB",
        "border-dark": "#333333",
      },
      fontFamily: {
        display: ["'Noto Sans KR'", "sans-serif"],
        body: ["'Noto Sans KR'", "sans-serif"],
      },
    },
  },
  plugins: [],
}