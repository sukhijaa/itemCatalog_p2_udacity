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
import Profile from './routes/profile/Profile';

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
						<Route path='/profile' component={Profile}/>
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
	const currentPath = ((history.location || {}).pathname || '');

	const isItemPath = currentPath.startsWith('/item');
	const isCategoryPath = currentPath.startsWith('/category');
	const isProfilePath = currentPath === '/profile';

	const isEditPath = currentPath.includes('edit') || currentPath.includes('delete')
		|| currentPath.includes('new') || isProfilePath;

	if (isEditPath && (isItemPath || isCategoryPath || isProfilePath) && !isLoggedIn) {
	    return (
			<Redirect to='/login'/>
		);
	} else if (!isItemPath && !isCategoryPath && currentPath !== '/' && !['/login', '/profile'].includes(currentPath)) {
		return (
			<Redirect to='/'/>
		);
	}
	return null;
});