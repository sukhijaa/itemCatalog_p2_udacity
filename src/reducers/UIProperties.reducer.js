import {UIPropertiesActionTypes} from 'actions/UIProperties.action.js';

const defaultState = {
	groupOrder: 'category',
	sortOrder: '0',
	expandedGroups: {},
	errorMessage: '',
	notificationMessage: '',
};

export default (state = defaultState, action = {}) => {
	switch (action.type) {
		case UIPropertiesActionTypes.CHANGE_GROUPING_ORDER:
			return {...state, groupOrder: action.payload};
		case UIPropertiesActionTypes.CHANGE_SORTING_ORDER:
			return {...state, sortOrder: action.payload};
		case UIPropertiesActionTypes.EXPAND_CATEGORY:
			return {...state, expandedGroups: {...state.expandedGroups, [action.payload]: true}};
		case UIPropertiesActionTypes.COLLAPSE_GROUP:
			return {...state, expandedGroups: {...state.expandedGroups, [action.payload]: false}};
		case UIPropertiesActionTypes.SET_ERROR_MESSAGE:
			return {...state, errorMessage: action.payload || ''};
		case UIPropertiesActionTypes.SET_NOTIFICATION_MESSAGE:
			return {...state, notificationMessage: action.payload || ''};
		default:
			return state;
	}
};