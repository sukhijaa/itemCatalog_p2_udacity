import {combineReducers} from 'redux';
import LoginReducer from './LoginReducer.js';
import CategoriesReducer from './Categories.reducer.js';
import UIPropertiesReducer from './UIProperties.reducer.js';

const combinedReducers = {
	loginData: LoginReducer,
	categories: CategoriesReducer,
	uiProperties: UIPropertiesReducer,
};

export default combineReducers(combinedReducers);