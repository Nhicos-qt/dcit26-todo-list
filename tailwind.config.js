/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 10px 30px rgba(15, 23, 42, 0.08)',
      },
      colors: {
        brand: {
          50: '#eef4ff',
          100: '#dfeaff',
          200: '#bfd5ff',
          300: '#8eb7ff',
          400: '#5a93ff',
          500: '#2d6df6',
          600: '#1d56d9',
          700: '#1b47b0',
          800: '#1d3d86',
          900: '#1d355f',
        },
      },
    },
  },
  plugins: [],
};
