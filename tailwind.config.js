/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'certificate': {
          'gold': '#D4AF37',
          'dark-gold': '#B8860B',
          'cream': '#F5F5DC',
          'border': '#8B7355',
        }
      }
    },
  },
  plugins: [],
}
