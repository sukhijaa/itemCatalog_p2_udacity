export const getCategoryObjForItemId = (categories, itemId) => {
	if (typeof itemId !== 'number') {
		return null;
	}
	const categoryId = Object.keys(categories || {}).find(catId => {
		const category = categories[catId] || {};
		return category.catalogItems ? !!category.catalogItems[itemId] : false;
	});

	if (categoryId !== undefined) {
		return categories[categoryId];
	}
	return null;
};