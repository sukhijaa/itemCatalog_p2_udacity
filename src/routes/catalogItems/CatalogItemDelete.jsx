import React from 'react';
import {getCategoryObjForItemId} from './CatalogItem.utils';
import {getAllCategoriesForDD, getErrorMessageOutOfErrorObj} from '../categories/Categories.utils';
import EditAddDeleteItem from 'components/EditAddDeleteItem/EditAddDeleteItem';
import {removeItemFromCategory} from 'actions/Categories.action';
import {connect} from 'react-redux';
import {APIEndpoints, buildURL, HTTP} from '../../utility/HTTPRequests';
import {setErrorMessage, setNOtificationMessage} from '../../actions/UIProperties.action';
import {performUserOperationsOnServerFailure} from '../../actions/Login.actions';

@connect(store => ({
	categories: store.categories,
}))
export default class CatalogItemDelete extends React.Component {

	constructor(props) {
		super(props);

		this.selectedCategory = {};
		this.selectedItem = {};
	}

	handleItemRemove = () => {
		HTTP.DELETE(buildURL(APIEndpoints.DELETE_ITEM, {itemId: parseInt(this.selectedItem.id)})).then(res => {
			this.props.dispatch(removeItemFromCategory(this.selectedCategory.id, this.selectedItem.id));
			this.props.dispatch(setNOtificationMessage(`Deleted Catalog Item : "${this.selectedItem.name}"`));
			this.props.history.push('/');
			this.props.history.goForward();
		}).catch((err) => {
			this.props.dispatch(performUserOperationsOnServerFailure(err));
			this.props.dispatch(setErrorMessage(`Failed to delete Catalog Item : "${this.selectedItem.name}".\n\n Error Message: ${getErrorMessageOutOfErrorObj(err)}`));
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
					submitButtonTitle='Delete'
					submitForm={this.handleItemRemove}
					itemDescriptionDisabled={true}
					itemNameDisabled={true}
					goBackFunction={history.goBack}/>
			</div>
		);
	}
}