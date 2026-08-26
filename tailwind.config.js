/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#f97316",
          violet: "#6C5CE7",
          pink: "#E84393",
        },
      },
    },
  },
  plugins: [],
};
