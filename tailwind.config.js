import scrollbarHide from 'tailwind-scrollbar-hide';
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'], // Add Poppins font
      },
      screens: {
        'xs': '480px', // Custom breakpoint
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [
    scrollbarHide// You'd need to install this plugin
  ]
};