/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0f1419',
          card: '#1a1f2e',
          hover: '#252b3b',
          border: '#2d3548',
        }
      }
    },
  },
  plugins: [],
}
