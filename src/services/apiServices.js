import axios from 'axios'

export default axios.create({
	baseURL: 'https://city-guide-api.herokuapp.com/',
})
