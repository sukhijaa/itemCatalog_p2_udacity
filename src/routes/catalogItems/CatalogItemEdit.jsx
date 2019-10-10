import React from 'react';
import EditAddDeleteItem from 'components/EditAddDeleteItem/EditAddDeleteItem';
import {connect} from 'react-redux';
import {getCategoryObjForItemId} from './CatalogItem.utils';
import {getAllCategoriesForDD, getErrorMessageOutOfErrorObj} from '../categories/Categories.utils';
import {editItemInCategory} from 'actions/Categories.action';
import {APIEndpoints, buildURL, HTTP} from '../../utility/HTTPRequests';
import {setErrorMessage, setNOtificationMessage} from '../../actions/UIProperties.action';
import {performUserOperationsOnServerFailure} from '../../actions/Login.actions';

@connect(store => ({
	categories: store.categories,
}))
export default class CatalogItemEdit extends React.Component {

	constructor(props) {
		super(props);

		this.selectedCategory = {};
		this.selectedItem = {};
	}

	handleItemUpdate = (newCat, name, description) => {
		HTTP.POST(
			buildURL(APIEndpoints.EDIT_ITEM, {itemId: parseInt(this.selectedItem.id)}),
			{name: name || 'New Item 1', description}).then(res => {

			this.props.dispatch(editItemInCategory(this.selectedCategory.id, this.selectedItem.id, res.data));
			this.props.dispatch(setNOtificationMessage(`${name} : Updated Succesfully`));
			this.props.history.push('/');
			this.props.history.goForward();
		}).catch(err => {
			this.props.dispatch(performUserOperationsOnServerFailure(err));
			this.props.dispatch(setErrorMessage(`Failed to update Catalog Item.\n\nError Message: ${getErrorMessageOutOfErrorObj(err)}`));
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
					creatorId={this.selectedItem.creator}
					selectedCategory={this.selectedCategory.id + ''}
					categoryDisabled={true}
					itemDescription={this.selectedItem.description}
					itemName={this.selectedItem.name}
					submitButtonTitle='Save'
					submitForm={this.handleItemUpdate}
					goBackFunction={history.goBack}/>
			</div>
		);
	}
}