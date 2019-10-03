import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './Categories.scss';
import {collapseGroup, expandGroup} from '../../actions/UIProperties.action';

@connect(store => ({
	expandedGroups: store.uiProperties.expandedGroups,
}))
export default class CategoryDetails extends React.Component {
	static propTypes = {
		categoryItem: PropTypes.object,
		linkPrefix: PropTypes.string,
		expandable: PropTypes.bool,
		category: PropTypes.string,
	};

	static defaultProps = {
		linkPrefix: 'category',
		expandable: true,
		category: '',
	};

	constructor(props) {
		super(props);
	}

	handleExpansionClick = () => {
		const {categoryItem, expandedGroups} = this.props;
		const currentStatus = expandedGroups[categoryItem.id];

		if (currentStatus) {
			this.props.dispatch(collapseGroup(categoryItem.id));
		} else {
			this.props.dispatch(expandGroup(categoryItem.id));
		}

	};

	render() {
		const {categoryItem, linkPrefix, category, expandable, expandedGroups} = this.props;
		const currentStatus = expandable ? expandedGroups[categoryItem.id] : false;
		return (
			<div className='category-detail-wrapper'>
				<div className='category-detail-row-wrapper'>
					<div className='category-expandable-icon'>
						{
							expandable ?
								<div className={`arrow-right-accent ${currentStatus ? 'expanded' : ''}`}
									 onClick={this.handleExpansionClick}/>
								: null

						}
					</div>
					<Link to={`/${linkPrefix}/${categoryItem.id}`}>
						<div className='category-name'>{categoryItem.name || ''}</div>
					</Link>
					{
						categoryItem.description ?
							<div className='category-short-description'>
								{`| ${categoryItem.description.length > 60 ? categoryItem.description.substr(0, 57) + '...' : categoryItem.description}`}
							</div> : null
					}
					{
						category ?
							<div className='category-type-for-item'>{` | Category : ${category}`}</div>
							: null
					}
					<div className='category-item-edit-link'>
						<Link to={`/${linkPrefix}/${categoryItem.id}/edit`}>Edit</Link>
					</div>
					<div className='category-item-delete-link'>
						<Link to={`/${linkPrefix}/${categoryItem.id}/delete`}>Delete</Link>
					</div>
				</div>
				{
					currentStatus ?
						<div className='category-items-wrapper'>
							{
								Object.keys(categoryItem.catalogItems || {}).map(itemId => {
									const item = categoryItem.catalogItems[itemId];
									return (
										<CategoryDetails
											categoryItem={item}
											expandable={false}
											linkPrefix='item'/>
									);
								})
							}
							<div className='add-item-link'>
								<Link to={`/item/new?catalogId=${categoryItem.id}`}>Add Item</Link>
							</div>
						</div> : null
				}
			</div>
		);
	}
}