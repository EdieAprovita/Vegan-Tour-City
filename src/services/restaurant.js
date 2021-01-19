import axios from 'axios'

let baseURL

process.env.NODE_ENV === 'production'
	? (baseURL = process.env.production)
	: (baseURL = process.env.developer)

const restaurantService = axios.create({
	baseURL,
	withCredentials: true,
})

export const getAllRestaurants = () => restaurantService.get('/restaurants')

export const getRestaurant = id => restaurantService.get(`/restaurants/${id}`)

export const createRestaurant = restaurant =>
	restaurantService.post('/restaurants', restaurant)

export const updateRestaurant = (id, restaurant) =>
	restaurantService.put(`/restaurants/${id}`, restaurant)

export const deleteRestaurant = id => restaurantService.delete(`/restaurants/${id}`)
