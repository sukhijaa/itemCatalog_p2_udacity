import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './Categories.scss';

export default class CategoryDetails extends React.Component {
	static propTypes = {
		catagoryItem: PropTypes.object,
		linkPrefix: PropTypes.string
	};

	static defaultProps = {
		linkPrefix: 'category'
	}

	constructor (props) {
		super(props);
	}
	render() {
		const {catagoryItem, linkPrefix} = this.props;
		return (
			<div className='category-detail-wrapper'>
				<div className={'category-expandable-icon'}> > </div>
				<div className={'category-name'}>{catagoryItem.name || ''}</div>
				<div className={'category-short-description'}>
					{catagoryItem.description ?
						`| ${catagoryItem.description.length > 60 ? catagoryItem.description.substr(0, 57) + '...' : catagoryItem.description}`
						: null }
				</div>
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