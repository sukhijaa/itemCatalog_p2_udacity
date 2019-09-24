import {combineReducers} from 'redux';
import LoginReducer from './LoginReducer.js';

const combinedReducers = {
	loginData: LoginReducer,
};

export default combineReducers(combinedReducers);