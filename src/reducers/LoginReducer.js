import {LoginActionTypes} from '../actions/Login.actions';

const isUserLoggedIn = () => {
	return sessionStorage.token ? (new Date().getTime() - sessionStorage.tokenTime) <= 600000 : false;
};

const defaultState = {
	isLoggedIn: isUserLoggedIn(),
	userName: sessionStorage.userName || 'Dummy',
};

export default (state = defaultState, action = {}) => {
	switch (action.type) {
		case LoginActionTypes.LOG_USER_IN:
			return {...state, isLoggedIn: true, userName: action.payload.username};
		case LoginActionTypes.LOG_USER_OUT:
			return {...state, isLoggedIn: false, userName: ''};
		default:
			return state;
	}
};