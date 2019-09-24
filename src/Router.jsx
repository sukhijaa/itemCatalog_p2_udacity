import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Categories from './routes/restaurants/Categories';
import CategoryEdit from './routes/restaurants/CategoryEdit';
import CategoryDelete from './routes/restaurants/CategoryDelete';
import CategoryDetails from './routes/restaurants/CategoryDetails';
import CatalogItem from './routes/menuItems/CatalogItem';
import CatalogItemEdit from './routes/menuItems/CatalogItemEdit';
import CatalogItemDelete from './routes/menuItems/CatalogItemDelete';
import Header from './components/header/Header';

export default class Router extends React.Component {
	render() {
		return (
			<div className=''>
				<Header/>
				<BrowserRouter>
					<Switch>
						<Route path='/category/:id/edit' component={CategoryEdit}/>
						<Route path='/category/:id/delete' component={CategoryDelete}/>
						<Route path='/category/:id' component={CategoryDetails}/>
						<Route path='/item/:id/edit' component={CatalogItemEdit}/>
						<Route path='/item/:id/delete' component={CatalogItemDelete}/>
						<Route path='/item/:id' component={CatalogItem}/>
						<Route component={Categories}/>
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}