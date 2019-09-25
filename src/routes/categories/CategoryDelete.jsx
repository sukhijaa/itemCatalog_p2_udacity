import React from 'react';
import {removeCategory} from "../../actions/Categories.action";
import EditAddDeleteItem from "../../components/EditAddDeleteItem/EditAddDeleteItem";
import {connect} from "react-redux";

@connect(store => ({categories: store.categories}))
export default class CategoryDelete extends React.Component {

	handleCategoryUpdate = () => {
		this.props.dispatch(removeCategory(this.selectedCategory.id));
		this.props.history.push('/');
		this.props.history.goForward();
	};

	render() {
		const {categories, history} = this.props;
		const selectedCatId = ((this.props.match || {}).params || {}).id || '';

		this.selectedCategory = categories[selectedCatId];

		if (!this.selectedCategory) {
			return 'Category Not Found';
		}

		return (
			<div className='category-edit-wrapper'>
				<EditAddDeleteItem
					selectedCategory={this.selectedCategory.name}
					categoryDisabled={true}
					itemName={this.selectedCategory.name}
					itemNameDisabled={true}
					itemDescription={this.selectedCategory.description}
					itemDescriptionDisabled={true}
					goBackFunction={history.goBack}
					submitButtonTitle={'Delete'}
					submitForm={this.handleCategoryUpdate}/>
			</div>
		);
	}
}