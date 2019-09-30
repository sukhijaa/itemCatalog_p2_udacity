import React from 'react';
import {removeCategory} from "../../actions/Categories.action";
import EditAddDeleteItem from "../../components/EditAddDeleteItem/EditAddDeleteItem";
import {connect} from "react-redux";
import {HTTP, APIEndpoints, buildURL} from "../../utility/HTTPRequests";

@connect(store => ({categories: store.categories}))
export default class CategoryDelete extends React.Component {

	state = {
		errorMessage: ''
	};

	handleCategoryUpdate = () => {
		HTTP.DELETE(buildURL(APIEndpoints.DELETE_CATEGORY, {categoryId: this.selectedCategory.id})).then(res => {
			this.props.dispatch(removeCategory(this.selectedCategory.id));
			this.props.history.push('/');
			this.props.history.goForward();
		}).error((err) => {
			this.setState({errorMessage: 'Unable to delete the Category. Reason being : ' + err.message})
		});
	};

	render() {
		const {categories, history} = this.props;
		const selectedCatId = ((this.props.match || {}).params || {}).id || '';

		this.selectedCategory = categories[selectedCatId];

		if (!this.selectedCategory) {
			return 'Category Not Found';
		}

		return (
			<div className='category-edit-wrapper'>
				<EditAddDeleteItem
					selectedCategory={this.selectedCategory.name}
					categoryDisabled={true}
					itemName={this.selectedCategory.name}
					itemNameDisabled={true}
					itemDescription={this.selectedCategory.description}
					itemDescriptionDisabled={true}
					goBackFunction={history.goBack}
					submitButtonTitle={'Delete'}
					submitForm={this.handleCategoryUpdate}/>
				<div className={'error-message'}>{this.state.errorMessage}</div>
			</div>
		);
	}
}