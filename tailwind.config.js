/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '90% 50%' },
        },
      },
      animation: {
        gradient: 'gradient 4s linear infinite',
      },
    },
  },
  plugins: [],
};
