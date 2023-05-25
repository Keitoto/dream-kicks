/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '576px',
      sm: '768px',
      md: '992px',
      lg: '1200px',
      xl: '1400px',
    },
    extend: {
      colors: {
        default: '#222',
        hover: 'rgb(77,	171, 247)',
        bg: '#ECEBEC',
      },
    },
  },
  plugins: [],
};
