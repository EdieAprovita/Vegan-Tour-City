import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import recipesReducer from './recipesDucks'
import authReducer from './authDucks'
import marketsReducer from './marketsDucks'
import businessesReducer from './businessesDucks'
import restaurantsReducer from './restaurantsDucks'

const rootReducer = combineReducers({
	recipes: recipesReducer,
	markets: marketsReducer,
	businesses: businessesReducer,
	restaurants: restaurantsReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function generateStore() {
	const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
	return store
}
