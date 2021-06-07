import axios from 'axios'
let baseURL

process.env.NODE_ENV === 'production'
	? (baseURL = 'https://city-guide-api.herokuapp.com/')
	: (baseURL = 'http://localhost:3000')

const backend = axios.create({ withCredentials: true, baseURL })

export default backend
