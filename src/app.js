import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store';
import {Provider} from 'react-redux';
import Router from './Router';

const store = configureStore();


ReactDOM.render(
	<Provider store={store}>
		<Router/>
	</Provider>
	, document.getElementById('app'));