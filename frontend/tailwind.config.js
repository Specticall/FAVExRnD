/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        body: "#F9F1E9",
        main: "#392A2A",
        accent: "#FFD5A5",
        danger: "#CC2A06",
      },
      fontSize: {
        hero: "7.5rem",
        body: ".875rem",
        heading: "1rem",
        title: "1.5rem",
      },
    },
  },
  plugins: [],
};
