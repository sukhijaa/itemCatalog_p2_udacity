import React from 'react';
import {connect} from 'react-redux';
import {addAllCategories} from '../../actions/Categories.action';
import CategoryDetails from "./CategoryDetails";

@connect(store => ({categories: store.categories}))
export default class Categories extends React.Component {

	constructor (props) {
		super (props);
	}

	componentDidMount() {
		this.props.dispatch(addAllCategories());
	}

	render() {
		const {categories} = this.props;

		return (
			<div className='categories-wrapper'>
				{
					Object.keys(categories || {}).map((catalogId, index) => {
						const catalogItem = categories[catalogId];
						return (
							<CategoryDetails catagoryItem={catalogItem}/>
						);
					})
				}
			</div>
		);
	}
}