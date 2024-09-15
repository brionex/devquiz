/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'dark-navy': '#030712',
				'light-blue': '#89DDFF',
				'bright-pink': '#FF79BE',
				yellow: '#FFDE58',
				'midnight-blue': '#1E2541',
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
	plugins: [
		require('tailwindcss-animated')
	],
}
