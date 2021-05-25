import React from 'react'
import { Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import Navbar from './components/Navbar'

import Footer from './components/Footer'

import { Provider } from 'react-redux'
import store from './redux/store'

const App = () => {
	return (
		<Provider store={store}>
			<Navbar />
			<main className='py-3'>
				<Container>
					<h1>Main Page</h1>
				</Container>
			</main>
			<Footer />
		</Provider>
	)
}

export default App
