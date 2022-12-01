/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'g-color': 'rgb(15 23 42/var(--tw-bg-opacity))',
      },
    },
  },
  plugins: [],
}
