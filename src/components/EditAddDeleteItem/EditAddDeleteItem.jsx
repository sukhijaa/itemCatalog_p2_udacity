import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './EditAddDeleteItem.scss';

@connect(store => ({
	userId: store.loginData.userId,
}))
export default class EditAddDeleteItem extends React.PureComponent {
    static propTypes = {
    	categoriesDD: PropTypes.array,
    	selectedCategory: PropTypes.string,
    	categoryDisabled: PropTypes.bool,
    	itemName: PropTypes.string,
    	itemNameDisabled: PropTypes.bool,
    	itemDescription: PropTypes.string,
    	itemDescriptionDisabled: PropTypes.bool,
    	submitForm: PropTypes.func,
    	submitButtonTitle: PropTypes.string,
    	goBackFunction: PropTypes.func,
    	creatorId: PropTypes.number,
    };

    static defaultProps = {
    	categoriesDD: [],
    	selectedCategory: '',
    	categoryDisabled: false,
    	itemName: '',
    	itemNameDisabled: false,
    	itemDescription: '',
    	itemDescriptionDisabled: false,
    	submitButtonTitle: 'Save',
    	submitForm: () => {},
    	goBackFunction: () => {},
    	creatorId: -1,
    };

    constructor(props) {
    	super(props);

    	this.state = {
    		newCategory: props.selectedCategory || '',
    		newName: props.itemName || '',
    		newDescription: props.itemDescription || '',
    	};
    }

    componentDidUpdate(prevProps) {
    	const setStateForProp = (stateName, stateVal) => this.setState({[stateName]: stateVal});

    	if (this.props.itemName !== prevProps.itemName) {
    		setStateForProp('newName', this.props.itemName);
    	}
    	if (this.props.itemDescription !== prevProps.itemDescription) {
    		setStateForProp('newDescription', this.props.itemDescription);
    	}
    	if (this.props.selectedCategory !== prevProps.selectedCategory) {
    		setStateForProp('newCategory', this.props.selectedCategory);
    	}
    }


    updateCategory = (selectedObj) => this.setState({newCategory: selectedObj.value});
    updateName = (target) => this.setState({newName: target.target.value});
    updateDesc = (target) => this.setState({newDescription: target.target.value});

    handleFormSubmit = () => {
    	const {newCategory, newName, newDescription} = this.state;
    	this.props.submitForm(newCategory, newName, newDescription);
    };

    render() {
    	const {categoriesDD, categoryDisabled, itemNameDisabled,
    		itemDescriptionDisabled, submitButtonTitle, goBackFunction, creatorId, userId} = this.props;
    	const {newCategory, newName, newDescription} = this.state;
    	const isOwner = userId === creatorId;
    	return (
    		<div className='edit-add-delete-item-wrapper'>
    			{
    				!isOwner  ?
    					<div className='eadiw-current-user-owner'>
							You are not the owner of this entry
    					</div> : null
    			}
    			{
    				categoryDisabled ? null :
    					<div className='eadiw-category-dd'>
    						<div className='eadiw-label'>Category Selected :</div>
    						<Dropdown options={categoriesDD}
    							value={newCategory}
    							onChange={this.updateCategory}/>
    					</div>
    			}
    			<div className='eadiw-item-name-wrapper'>
    				<div className='eadiw-label'>Name :</div>
    				<input type='text'
    					value={newName}
    					onChange={this.updateName}
    					placeholder='Enter Title'
    					disabled={itemNameDisabled}/>
    			</div>
    			<div className='eadiw-item-name-wrapper'>
    				<div className='eadiw-label'>Description :</div>
    				<textarea type='text'
    					value={newDescription}
    					onChange={this.updateDesc}
    					placeholder='Enter Description'
    					disabled={itemDescriptionDisabled}/>
    			</div>
    			<div className='eadiw-submit-button'>
    				{
    					isOwner ?
    						<input type='button'
    							onClick={this.handleFormSubmit}
    							value={submitButtonTitle}/>
    						: null
    				}
    				<input type='button'
    					onClick={goBackFunction}
    					value='Cancel'/>
    			</div>
    		</div>
    	);
    }
}