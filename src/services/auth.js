import axios from 'axios'

const baseURL = 'http://localhost:5000/auth'
const authService = axios.create({
	baseURL,
	withCredentials: true,
})

export const signup = async user => {
	await authService.post('/signup', user)
	return true
}

export const login = async userData => {
	const { data: user } = await authService.post('/login', userData)
	return user
}

export const getCurrentUser = async () => {
	const { data: user } = await authService.get('/current-user')
	return user
}

export const logOut = async () => {
	await authService.get('/logout')
}
