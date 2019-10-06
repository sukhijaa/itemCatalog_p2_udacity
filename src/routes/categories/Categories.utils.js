export const GROUPING_OPTIONS = [
	{value: 'category', label: 'Category'},
	{value: 'none', label: 'None'},
];

export const getAllCategoriesForDD = (categories) => {
	return Object.keys(categories || {}).map(catId => {
		const cat = categories[catId];
		return {label: cat.name, value: cat.id + ''};
	});
};

export const getErrorMessageOutOfErrorObj = (err) => {
	let errMsg = err.message;
	if (err.response && err.response.data && typeof err.response.data === 'string' && err.response.data.length < 300) {
		errMsg = err.response.data;
	}
	return errMsg;
};