import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import Navbar from './components/Navbar'

import { Provider } from 'react-redux'
import generateStore from './redux/store'

function App() {
	const store = generateStore()
	return (
		<Provider store={store}>
			<Navbar />
			<Container>
				<Switch>
					<h1>Hola mundo</h1>
				</Switch>
			</Container>
		</Provider>
	)
}

export default App
