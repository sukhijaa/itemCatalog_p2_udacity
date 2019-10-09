import React from 'react';
import {connect} from 'react-redux';
import './ShowNotifications.scss';
import {setErrorMessage, setNOtificationMessage} from '../../actions/UIProperties.action';


@connect(store => ({
	errorMessage: store.uiProperties.errorMessage,
	notification: store.uiProperties.notificationMessage,
}))
export default class ShowNotification extends React.PureComponent {
	constructor(props) {
		super(props);

		this.clearTimeoutERROR = '';
		this.clearTimeoutNOTIF = '';
	}

	clearTimeoutIfStringPresent = (string, selector = 'ERROR') => {
		const timeoutSelector = this[`clearTimeout${selector.toUpperCase()}`];
		if (string) {
			clearTimeout(timeoutSelector);
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.errorMessage !== prevProps.errorMessage && this.props.errorMessage) {
			this.clearTimeoutIfStringPresent(prevProps.errorMessage);
			this.clearTimeoutERROR = setTimeout(this.handleErrorClear, 5000);
		}
		if (this.props.notification !== prevProps.notification && this.props.notification) {
			this.clearTimeoutIfStringPresent(prevProps.notification, 'NOTIF');
			this.clearTimeoutNOTIF = setTimeout(this.handleNotificationClear, 5000);
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