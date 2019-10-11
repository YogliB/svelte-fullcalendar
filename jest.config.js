module.exports = {
	transform: {
		'^.+\\.js$': 'babel-jest',
		'^.+\\.svelte$': 'svelte-jest',
	},
	moduleFileExtensions: ['js', 'json', 'svelte'],
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
