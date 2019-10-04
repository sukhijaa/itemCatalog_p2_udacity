import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Categories from './routes/categories/Categories';
import CategoryEdit from './routes/categories/CategoryEdit';
import CategoryDelete from './routes/categories/CategoryDelete';
import CatalogItemEdit from './routes/catalogItems/CatalogItemEdit';
import CatalogItemDelete from './routes/catalogItems/CatalogItemDelete';
import Header from './components/header/Header';
import CategoryCreateNew from './routes/categories/CategoryCreateNew';
import CatalogItemNew from './routes/catalogItems/CatalogItemNew';
import {addAllCategories} from './actions/Categories.action';
import ShowNotification from './components/notifications/ShowNotification';
import EntityDetails from './components/entityDetails/EntityDetails';
import Login from './routes/login/Login';

@connect(store => ({
	isLoggedIn: store.loginData.isLoggedIn,
}))
export default class Router extends React.Component {

	componentDidMount() {
		addAllCategories(this.props.dispatch);
	}


	render() {
		return (
			<div className='item-catalog-wrapper'>
				<BrowserRouter>
					<ShowNotification/>
					<Header/>
					<RedirectManager isLoggedIn={this.props.isLoggedIn}/>
					<Switch>
						<Route path='/login' component={Login}/>
						<Route path='/category/:id/edit' component={CategoryEdit}/>
						<Route path='/category/:id/delete' component={CategoryDelete}/>
						<Route path='/category/new' component={CategoryCreateNew}/>
						<Route path='/category/:id' component={EntityDetails}/>
						<Route path='/item/:id/edit' component={CatalogItemEdit}/>
						<Route path='/item/:id/delete' component={CatalogItemDelete}/>
						<Route path='/item/new' component={CatalogItemNew}/>
						<Route path='/item/:id' component={EntityDetails}/>
						<Route component={Categories}/>
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

const RedirectManager = withRouter(({history, isLoggedIn}) => {
	console.log(history);
	const currentPath = ((history.location || {}).pathname || '');

	const isItemPath = currentPath.startsWith('/item');
	const isCategoryPath = currentPath.startsWith('/category');

	const isEditPath = currentPath.includes('edit') || currentPath.includes('delete') || currentPath.includes('new');

	if (isEditPath && (isItemPath || isCategoryPath) && !isLoggedIn) {
	    return (
			<Redirect to='/login'/>
		);
	} else if (!isItemPath && !isCategoryPath && currentPath !== '/' && currentPath !== '/login') {
		return (
			<Redirect to='/'/>
		);
	}
	return null;
});