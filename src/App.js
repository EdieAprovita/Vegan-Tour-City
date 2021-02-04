import './App.css'

import { Provider } from 'react-redux'
import generateStore from './redux/store'

function App() {
	const store = generateStore()
	return <Provider store={store}></Provider>
}

export default App
