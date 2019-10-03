import React from 'react';
import {connect} from "react-redux";
import EditAddDeleteItem from "../../components/EditAddDeleteItem/EditAddDeleteItem";
import {editCategory} from "../../actions/Categories.action";
import {APIEndpoints, buildURL, HTTP} from "../../utility/HTTPRequests";
import {setErrorMessage, setNOtificationMessage} from "../../actions/UIProperties.action";

@connect(store => ({categories: store.categories}))
export default class CategoryEdit extends React.Component {

	handleCategoryUpdate = (newCat, name, description) => {
		HTTP.POST(
			buildURL(APIEndpoints.EDIT_CATEGORY, {categoryId: this.selectedCategory.id}),
			{name: name || 'New Category 1', description}).then(res => {
			this.props.dispatch(editCategory(this.selectedCategory.id, res.data));
			this.props.dispatch(setNOtificationMessage(`${name} : Updated Succesfully`));
			this.props.history.push('/');
			this.props.history.goForward();
		}).catch(err => {
			this.props.dispatch(setErrorMessage(`Failed to update Category : ${name} \n\nError Message: ${err.message}`))
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
					itemDescription={this.selectedCategory.description}
					goBackFunction={history.goBack}
					submitForm={this.handleCategoryUpdate}/>
			</div>
		);
	}
}