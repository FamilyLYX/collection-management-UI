/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ibm: ["IBM Plex Mono", "sans-serif"],
        tusker: ["tusker", "sans-serif"],
      },
    },
  },
  plugins: [],
};
