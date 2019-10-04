import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './Header.scss';
import {Link} from 'react-router-dom';
import {logUserOut} from '../../actions/Login.actions';

@connect((store) => ({
	isLoggedIn: store.loginData.isLoggedIn,
	userName: store.loginData.userName,
}))
export default class Header extends React.Component {
    static propTypes = {
    	isLoggedIn: PropTypes.bool,
    	userName: PropTypes.string,
    };

    static defaultProps = {
    	isLoggedIn: false,
    	userName: '',
    };

    constructor(props) {
    	super(props);

    	this.headerLoginRef = {};
    }

    state = {
    	showDD: false,
    };

    logUserOut = () => {
    	this.props.dispatch(logUserOut());
    };

	toggleShowDD = () => {
		this.setState({showDD: !this.state.showDD});
	};

	render() {
	    const {isLoggedIn, userName} = this.props;
    	return (
    		<div className='header-wrapper'>
    			<div className='header-label'>
					<Link to='/'>ItemCatalog - Stuff about Stuff</Link>
    			</div>
    			<div className='header-login-title'>
    				{
    					isLoggedIn ?
    						<div
								className='header-login-dropdown'
								onClick={this.toggleShowDD}>
								Welcome {userName}
    							{
    								this.state.showDD ?
    									<div className='header-login-dd-wrapper' ref={ref => this.headerLoginRef = ref}>
    										<div className='login-dd-tip-triangle'/>
    										<div className='login-dd-content-wrapper'>
												<Link to='/category/new' className='login-dd-list-item'>Add Category</Link>
    											<div className='login-dd-list-item' onClick={this.logUserOut}>Logout</div>
    										</div>
    									</div> : null
    							}

    						</div> :
							<Link to='/login'><span className='cursor-pointer'>LOGIN</span></Link>
    				}
    			</div>
    		</div>
    	);
	}
}