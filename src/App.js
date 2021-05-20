import React from 'react'
import { Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import Navbar from './components/Navbar'
import Recipes from './pages/recipes/RecipePage'
import Markets from './pages/markets/MarketPage'
import Restaurants from './pages/restaurant/RestaurantPage'
import Businesses from './pages/businesses/BusinessPage'
import Doctor from './pages/doctors/DoctorPage'
import Footer from './components/Footer'

import { Provider } from 'react-redux'
import store from './redux/store'
function App() {
	return (
		<Provider store={store}>
			<Navbar />
			<main className='py-3'>
				<Container>
					<Route path='/recetas' component={Recipes} />
					<Route path='/restaurantes' component={Restaurants} />
					<Route path='/mercados' component={Markets} />
					<Route path='/negocios' component={Businesses} />
					<Route path='/doctores' component={Doctor} />
				</Container>
			</main>
			<Footer />
		</Provider>
	)
}

export default App
