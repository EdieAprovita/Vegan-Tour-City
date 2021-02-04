import React from 'react'
import { Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import generateStore from './redux/store'

function App() {
	const store = generateStore()
	return (
		<Provider store={store}>
			<h1>Hola mundo</h1>
		</Provider>
	)
}

export default App
