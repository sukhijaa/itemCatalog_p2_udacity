import React from 'react';
import {connect} from 'react-redux';
import './ShowNotifications.scss';
import {setErrorMessage, setNOtificationMessage} from '../../actions/UIProperties.action';


@connect(store => ({
	errorMessage: store.uiProperties.errorMessage,
	notification: store.uiProperties.notificationMessage,
}))
export default class ShowNotification extends React.PureComponent {

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.errorMessage !== prevProps.errorMessage && this.props.errorMessage) {
			setTimeout(this.handleErrorClear, 5000);
		}
		if (this.props.notification !== prevProps.notification && this.props.notification) {
			setTimeout(this.handleNotificationClear, 5000);
		}
	}

    handleNotificationClear =  () => {
    	this.props.dispatch(setNOtificationMessage(''));
    };

    handleErrorClear = () => {
    	this.props.dispatch(setErrorMessage(''));
    };

    render() {
    	const {errorMessage, notification} = this.props;
    	return (
    		<div className='notification-wrapper'>
    			{
    				errorMessage ?
    					<div className='error-message-notification notif-box'>
    						{errorMessage}
    						<div className='close-wrapper' onClick={this.handleErrorClear}>&#10006;</div>
    					</div>
    					: null
    			}
    			{
    				notification ?
    					<div className='notification-message notif-box'>
    						{notification}
    						<div className='close-wrapper' onClick={this.handleNotificationClear}>&#10006;</div>
    					</div>
    					: null
    			}
    		</div>

    	);
    }
}