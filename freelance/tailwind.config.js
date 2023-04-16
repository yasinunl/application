/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors:{
        'sh-dark-blue': '#161922',
        'sh-linen': '#fffdf8',
        'sh-green': "#73937E",
        'sh-phlox': "#d7bb8e",
        'sh-skin': "#E7CFCD",
        'sh-light-blue': '#9f9fa8'
      }
    },
    container:{
      center:true,
      width: "50%"
    },
    screens:{
      'nm': '500px',
      'lg': '1024px',
      'xl':"1280px",
      '2xl':"1536px",
      "md":"768px",
      "sm":"640px",
      "h-99":"2048px"
    },
    borderRadius:{
      'none': '0',
      'sm': '0.125rem',
      DEFAULT: '0.25rem',
      DEFAULT: '4px',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px',
      'large':'50px'
    }
  },
  plugins: [],
}

