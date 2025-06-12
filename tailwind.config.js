/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#318dc1",
        secondary: "#55768b",
        
        bg_main: "#f5f8fe",
        
        hover_primary: "#318dc11F",
        hov_secondry: "#55768b1F",

        label_text: "#55768b",
        label_text_alpha10: "#55768ba1",

        bg_input: "#e9edf7",
        hover_secondry: "#9A9A9A5A",
        warning: "#C62828",
        warning_hover: "#C62828a1",
        confirm: "#4CAF50",
      },
    },
  },
  plugins: [],
};
