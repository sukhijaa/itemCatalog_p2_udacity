import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addAllCategories} from '../../actions/Categories.action';
import {Link} from 'react-router-dom';
import CategoryDetails from '../../routes/categories/CategoryDetails';
import './EntityDetails.scss';

@connect(store => ({
	categories: store.categories || [],
	isLoggedIn: store.loginData.isLoggedIn,
}))
export default class EntityDetails extends React.Component {
    static propTypes = {
    	categories: PropTypes.object,
    	location: PropTypes.object,
    };

    static defaultProps = {
    	categories: [],
    };

    constructor(props) {
    	super(props);

    	this.isCategory = true;
    	this.parentCategory = null;
    }

    componentDidMount() {
    	if (!this.props.categories.length) {
    		addAllCategories(this.props.dispatch);
    	}
    }

    getEntityId = (entityStr) => {
    	const {location: {pathname}} = this.props;
    	const paths = pathname.split('/');

    	const entityIndex = paths.findIndex(str => str.toLowerCase().includes(entityStr));

    	if (entityIndex === -1 || entityIndex >= paths.length) {
    		return -1;
    	}

    	const catalogId = parseInt(paths[entityIndex + 1]);
    	return typeof catalogId === 'number' ? catalogId : -1;
    };

    getCurrentEntity = () => {
    	const categoryId = this.getEntityId('category');
    	const itemId = categoryId === -1 ? this.getEntityId('item') : -1;
    	if (categoryId !== -1) {
    		this.isCategory = true;
    		return this.props.categories[categoryId];
    	} else if (itemId !== -1) {
    		this.isCategory = false;
    		let foundEntity = null;
    		const categoryId = Object.keys(this.props.categories).find(catId => {
    			const category = this.props.categories[catId] || {};
    			const item = (category.catalogItems || {})[itemId];
    			foundEntity = item ? item : foundEntity;
    			return !!item;
    		});
    		if (typeof categoryId === 'string' || typeof categoryId === 'number') {
    			this.parentCategory = this.props.categories[categoryId];
    			return foundEntity;
    		}
    	}

    	return null;
    };

    render() {

    	const currentEntity = this.getCurrentEntity();

    	if (!currentEntity) {
    		return 'Data not found';
    	}

    	return (
    		<div className='entity-details-wrapper'>
    			<div className='entity-name-wrapper'>
    				<div className='entity-name'>{currentEntity.name}</div>
    				<div className='entity-type'>| &nbsp;
    					{
    						this.isCategory ? 'Category' : `${this.parentCategory.name}`
    					}
    				</div>
    			</div>
    			<div className='entity-description'>{currentEntity.description || 'No Description'}</div>
    			{
    				this.isCategory ?
    					<div className='entity-catalog-items'>
    						<div className='entity-catalog-items-labels'>{Object.keys(currentEntity.catalogItems || {}).length + 'Items'}</div>
    						<div className='category-items-wrapper'>
    							{
    								Object.keys(currentEntity.catalogItems || {}).map(itemId => {
    									const item = currentEntity.catalogItems[itemId];
    									return (
    										<CategoryDetails
	categoryItem={item}
	expandable={false}
	linkPrefix='item'/>
    									);
    								})
    							}
    							<div className='add-item-link'>
    								<Link to={`/item/new?catalogId=${currentEntity.id}`}>Add Item</Link>
    							</div>
    						</div>
    					</div>  : null
    			}

    			{
    				this.props.isLoggedIn ?
    					<div className='entity-footer'>
    						<Link to={`/${this.isCategory ? 'category' : 'item'}/${currentEntity.id}/edit`}>
    							<div className='edit-entity'>Edit</div>
    						</Link>
    						<div className='cancel-entity' onClick={this.props.history.goBack}>Back</div>
    					</div> : null
    			}
    		</div>
    	);
    }
}