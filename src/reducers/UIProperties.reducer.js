import {UIPropertiesActionTypes} from 'actions/UIProperties.action.js';

const defaultState = {
    groupOrder: 'category',
    sortOrder: '0',
};

export default (state = defaultState, action = {}) => {
    switch (action.type) {
        case UIPropertiesActionTypes.CHANGE_GROUPING_ORDER:
            return {...state, groupOrder: action.payload};
        case UIPropertiesActionTypes.CHANGE_SORTING_ORDER:
            return {...state, sortOrder: action.payload};
        default:
            return state;
    }
};