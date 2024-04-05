/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ 
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'blog-top': "url('https://images.pexels.com/photos/594226/pexels-photo-594226.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
      },
      colors: {
        'dark-cyan': '#0B525B',
        'deep-purple': '#3C096C',
        'custom-black': '#000000',
        'custom-white': '#FFFFFF',
        'button-color': '#7B2CBF',
        'button-color-hover': '#3C096C'
      },
    },
  },
  plugins: [],
}