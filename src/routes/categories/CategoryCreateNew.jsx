import React from 'react';
import {addCategory} from "../../actions/Categories.action";
import EditAddDeleteItem from "../../components/EditAddDeleteItem/EditAddDeleteItem";
import {connect} from "react-redux";
import {APIEndpoints, HTTP} from "../../utility/HTTPRequests";

@connect(store => ({categories: store.categories}))
export default class CategoryCreateNew extends React.Component {

    handleCategoryUpdate = (newCat, name, description) => {
        HTTP.POST(APIEndpoints.NEW_CATEGORY, {name, description}).then(res => {
            this.props.dispatch(addCategory(res.data));
            this.props.history.push('/');
            this.props.history.goForward();
        });
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