import React from 'react';
import {addCategory} from "../../actions/Categories.action";
import EditAddDeleteItem from "../../components/EditAddDeleteItem/EditAddDeleteItem";
import {connect} from "react-redux";

@connect(store => ({categories: store.categories}))
export default class CategoryCreateNew extends React.Component {

    handleCategoryUpdate = (newCat, name, description) => {
        this.props.dispatch(addCategory(name || 'New Category 1', description));
        this.props.history.push('/');
        this.props.history.goForward();
    };

    render() {
        const {history} = this.props;

        return (
            <div className='category-edit-wrapper'>
                <EditAddDeleteItem
                    categoryDisabled={true}
                    goBackFunction={history.goBack}
                    submitButtonTitle={'Add'}
                    submitForm={this.handleCategoryUpdate}/>
            </div>
        );
    }
}