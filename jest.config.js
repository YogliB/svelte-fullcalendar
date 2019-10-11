module.exports = {
	bail: false,
	moduleFileExtensions: ['js', 'json', 'svelte'],
	transform: {
		'^.+\\.js$': 'babel-jest',
		'^.+\\.svelte$': 'svelte-jest',
	},
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
	verbose: true,
};
