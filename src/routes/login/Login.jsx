import React from 'react';
import GoogleLogin from 'react-google-login';
import {connect} from 'react-redux';
import {setErrorMessage, setNOtificationMessage} from '../../actions/UIProperties.action';
import {APIEndpoints, HTTP} from '../../utility/HTTPRequests';
import {logUserIn} from '../../actions/Login.actions';

@connect()
export default class Login extends  React.Component {

	onSucessfulLogin = (accessObj) => {
		accessObj.grantOfflineAccess().then(codeObj => {
			HTTP.POST(APIEndpoints.LOG_USER_IN, {access_token: codeObj.code}).then(res => {
				console.log(res);
				this.props.dispatch(logUserIn(res.data.token, (accessObj.profileObj || {}).name || 'User'));
			    this.props.dispatch(setNOtificationMessage(`Welcome ${(accessObj.profileObj || {}).name || 'User'}, You are logged in`));
				this.props.history.goBack();
			}).catch(this.onLoginFailure);
		});
	};

	onLoginFailure = (errorObj) => {
		this.props.dispatch(setErrorMessage('Sorry. Unable to Log you in. Please try again'));
	};

	render() {
		return (
			<div className='login-page-wrapper'>
				<GoogleLogin
					onSuccess={this.onSucessfulLogin}
					onFailure={this.onLoginFailure}
					buttonText='Login Into Google'
					cookiePolicy='single_host_origin'
					clientId='441932256667-2andqfuvdnu078ar9k6st6tgk1nk7kc8.apps.googleusercontent.com'/>
			</div>
		);
	}
}