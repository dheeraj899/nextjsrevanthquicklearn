module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}', // Include all JS/TS files in the app folder
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-exo2)', 'sans-serif'],
        orbitron: ['var(--font-orbitron)', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Add the typography plugin here
  ],
};
