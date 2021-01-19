import './App.css'
import Navbar from './components/Navbar'
import Recipes from "./components/Recipes"

import { Provider } from 'react-redux'
import generateStore from "./redux/store"

function App() {

	const store = generateStore()
	return (
		<Provider store={store}>
			<Navbar />
			<Recipes />
		</Provider>
	)
}

export default App
