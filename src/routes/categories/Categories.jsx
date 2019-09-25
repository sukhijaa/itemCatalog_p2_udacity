import React from 'react';
import {connect} from 'react-redux';
import {addAllCategories} from '../../actions/Categories.action';
import CategoryDetails from "./CategoryDetails";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {GROUPING_OPTIONS} from "./Categories.utils";
import {changeGroupingOrder} from "../../actions/UIProperties.action";

@connect(store => ({
	categories: store.categories,
	groupValue: store.uiProperties.groupOrder
}))
export default class Categories extends React.Component {

	constructor (props) {
		super (props);
	}

	handleGroupingChange = (selectedObj) => {
		this.props.dispatch(changeGroupingOrder(selectedObj.value));
	};

	getArrayToRender = () => {
		const {categories, groupValue} = this.props;
		let finalArray = [];

		if (groupValue === GROUPING_OPTIONS[1].value) {
			// Grouped By None
			Object.keys(categories || {}).forEach(catId => {
				const category = categories[catId] || {};
				Object.keys(category.catalogItems || {}).forEach(itemId => {
					const item = {...category.catalogItems[itemId]};
					item.category = category.name;
					finalArray.push(item);
				})
			})
		} else {
			// Grouped By Category
			finalArray = Object.keys(categories || {}).map(id => categories[id]);
		}

		return finalArray;
	};

	render() {
		const {groupValue} = this.props;

		const itemsArrayToRender = this.getArrayToRender();
		return (
			<div className='categories-wrapper'>
				<div className={'grouping-dd-wrapper'}>
					<span>Group By : </span>
					<Dropdown
						options={GROUPING_OPTIONS}
						value={groupValue}
						onChange={this.handleGroupingChange}/>
				</div>
				{
					itemsArrayToRender.map(itemToRender => {
						return (
							<CategoryDetails
								key={groupValue + itemToRender.id}
								catagoryItem={itemToRender}
								category={itemToRender.category || ''}
								expandable={!!itemToRender.catalogItems}
								linkPrefix={groupValue === GROUPING_OPTIONS[0].value ? 'category' : 'item'}/>
						)
					})
				}
			</div>
		);
	}
}