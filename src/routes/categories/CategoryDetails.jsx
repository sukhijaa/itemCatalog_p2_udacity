import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './Categories.scss';

export default class CategoryDetails extends React.Component {
	static propTypes = {
		catagoryItem: PropTypes.object,
		linkPrefix: PropTypes.string,
		expandable: PropTypes.bool,
		category: PropTypes.string,
	};

	static defaultProps = {
		linkPrefix: 'category',
		expandable: true,
		category: ''
	};

	constructor (props) {
		super(props);
	}
	render() {
		const {catagoryItem, linkPrefix, category, expandable} = this.props;
		return (
			<div className='category-detail-wrapper'>
				{
					expandable ?
						<div className={'category-expandable-icon'}> > </div>
						: null
				}
				<div className={'category-name'}>{catagoryItem.name || ''}</div>
				{
					catagoryItem.description ?
						<div className={'category-short-description'}>
							{`| ${catagoryItem.description.length > 60 ? catagoryItem.description.substr(0, 57) + '...' : catagoryItem.description}`}
						</div> : null
				}
				{
					category ?
						<div className={'category-type-for-item'}>{` | Category : ${category}`}</div>
						: null
				}
				<div className={'category-item-edit-link'}>
					<Link to={`/${linkPrefix}/${catagoryItem.id}/edit`}>Edit</Link>
				</div>
				<div className={'category-item-delete-link'}>
					<Link to={`/${linkPrefix}/${catagoryItem.id}/delete`}>Delete</Link>
				</div>
			</div>
		);
	}
}