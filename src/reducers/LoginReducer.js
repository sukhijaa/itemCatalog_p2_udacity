import {LoginActionTypes} from '../actions/Login.actions';
import {CategoryActionTypes} from '../actions/Categories.action';


const isUserLoggedIn = () => {
	return sessionStorage.token ? (new Date().getTime() - sessionStorage.tokenTime) <= 600000 : false;
};

const defaultState = {
	isLoggedIn: isUserLoggedIn(),
	userName: sessionStorage.userName || 'Dummy',
	userId: parseInt(sessionStorage.userId) || '',
};

export default (state = defaultState, action = {}) => {
	switch (action.type) {
		case LoginActionTypes.LOG_USER_IN:
			return {...state, isLoggedIn: true, userName: action.payload.username, userId: parseInt(action.payload.userId)};
		case LoginActionTypes.LOG_USER_OUT:
			return {...state, isLoggedIn: false, userName: '', userId: ''};
		case CategoryActionTypes.ADD_CATEGORY:
		case CategoryActionTypes.ADD_ITEM_TO_CATEGORY:
		case CategoryActionTypes.EDIT_CATEGORY:
		case CategoryActionTypes.EDIT_ITEM_IN_CATEGORY:
		case CategoryActionTypes.REMOVE_CATEGORY:
		case CategoryActionTypes.REMOVE_ITEM_FROM_CATEGORY:
			sessionStorage.tokenTime = new Date().getTime();
			return state;
		default:
			return state;
	}
};