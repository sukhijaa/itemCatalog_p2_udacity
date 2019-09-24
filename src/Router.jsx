import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Categories from './routes/categories/Categories';
import CategoryEdit from './routes/categories/CategoryEdit';
import CategoryDelete from './routes/categories/CategoryDelete';
import CategoryDetails from './routes/categories/CategoryDetails';
import CatalogItem from './routes/catalogItems/CatalogItem';
import CatalogItemEdit from './routes/catalogItems/CatalogItemEdit';
import CatalogItemDelete from './routes/catalogItems/CatalogItemDelete';
import Header from './components/header/Header';
import CategoryCreateNew from './routes/categories/CategoryCreateNew';
import CatalogItemNew from './routes/catalogItems/CatalogItemNew';

export default class Router extends React.Component {
	render() {
		return (
			<div className='item-catalog-wrapper'>
				<Header/>
				<BrowserRouter>
					<Switch>
						<Route path='/category/:id/edit' component={CategoryEdit}/>
						<Route path='/category/:id/delete' component={CategoryDelete}/>
						<Route path='/category/new' component={CategoryCreateNew}/>
						<Route path='/category/:id' component={CategoryDetails}/>
						<Route path='/item/:id/edit' component={CatalogItemEdit}/>
						<Route path='/item/:id/delete' component={CatalogItemDelete}/>
						<Route path='/item/new' component={CatalogItemNew}/>
						<Route path='/item/:id' component={CatalogItem}/>
						<Route component={Categories}/>
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}