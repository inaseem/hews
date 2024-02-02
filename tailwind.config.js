/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: 'rgb(204,251,241)',
          200: 'rgb(153,246,228)',
          300: 'rgb(94,234,212)',
          400: 'rgb(45,212,191)',
          500: 'rgb(20,184,166)',
          600: 'rgb(13,148,136)',
          700: 'rgb(15,118,110)',
          800: 'rgb(17,94,89)',
          900: 'rgb(19,78,74)',
        },
        gray: {
          100: 'rgb(244,244,245)',
          200: 'rgb(228,228,231)',
          300: 'rgb(212,212,216)',
          400: 'rgb(161,161,170)',
          500: 'rgb(113,113,122)',
          600: 'rgb(82,82,91)',
          700: 'rgb(63,63,70)',
          800: 'rgb(39,39,42)',
          900: 'rgb(24,24,27)',
        },
      },
      keyframes: {
        progress: {
          '0%': { transform: 'scaleX(1) translateX(var(--tw-translate-x))' },
          '100%': { transform: 'scaleX(0) translateX(var(--tw-translate-x))' },
        },
      },
      animation: {
        progress:
          '1s cubic-bezier(0.694, 0.0482, 0.335, 1) 0s infinite normal none running progress',
      },
    },
  },
  plugins: [],
};
