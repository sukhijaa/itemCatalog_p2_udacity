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
        const {categories, history} = this.props;

        const allCategories = getAllCategoriesForDD(categories);

        return (
            <div className='catalog-item-edit-wrapper'>
                <EditAddDeleteItem
                    categoriesDD={allCategories}
                    selectedCategory={(allCategories[0] || {}).value}
                    submitButtonTitle={'Add'}
                    submitForm={this.handleItemUpdate}
                    goBackFunction={history.goBack}/>
            </div>
        );
    }
}