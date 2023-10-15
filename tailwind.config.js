/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
   content: [
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      container: {
         center: true,
         screens: {
            sm: '640px',
            md: '768px',
         }
      },
      colors: {
         gray: {
            ...colors.gray,
            50: '#f9fafe'
         },
         blue: colors.blue,
         white: colors.white
      },
      fontFamily: {
         'sans': ['Poppins', 'sans-serif']
      },
      extend: {},
   },
   plugins: [],
}

