module.exports = {
	purge: [
		'src/**/*.js',
		'src/**/*.jsx',
		'src/**/*.ts',
		'src/**/*.tsx',
		'public/**/*.html',
	],
	theme: {
		extend: {},
	},
	variants: {
		backgroundColor: ['responsive', 'odd', 'hover', 'focus'],
		borderWidth: ['responsive', 'odd', 'hover', 'focus', 'last', 'first']
	},
	plugins: [],
};
