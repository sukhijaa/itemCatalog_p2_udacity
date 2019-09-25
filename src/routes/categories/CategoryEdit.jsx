import React from 'react';
import {connect} from "react-redux";
import EditAddDeleteItem from "../../components/EditAddDeleteItem/EditAddDeleteItem";
import {editCategory} from "../../actions/Categories.action";

@connect(store => ({categories: store.categories}))
export default class CategoryEdit extends React.Component {

	handleCategoryUpdate = (newCat, name, description) => {
		this.props.dispatch(editCategory(this.selectedCategory.id, {name: name || 'New Category 1', description}));
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
					itemDescription={this.selectedCategory.description}
					goBackFunction={history.goBack}
					submitForm={this.handleCategoryUpdate}/>
			</div>
		);
	}
}