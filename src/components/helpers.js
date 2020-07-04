export const filterNullProps = (obj) => {
	let result = {};

	for (const key in obj) {
		if (obj[key] !== null && obj[key] !== undefined) result[key] = obj[key];
	}

	return result;
};
