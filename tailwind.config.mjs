/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'midnight-blue': '#030712',
        'sky-blue': '#89DDFF',
        'vivid-pink': '#FF79BE',
      },
      fontFamily: {
        menlo: ['Menlo', 'Verdana', 'Geneva', 'Tahoma', 'sans-serif'],
        JetBrainsMono: [
          'JetBrainsMono',
          'Verdana',
          'Geneva',
          'Tahoma',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [require('tailwindcss-animated')],
}
