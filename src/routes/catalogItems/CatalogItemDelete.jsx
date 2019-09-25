import React from 'react';
import {getCategoryObjForItemId} from './CatalogItem.utils';
import {getAllCategoriesForDD} from '../categories/Categories.utils';
import EditAddDeleteItem from 'components/EditAddDeleteItem/EditAddDeleteItem';
import {removeItemFromCategory} from 'actions/Categories.action';
import {connect} from 'react-redux';

@connect(store => ({
	categories: store.categories
}))
export default class CatalogItemDelete extends React.Component {

	constructor(props) {
		super(props);

		this.selectedCategory = {};
		this.selectedItem = {};
	}

	handleItemRemove = () => {
		this.props.dispatch(removeItemFromCategory(this.selectedCategory.id, this.selectedItem.id));
		this.props.history.push('/');
		this.props.history.goForward();
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
					submitButtonTitle={'Delete'}
					submitForm={this.handleItemRemove}
					itemDescriptionDisabled={true}
					itemNameDisabled={true}
					goBackFunction={history.goBack}/>
			</div>
		);
	}
}