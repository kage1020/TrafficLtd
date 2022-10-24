/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        gothic: [
          'Noto Sans JP',
          'Helvetica Neue',
          'Helvetica',
          'Hiragino Sans',
          'Hiragino Kaku Gothic ProN',
          'Arial',
          'Yu Gothic',
          'Meiryo',
          'sans-serif',
        ],
        mincho: [
          'Noto Serif JP',
          'Times New Roman',
          'YuMincho',
          'Hiragino Mincho ProN',
          'Yu Mincho',
          'MS PMincho',
          'serif',
        ],
      },
      boxShadow: {
        DEFAULT: '0 0 1px, 0 0 2px, 0 0 20px, inset 0 0 1px, inset 0 0 2px, inset 0 0 16px',
      },
    },
  },
  plugins: [
    ({ addUtilities }) => {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '0 0 1px, 0 0 8px, 0 0 32px',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}
