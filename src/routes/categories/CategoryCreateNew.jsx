import React from 'react';
import {addCategory} from "../../actions/Categories.action";
import EditAddDeleteItem from "../../components/EditAddDeleteItem/EditAddDeleteItem";
import {connect} from "react-redux";
import {APIEndpoints, HTTP} from "../../utility/HTTPRequests";
import {setErrorMessage, setNOtificationMessage} from "../../actions/UIProperties.action";

@connect(store => ({categories: store.categories}))
export default class CategoryCreateNew extends React.Component {

    handleCategoryUpdate = (newCat, name, description) => {
        HTTP.POST(APIEndpoints.NEW_CATEGORY, {name, description}).then(res => {
            this.props.dispatch(addCategory(res.data));
            this.props.dispatch(setNOtificationMessage(`Added new Category :  "${name}"`));
            this.props.history.push('/');
            this.props.history.goForward();
        }).catch(err => {
            this.props.dispatch(setErrorMessage(`Failed to add Category : "${name}".\n\n Error Message: ${err.message}`))
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