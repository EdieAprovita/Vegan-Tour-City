import backend from '../services/apiServices'

import { logout } from './authDucks'

//Types

const GET_ALL_RESTAURANTS_REQUEST = 'GET_ALL_RESTAURANTS_REQUEST'
const GET_ALL_RESTAURANTS = 'GET_ALL_RESTAURANTS'
const GET_ALL_RESTAURANTS_ERROR = 'GET_ALL_RESTAURANTS_ERROR'

const GET_RESTAURANT_REQUEST = 'GET_RESTAURANT_REQUEST'
const GET_RESTAURANT = 'GET_ALL_RESTAURANT'
const GET_RESTAURANT_ERROR = 'GET_RESTAURANT_ERROR'

const CREATE_RESTAURANT_REQUEST = 'CREATE_RESTAURANT_REQUEST'
const CREATE_RESTAURANT = 'CREATE_RESTAURANT'
const CREATE_RESTAURANT_ERROR = 'CREATE_RESTAURANT_ERROR'

const UPDATE_RESTAURANT_REQUEST = 'UPDATE_RESTAURANT_REQUEST'
const UPDATE_RESTAURANT = 'UPDATE_RESTAURANT'
const UPDATE_RESTAURANT_ERROR = 'UPDATE_RESTAURANT_ERROR'

const DELETE_RESTAURANT_REQUEST = 'DELETE_RESTAURANT_REQUEST'
const DELETE_RESTAURANT = 'DELETE_RESTAURANT'
const DELETE_RESTAURANT_ERROR = 'DELETE_RESTAURANT_ERROR'

const GETTOPRESTAURANT_REQUEST = 'GETTOPRESTAURANT_REQUEST'
const GETTOPRESTAURANT = 'GETTOPRESTAURANT'
const GETTOPRESTAURANT_ERROR = 'GETTOPRESTAURANT_ERROR'

const CREATE_RESTAURANT_REVIEW_REQUEST = 'CREATERESTAURANTREVIEW_REQUEST'
const CREATE_RESTAURANT_REVIEW = 'CREATERESTAURANTREVIEW'
const CREATE_RESTAURANT_REVIEW_ERROR = 'CREATERESTAURANTREVIEW_ERROR'

//Reducer

export const restaurantsListReducer = (state = { restaurants: [] }, action) => {
	switch (action.type) {
		case GET_ALL_RESTAURANTS_REQUEST:
			return { loading: true, restaurants: [] }
		case GET_ALL_RESTAURANTS:
			return {
				loading: false,
				restaurants: action.payload.restaurants,
				pages: action.payload.pages,
				page: action.payload.page,
			}
		case GET_ALL_RESTAURANTS_ERROR:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const restaurantsDetailsReducer = (
	state = { restaurant: { reviews: [] } },
	action
) => {
	switch (action.type) {
		case GET_RESTAURANT_REQUEST:
			return { ...state, loading: true }
		case GET_RESTAURANT:
			return { loading: false, restaurant: action.payload }
		case GET_RESTAURANT_ERROR:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const restaurantCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case CREATE_RESTAURANT_REQUEST:
			return { loading: true }
		case CREATE_RESTAURANT:
			return { loading: false, success: true, restaurant: action.payload }
		case CREATE_RESTAURANT_ERROR:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const restaurantUpdateReducer = (state = { restaurant: {} }, action) => {
	switch (action.type) {
		case UPDATE_RESTAURANT_REQUEST:
			return { loading: true }
		case UPDATE_RESTAURANT:
			return { loading: true, success: true, restaurant: action.payload }
		case UPDATE_RESTAURANT_ERROR:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const restaurantDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_RESTAURANT_REQUEST:
			return { loading: true }
		case DELETE_RESTAURANT:
			return { loading: false, success: true }
		case DELETE_RESTAURANT_ERROR:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const restaurantTopReviewReducer = (state = { restaurants: [] }, action) => {
	switch (action.type) {
		case GETTOPRESTAURANT_REQUEST:
			return { loading: true, restaurants: [] }
		case GETTOPRESTAURANT:
			return { loading: false, restaurants: action.payload }
		case GETTOPRESTAURANT_ERROR:
			return { loading: false, error: action.payload }

		default:
			return state
	}
}

export const restaurantReviewCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case CREATE_RESTAURANT_REVIEW_REQUEST:
			return { loading: true }
		case CREATE_RESTAURANT_REVIEW:
			return { loading: false, success: true }
		case CREATE_RESTAURANT_REVIEW_ERROR:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
//Actions

export const listRestaurants = (keyword = '', pageNumber = '') => async dispatch => {
	try {
		dispatch({ type: GET_ALL_RESTAURANTS_REQUEST })

		const { data } = await backend.get(
			`/api/restaurants?keyword=${keyword}&pageNumber=${pageNumber}`
		)

		dispatch({
			type: GET_ALL_RESTAURANTS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: GET_ALL_RESTAURANTS_ERROR,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const listRestaurantsDetails = id => async dispatch => {
	try {
		dispatch({
			type: GET_RESTAURANT_REQUEST,
		})

		const { data } = await backend.get(`/api/restaurants/${id}`)

		dispatch({
			type: GET_RESTAURANT,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: GET_ALL_RESTAURANTS_ERROR,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const createRestaurant = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: CREATE_RESTAURANT_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await backend.post(`/api/restaurants`, {}, config)

		dispatch({
			type: CREATE_RESTAURANT,
			payload: data,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: CREATE_RESTAURANT_ERROR,
			payload: message,
		})
	}
}

export const updateRestaurant = restaurant => async (dispatch, getState) => {
	try {
		dispatch({
			type: UPDATE_RESTAURANT_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await backend.put(
			`/api/restaurants/${restaurant._id}`,
			restaurant,
			config
		)

		dispatch({
			type: UPDATE_RESTAURANT,
			payload: data,
		})

		dispatch({
			type: GET_RESTAURANT,
			payload: data,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: UPDATE_RESTAURANT_ERROR,
			payload: message,
		})
	}
}

export const deleteRestaurant = id => async (dispatch, getState) => {
	try {
		dispatch({
			type: DELETE_RESTAURANT_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		await backend.delete(`/api/restaurants/${id}`, config)

		dispatch({
			type: DELETE_RESTAURANT,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: DELETE_RESTAURANT_ERROR,
			payload: message,
		})
	}
}

