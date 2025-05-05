module.exports = {
	content: ['./node_modules/we-ui/components/**/*.vue'],
	variants: {
		extend: {
			borderWidth: ['last'],
		},
	},
	safelist: [
		'text-blue-600',
		'text-red-400',
		'bg-white',
	],
}