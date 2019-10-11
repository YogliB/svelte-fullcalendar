module.exports = {
	include: ['**/**/*.js', '**/**/*.mjs', '**/**/*.html', '**/**/*.svelte'],
	plugins: [
		'@babel/plugin-syntax-dynamic-import',
		[
			'@babel/plugin-transform-runtime',
			{
				useESModules: true,
			},
		],
	],
	presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
	ignore: ['node_modules/**'],
};
