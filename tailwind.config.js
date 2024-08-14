/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      sm: [
        '12px',
        {
          lineHeight: '15px',
          fontWeight: '800',
        },
      ],
      base: [
        '13px',
        {
          lineHeight: '23px',
          fontWeight: '500',
        },
      ],
      md: [
        '15px',
        {
          lineHeight: '19px',
          fontWeight: 800,
        },
      ],
      lg: [
        '18px',
        {
          lineHeight: '23px',
          fontWeight: 800,
        },
      ],
      xl: [
        '24px',
        {
          lineHeight: '30px',
          fontWeight: 800,
        },
      ],
    },
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
