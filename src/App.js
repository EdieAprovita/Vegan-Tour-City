import React from 'react'
import { Route } from 'react-router-dom'
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
				<Route path='/recetas' component={Recipes} />
				<Route path='/restaurantes' component={Restaurants} />
				<Route path='/mercados' component={Markets} />
				<Route path='/negocios' component={Businesses} />
			</Container>
		</Provider>
	)
}

export default App
