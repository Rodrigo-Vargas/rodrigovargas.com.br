/** @type {import('tailwindcss').Config} */
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
      fontFamily: {
         'sans': ['Poppins', 'sans-serif']
      },
      extend: {},
   },
   plugins: [],
}

