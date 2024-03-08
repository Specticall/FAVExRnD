/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        body: "#F9F1E9",
        accent: "#FFD5A5",
        main: "#392A2A",
        light: "#635050",
        lighter: "#6F6758",
        danger: "#CC2A06",
      },
      fontSize: {
        hero: "5rem",
        small: "0.875rem",
        heading: "1rem",
        medium: "1.25rem",
        title: "1.5rem",
        large: "2rem",
      },
      fontFamily: {
        body: "Archivo",
      },
    },
  },
  plugins: [],
};
