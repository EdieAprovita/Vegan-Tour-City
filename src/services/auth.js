import axios from 'axios'

let baseURL

process.env.NODE_ENV === 'production'
	? (baseURL = process.env.production)
	: (baseURL = process.env.developer)

const authService = axios.create({
	baseURL,
	withCredentials: true,
})

export const signUp = userInfo => authService.post('/auth/signup', userInfo)

export const login = userInfo => authService.post('/auth/login', userInfo)

export const currentUser = () => authService.get('/auth/current-user')

export const logout = () => authService.get('/auth/logout')
