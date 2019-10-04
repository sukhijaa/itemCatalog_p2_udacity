export const LoginActionTypes = {
	LOG_USER_IN: 'logUserIn',
	LOG_USER_OUT: 'logUserOut',
};

export const logUserIn = (token, username) => {
	sessionStorage.token = token;
	sessionStorage.tokenTime = new Date().getTime();
	sessionStorage.userName = username;

	return {type: LoginActionTypes.LOG_USER_IN, payload: {username}};
};

export const logUserOut = () => {
	sessionStorage.token = null;
	sessionStorage.tokenTime = 0;
	sessionStorage.userName = '';

	return {type: LoginActionTypes.LOG_USER_OUT};
};