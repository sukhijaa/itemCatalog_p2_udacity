export const LoginActionTypes = {
	LOG_USER_IN: 'logUserIn',
	LOG_USER_OUT: 'logUserOut',
};

const defaultState = {
	isLoggedIn: false,
	userName: 'Dummy',
};

export default (state = defaultState, action = {}) => {
	switch (action.type) {
		case LoginActionTypes.LOG_USER_IN:
			return {...state, isLoggedIn: true};
		case LoginActionTypes.LOG_USER_OUT:
			return {...defaultState};
		default:
			return state;
	}
};