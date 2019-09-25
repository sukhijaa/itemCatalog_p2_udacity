import React from 'react';
import {connect} from 'react-redux';
import {getAllCategoriesForDD} from '../categories/Categories.utils';
import {addItemToCategory} from '../../actions/Categories.action';
import EditAddDeleteItem from 'components/EditAddDeleteItem/EditAddDeleteItem';

@connect(store => ({
    categories: store.categories
}))
export default class CatalogItemNew extends React.Component {

    handleItemUpdate = (newCat, name, description) => {
        this.props.dispatch(addItemToCategory(newCat || 'New Item 1', {name, description}));
        this.props.history.push('/');
        this.props.history.goForward();
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