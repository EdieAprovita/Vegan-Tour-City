import axios from 'axios'

const baseURL = 'https://city-guide-api.herokuapp.com/api/auth'

const authService = axios.create({
	baseURL,
})

export const signup = userData => {
	return authService.post('/')
}
