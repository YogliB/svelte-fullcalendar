export const filterNullProps = (obj) => {
	let result = {};

	for (const key in obj) {
		if (obj[key] != null) result[key] = obj[key];
	}

	return result;
};
