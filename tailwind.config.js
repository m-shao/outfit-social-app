/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'social-blue': '#66BFBF',
        'social-pink': '#FD7BAD'
      }
    },
  },
  plugins: [],
}