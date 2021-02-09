import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import Navbar from './components/Navbar'
import Recipes from './pages/recipes/Recipes'
import Markets from './pages/markets/Markets'
import Restaurants from './pages/restaurant/Restaurants'
import Businesses from './pages/businesses/Businesses'

import { Provider } from 'react-redux'
import generateStore from './redux/store'

function App() {
	const store = generateStore()
	return (
		<Provider store={store}>
			<Navbar />
			<Container>
				<Switch>
					<Route path='/recipes' component={Recipes} />
					<Route path='/restaurants' component={Restaurants} />
					<Route path='/markets' component={Markets} />
					<Route path='/businesses' component={Businesses} />
				</Switch>
			</Container>
		</Provider>
	)
}

export default App
