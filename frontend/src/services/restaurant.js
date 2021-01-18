import axios from 'axios'
const baseURL = 'http://localhost:5000/api/restaurants'

const restaurantService = axios.create({ baseURL })

export const newRestaurant = async ({
	name,
	author,
	typePlace,
	address,
	imgUrl,
	numReviews,
}) => {
	try {
		const { data: restaurant } = await restaurantService.post('/', {
			name,
			author,
			typePlace,
			address,
			imgUrl,
			numReviews,
		})
		return restaurant
	} catch (error) {
		return { message: `${error}` }
	}
}

export const getRestaurants = async () => {
	try {
		const { data: restaurants } = await restaurantService.get('/')
		return restaurants
	} catch (error) {
		return { message: `${error}` }
	}
}

export const getRestaurant = async restaurantID => {
	try {
		const { data: restaurant } = await restaurantService.get(`/${restaurantID}`)
		return restaurant
	} catch (error) {
		return { message: `${error}` }
	}
}

export const editRestaurant = async (restaurantID, name, typePlace, address, imgUrl) => {
	try {
		const { data: restaurant } = await restaurantService.put(`/${restaurantID}`, {
			name,
			typePlace,
			address,
			imgUrl,
		})
		return restaurant
	} catch (error) {
		return { message: `${error}` }
	}
}

export const deleteRestaurant = async restaurantID => {
	try {
		const { data } = await restaurantService.delete(`/${restaurantID}`)
		return data
	} catch (error) {
		return { message: `${error}` }
	}
}
