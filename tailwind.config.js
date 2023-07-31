/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      padding: '1.5rem',
      center: true,
    },
    extend: {
      colors: {
        'primary': '#151c48',
        'secondary': '#f97316',
      },
      backgroundColor: {
        'primary': '#151c48',
        'secondary': '#f97316',
      }
    },
  },
  plugins: [],
}
