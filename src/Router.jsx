import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Categories from './routes/categories/Categories';
import CategoryEdit from './routes/categories/CategoryEdit';
import CategoryDelete from './routes/categories/CategoryDelete';
import CatalogItemEdit from './routes/catalogItems/CatalogItemEdit';
import CatalogItemDelete from './routes/catalogItems/CatalogItemDelete';
import Header from './components/header/Header';
import CategoryCreateNew from './routes/categories/CategoryCreateNew';
import CatalogItemNew from './routes/catalogItems/CatalogItemNew';
import {addAllCategories} from "./actions/Categories.action";
import ShowNotification from "./components/notifications/ShowNotification";
import EntityDetails from "./components/entityDetails/EntityDetails";

@connect()
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
					<Switch>
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