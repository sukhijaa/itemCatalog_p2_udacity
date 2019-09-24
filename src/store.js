import {applyMiddleware, compose, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from 'reducers/Reducers.js';

export let STORE_DATA = {};

export default function configureStore(preloadedState) {
	const middlewares = [thunkMiddleware];
	const middlewareEnhancer = applyMiddleware(...middlewares);

	const enhancers = [middlewareEnhancer];
	const composedEnhancers = compose(...enhancers);

	STORE_DATA = createStore(rootReducer, preloadedState, composedEnhancers);

	return STORE_DATA;
}