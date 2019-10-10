export const LoginActionTypes = {
	LOG_USER_IN: 'logUserIn',
	LOG_USER_OUT: 'logUserOut',
};

export const logUserIn = (token, username, userId) => {
	sessionStorage.token = token;
	sessionStorage.tokenTime = new Date().getTime();
	sessionStorage.userName = username;
	sessionStorage.userId = userId;

	return {type: LoginActionTypes.LOG_USER_IN, payload: {username, userId}};
};

export const logUserOut = () => {
	sessionStorage.token = null;
	sessionStorage.tokenTime = 0;
	sessionStorage.userName = '';
	sessionStorage.userId = '';

	return {type: LoginActionTypes.LOG_USER_OUT};
};

export const performUserOperationsOnServerFailure = (error) => {
	const {response} = error;
	if (response) {
		if (response.status === 444) {
			// USer needs to logout
			return logUserOut();
		}
	}
	return {type: 'randomUselessText'};
};