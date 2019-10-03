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