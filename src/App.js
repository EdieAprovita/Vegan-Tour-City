import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import generateStore from './redux/store'

function App() {
	const store = generateStore()
	return (
		<Provider store={store}>
			<Switch>
				<h1>Hola mundo</h1>
			</Switch>
		</Provider>
	)
}

export default App
