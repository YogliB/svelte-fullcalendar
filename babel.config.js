module.exports = {
	include: ['**/**/*.js', '**/**/*.mjs', '**/**/*.html', '**/**/*.svelte'],
	plugins: [
		[
			'@babel/plugin-transform-runtime',
			{
				useESModules: true,
			},
			'@babel/plugin-syntax-dynamic-import',
		],
	],
	presets: ['@babel/preset-env'],
	ignore: ['node_modules/**'],
};
