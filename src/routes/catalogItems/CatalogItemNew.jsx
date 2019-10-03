import React from 'react';
import {connect} from 'react-redux';
import {getAllCategoriesForDD} from '../categories/Categories.utils';
import {addItemToCategory} from '../../actions/Categories.action';
import EditAddDeleteItem from 'components/EditAddDeleteItem/EditAddDeleteItem';
import {APIEndpoints, buildURL, HTTP} from "../../utility/HTTPRequests";
import {setErrorMessage, setNOtificationMessage} from "../../actions/UIProperties.action";

@connect(store => ({
    categories: store.categories
}))
export default class CatalogItemNew extends React.Component {

    handleItemUpdate = (newCat, name, description) => {
        HTTP.POST(APIEndpoints.NEW_ITEM, {name: name || 'New Item 1', description, categoryId: parseInt(newCat)}).then(res => {
           this.props.dispatch(addItemToCategory(newCat, res.data));
           this.props.dispatch(setNOtificationMessage(`Added new Catalog Item "${name}"`));
            this.props.history.push('/');
            this.props.history.goForward();
        }).catch(err => {
            this.props.dispatch(setErrorMessage(`Failed to add new Catalog Item "${name}".\n\n Error Message: ${err.message}`))
        });
    };

    render() {
        const {categories, history, location} = this.props;

        const queryParams = location.search ? location.search.split('catalogId=') : [];
        let categoryId = queryParams.length >= 2 ? queryParams[1] : '';
        const allCategories = getAllCategoriesForDD(categories);

        categoryId = typeof parseInt(categoryId) === 'number' ? categoryId : allCategories[0].value;

        return (
            <div className='catalog-item-edit-wrapper'>
                <EditAddDeleteItem
                    categoriesDD={allCategories}
                    selectedCategory={categoryId}
                    submitButtonTitle={'Add'}
                    submitForm={this.handleItemUpdate}
                    goBackFunction={history.goBack}/>
            </div>
        );
    }
}