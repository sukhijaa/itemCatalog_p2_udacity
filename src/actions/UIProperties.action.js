export const UIPropertiesActionTypes = {
	CHANGE_SORTING_ORDER: 'changeSort',
	CHANGE_GROUPING_ORDER: 'changeGroup',
	EXPAND_CATEGORY: 'expandGroup',
	COLLAPSE_GROUP: 'collapseGroup',
	SET_ERROR_MESSAGE: 'errorMsg',
	SET_NOTIFICATION_MESSAGE: 'notifMsg',
	SET_USER_IMAGE: 'setUserImg',
};

export const changeSortingOrder = (newSortOrder) => {
	return {type: UIPropertiesActionTypes.CHANGE_SORTING_ORDER, payload: newSortOrder};
};

export const changeGroupingOrder = (newGroup) => {
	return {type: UIPropertiesActionTypes.CHANGE_GROUPING_ORDER, payload: newGroup};
};

export const expandGroup = (catId) => {
	return {type: UIPropertiesActionTypes.EXPAND_CATEGORY, payload: catId};
};

export const collapseGroup = (catId) => {
	return {type: UIPropertiesActionTypes.COLLAPSE_GROUP, payload: catId};
};

export const setErrorMessage = (msg) => {
	return {type: UIPropertiesActionTypes.SET_ERROR_MESSAGE, payload: msg};
};

export const setNOtificationMessage = (notifMsg) => {
	return {type: UIPropertiesActionTypes.SET_NOTIFICATION_MESSAGE, payload: notifMsg};
};

export const setUserImage = (imageURL) => {
	return {type: UIPropertiesActionTypes.SET_USER_IMAGE, payload: imageURL};
};