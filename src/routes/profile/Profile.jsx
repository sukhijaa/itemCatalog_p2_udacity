import React from 'react';
import {connect} from 'react-redux';
import '../login/Login.scss';
import './Profile.scss';
import {APIEndpoints, HTTP} from '../../utility/HTTPRequests';
import {getErrorMessageOutOfErrorObj} from '../categories/Categories.utils';
import {setErrorMessage, setNOtificationMessage} from '../../actions/UIProperties.action';
import {logUserIn, performUserOperationsOnServerFailure} from '../../actions/Login.actions';

@connect(store => ({
	username: store.loginData.userName,
	userId: store.loginData.userId,
}))
export default class Profile extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			username: props.username,
			password: '',
		};
	}

    updateUsername = (e) => this.setState({username: e.target.value});
    updatePaasowrd = (e) => this.setState({password: e.target.value});

    handleInfoUpdate = () => {
    	const {username, password} = this.state;
    	HTTP.POST(APIEndpoints.UPDATE_PROFILE_INFO, {username, password: password}).then(res => {
    		console.log(res.data);
    		this.props.dispatch(setNOtificationMessage('User info updated successfully'));
    		this.props.dispatch(logUserIn(sessionStorage.token, username, this.props.userId));
    	}).catch(err => {
    	    this.props.dispatch(performUserOperationsOnServerFailure(err));
    		const errorMessage = getErrorMessageOutOfErrorObj(err);
    		this.props.dispatch(setErrorMessage(`Update Info Failed. \n\n Error Message: ${errorMessage}`));
    	});
    }

    render() {
    	const {username, password} = this.state;
    	const notDisabled = username && password && password.length > 6;

    	return (
    		<div className='profile-wrapper login-page-wrapper'>
    			<div className='login-form-user-welcome-label'>
                    Welcome {username}, Update your Profile Here
    			</div>
    			<div className='login-form-wrapper'>
    				<input type='text'
    					className='login-form-input-box' 
    					placeholder='username'
    					onChange={this.updateUsername}
    					value={this.state.username}/>
    				<input type='password'
    					className='login-form-input-box'
    					placeholder='Password'
    					onChange={this.updatePaasowrd}
    					value={this.state.password}/>
    				<div className={`login-form-login-button ${notDisabled ? 'login-enabled' : ''}`} onClick={this.handleInfoUpdate}>Update</div>
    			</div>
    		</div>
    	);
    }

}