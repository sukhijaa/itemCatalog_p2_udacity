import {combineReducers} from 'redux';
import LoginReducer from './LoginReducer.js';
import CategoriesReducer from './Categories.reducer.js';

const combinedReducers = {
	loginData: LoginReducer,
	categories: CategoriesReducer
};

export default combineReducers(combinedReducers);