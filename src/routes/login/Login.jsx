import React from 'react';
import GoogleLogin from 'react-google-login';
import {connect} from 'react-redux';
import {setErrorMessage, setNOtificationMessage} from '../../actions/UIProperties.action';
import {APIEndpoints, HTTP} from '../../utility/HTTPRequests';
import {logUserIn} from '../../actions/Login.actions';
import './Login.scss';
import {getErrorMessageOutOfErrorObj} from "../categories/Categories.utils";

@connect()
export default class Login extends  React.Component {

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		}
	}

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
		const errorMessage = getErrorMessageOutOfErrorObj(errorObj);
		this.props.dispatch(setErrorMessage(errorObj.response ? errorMessage : 'Sorry. Unable to Log you in. Please try again'));
	};

	updateEmail = (e) => this.setState({email: e.target.value});
	updatePaasowrd = (e) => this.setState({password: e.target.value});

	handleLoginClick = () => {
		const {email, password} = this.state;
		HTTP.POST(APIEndpoints.LOG_USER_CREDENTIALS, {email, password}, false).then(res => {
			this.props.dispatch(logUserIn(res.data.token, res.data.username));
			this.props.dispatch(setNOtificationMessage(res.data.message || `Welcome ${res.data.username}`));
			this.props.history.goBack();
		}).catch(this.onLoginFailure);
	};

	render() {
		const {email, password} = this.state;
		const notDisabled = email && email.includes('@') && password && password.length > 6;
		return (
			<div className='login-page-wrapper'>
				<div className={'login-form-user-welcome-label'}>
					Welcome, Please identify yourself
				</div>
				<div className={'login-form-wrapper'}>
					<input
						type={'text'}
						className={'login-form-input-box'}
						placeholder={'Email'}
						onChange={this.updateEmail}
						value={this.state.email}/>
					<input
						type={'password'}
						className={'login-form-input-box'}
						placeholder={'Password'}
						onChange={this.updatePaasowrd}
						value={this.state.password}/>
					<div className={`login-form-login-button ${notDisabled ? 'login-enabled' : ''}`} onClick={this.handleLoginClick}>Login</div>
				</div>
				<div className={'login-social-media-wrapper'}>
					<div className={'login-social-media-label'}>Or Login Using</div>
					<GoogleLogin
						onSuccess={this.onSucessfulLogin}
						onFailure={this.onLoginFailure}
						buttonText='Google'
						cookiePolicy='single_host_origin'
						clientId='441932256667-2andqfuvdnu078ar9k6st6tgk1nk7kc8.apps.googleusercontent.com'/>
				</div>
			</div>
		);
	}
}