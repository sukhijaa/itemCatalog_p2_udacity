import React from 'react';
import './TestComp.scss';
import {NavLink} from 'react-router-dom';

export default class TestComp extends React.Component {
	render() {
		const allRests = window.allRestaurants;
		console.log(allRests);

		console.log(this.props.location);
		return (
			<div className='my-first-app-wrapper'>My First React App for now
				<div>Data Received :
					{this.props.dataString}
				</div>
				<NavLink to='/login'>Login Page</NavLink>
				<NavLink to='/'>Home Page</NavLink>
			</div>
		);
	}
}