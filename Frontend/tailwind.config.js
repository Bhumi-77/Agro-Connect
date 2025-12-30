/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        sway: { '0%,100%': { transform: 'rotate(2deg)' }, '50%': { transform: 'rotate(-2deg)' } },
        float: { '0%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-6px)' }, '100%': { transform: 'translateY(0px)' } }
      },
      animation: {
        sway: 'sway 4s ease-in-out infinite',
        float: 'float 5s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}
