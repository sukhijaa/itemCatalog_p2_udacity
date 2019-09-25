import React from 'react';
import EditAddDeleteItem from 'components/EditAddDeleteItem/EditAddDeleteItem';
import {connect} from 'react-redux';
import {getCategoryObjForItemId} from './CatalogItem.utils';
import {getAllCategoriesForDD} from '../categories/Categories.utils';
import {editItemInCategory} from 'actions/Categories.action';

@connect(store => ({
	categories: store.categories
}))
export default class CatalogItemEdit extends React.Component {

	constructor(props) {
		super(props);

		this.selectedCategory = {};
		this.selectedItem = {};
	}

	handleItemUpdate = (newCat, name, description) => {
		this.props.dispatch(editItemInCategory(this.selectedCategory.id, this.selectedItem.id, {name, description}))
	};

	render() {
		const {categories, match, history} = this.props;
		const itemId = ((match || {}).params || {}).id || '';
		this.selectedCategory = getCategoryObjForItemId(categories, parseInt(itemId));

		if (!this.selectedCategory) {
			return 'Item Not Found';
		}

		this.selectedItem = this.selectedCategory.catalogItems[itemId];

		return (
			<div className='catalog-item-edit-wrapper'>
                <EditAddDeleteItem
					categoriesDD={getAllCategoriesForDD(categories)}
					selectedCategory={this.selectedCategory.id + ''}
					categoryDisabled={true}
					itemDescription={this.selectedItem.description}
					itemName={this.selectedItem.name}
					submitButtonTitle={'Save'}
					submitForm={this.handleItemUpdate}
					goBackFunction={history.goBack}/>
			</div>
		);
	}
}