/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: {
        DEFAULT: '#635FC7',
        light: '#A8A4FF',
      },
      danger: {
        DEFAULT: '#EA5555',
        light: '#FF9898',
      },
      neutral: {
        DEFAULT: '#828FA3',
        light: '#F4F7FD',
        dark: '#2B2C37',
        darker: '#20212C',
      },
      lines: {
        dark: '#3E3F4E',
        light: '#E4EBFA',
      },
      black: '#000112',
      white: '#FFFFFF',
    },
  },
  plugins: [],
};
