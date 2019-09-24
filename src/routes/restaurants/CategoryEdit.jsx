import React from 'react';

export default class CategoryEdit extends React.Component {

	render() {
		console.log(this.props.match);
		return (
			<div className='category-edit-wrapper'>
                Edit Restaurant {this.props.match.params.id}
			</div>
		);
	}
}