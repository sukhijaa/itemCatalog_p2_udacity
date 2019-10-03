import React from 'react';
import EditAddDeleteItem from 'components/EditAddDeleteItem/EditAddDeleteItem';
import {connect} from 'react-redux';
import {getCategoryObjForItemId} from './CatalogItem.utils';
import {getAllCategoriesForDD} from '../categories/Categories.utils';
import {editItemInCategory} from 'actions/Categories.action';
import {APIEndpoints, buildURL, HTTP} from "../../utility/HTTPRequests";

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
		HTTP.POST(
			buildURL(APIEndpoints.EDIT_ITEM, {itemId: this.selectedItem.id}),
			{name: name || 'New Item 1', description}).then(res => {

			this.props.dispatch(editItemInCategory(this.selectedCategory.id, this.selectedItem.id, res.data));
			this.props.history.push('/');
			this.props.history.goForward();
		});
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