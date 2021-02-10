import React from 'react'
import { Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import Navbar from './components/Navbar'
import SearchBox from './components/SearchBox'
import Recipes from './pages/recipes/Recipes'
import Markets from './pages/markets/Markets'
import Restaurants from './pages/restaurant/Restaurants'
import Businesses from './pages/businesses/Businesses'
import Footer from './components/Footer'

import { Provider } from 'react-redux'
import generateStore from './redux/store'

function App() {
	const store = generateStore()
	return (
		<Provider store={store}>
			<Navbar />
			<SearchBox />
			<main className='py-3'>
				<Container>
					<Route path='/recetas' component={Recipes} />
					<Route path='/restaurantes' component={Restaurants} />
					<Route path='/mercados' component={Markets} />
					<Route path='/negocios' component={Businesses} />
				</Container>
			</main>
			<Footer />
		</Provider>
	)
}

export default App
