import React from 'react';
import {addCategory} from '../../actions/Categories.action';
import EditAddDeleteItem from '../../components/EditAddDeleteItem/EditAddDeleteItem';
import {connect} from 'react-redux';
import {APIEndpoints, HTTP} from '../../utility/HTTPRequests';
import {setErrorMessage, setNOtificationMessage} from '../../actions/UIProperties.action';
import {performUserOperationsOnServerFailure} from '../../actions/Login.actions';
import {getErrorMessageOutOfErrorObj} from './Categories.utils';

@connect(store => ({
	categories: store.categories,
	userId: store.loginData.userId,
}))
export default class CategoryCreateNew extends React.Component {

    handleCategoryUpdate = (newCat, name, description) => {
    	HTTP.POST(APIEndpoints.NEW_CATEGORY, {name, description}).then(res => {
    		this.props.dispatch(addCategory(res.data));
    		this.props.dispatch(setNOtificationMessage(`Added new Category :  "${name}"`));
    		this.props.history.push('/');
    		this.props.history.goForward();
    	}).catch(err => {
    		this.props.dispatch(performUserOperationsOnServerFailure(err));
    		this.props.dispatch(setErrorMessage(`Failed to add Category : "${name}".\n\n Error Message: ${getErrorMessageOutOfErrorObj(err)}`));
    	});
    };

    render() {
    	const {history, userId} = this.props;

    	return (
    		<div className='category-edit-wrapper'>
    			<EditAddDeleteItem categoryDisabled={true}
    				creatorId={userId}
    				goBackFunction={history.goBack}
    				submitButtonTitle='Add'
    				submitForm={this.handleCategoryUpdate}/>
    		</div>
    	);
    }
}