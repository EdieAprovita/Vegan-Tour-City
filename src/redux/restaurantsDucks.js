import axios from 'axios'

import backend from '../services/apiServices'

//Constants

const initialData = {
	restaurantsArr: [],
	status: '',
	error: undefined,
}

//Types
const LOADING = 'LOADING'

const GET_ALL_RESTAURANTS = 'GET_ALL_RESTAURANTS'
const GET_ALL_RESTAURANTS_ERROR = 'GET_ALL_RESTAURANTS_ERROR'

const GET_RESTAURANT = 'GET_ALL_RESTAURANT'
const GET_RESTAURANT_ERROR = 'GET_RESTAURANT_ERROR'

const CREATE_RESTAURANT = 'CREATE_RESTAURANT'
const CREATE_RESTAURANT_ERROR = 'CREATE_RESTAURANT_ERROR'

const UPDATE_RESTAURANT = 'UPDATE_RESTAURANT'
const UPDATE_RESTAURANT_ERROR = 'UPDATE_RESTAURANT_ERROR'

const DELETE_RESTAURANT = 'DELETE_RESTAURANT'
const DELETE_RESTAURANT_ERROR = 'DELETE_RESTAURANT_ERROR'

const GETTOPRESTAURANT = 'GETTOPRESTAURANT'
const GETTOPRESTAURANT_ERROR = 'GETTOPRESTAURANT_ERROR'

const CREATERESTAURANTREVIEW = 'CREATERESTAURANTREVIEW'
const CREATERESTAURANTREVIEW_ERROR = 'CREATERESTAURANTREVIEW_ERROR'

//Reducer

export default function restaurantsReducer(state = initialData, action) {
	switch (action.type) {
		case LOADING:
			return { ...state, status: 'pending', loading: true }

		case GET_ALL_RESTAURANTS:
			return { ...state, status: 'success', restaurantsArr: action.payload }

		case GET_ALL_RESTAURANTS_ERROR:
			return { ...state, status: 'error', error: action.error }

		case GET_RESTAURANT:
			return { ...state, status: 'success', restaurantsArr: action.payload }

		case GET_RESTAURANT_ERROR:
			return { ...state, status: 'error', error: action.error }

		case CREATE_RESTAURANT:
			return { ...state, status: 'success', restaurantsArr: action.payload }

		case CREATE_RESTAURANT_ERROR:
			return { ...state, status: 'error', error: action.error }

		case UPDATE_RESTAURANT:
			return { ...state, status: 'success', restaurantsArr: action.payload }

		case UPDATE_RESTAURANT_ERROR:
			return { ...state, status: 'error', error: action.error }

		case DELETE_RESTAURANT:
			return { ...state, status: 'success', restaurantsArr: action.payload }

		case DELETE_RESTAURANT_ERROR:
			return { ...state, status: 'error', error: action.error }

		case GETTOPRESTAURANT:
			return { ...state, status: 'success', restaurantsArr: action.payload }

		case GETTOPRESTAURANT_ERROR:
			return { ...state, status: 'error', error: action.error }

		case CREATERESTAURANTREVIEW:
			return { ...state, status: 'success', restaurantsArr: action.payload }

		case CREATERESTAURANTREVIEW_ERROR:
			return { ...state, status: 'error', error: action.error }

		default:
			return state
	}
}

//Actions

export const loadingRestaurants = () => ({
	type: LOADING,
})

export const getAllRestaurants = () => async (dispatch, getState) => {
	const res = await axios.get(`${backend}/restaurants`)
	dispatch({
		type: GET_ALL_RESTAURANTS,
		payload: res.data.businesses,
	})
}

export const getAllRestaurantsError = error => ({
	type: GET_ALL_RESTAURANTS_ERROR,
	error,
})

export const getRestaurant = id => async (dispatch, getState) => {
	const res = await axios.get(`${backend}/restaurants/${id}`)

	dispatch({
		type: GET_RESTAURANT,
		payload: res.data.restaurants,
	})
}

export const getRestaurantError = error => ({
	type: GET_RESTAURANT_ERROR,
	error,
})

export const createRestaurant = () => async (dispatch, getState) => {
	const res = await axios.post(`${backend}/restaurants/create`)

	dispatch({
		type: CREATE_RESTAURANT,
		payload: res.data.businesses,
	})
}

export const createRestaurantError = error => ({
	type: CREATE_RESTAURANT_ERROR,
	error,
})

export const updateRestaurant = id => async (dispatch, getState) => {
	const res = await axios.put(`${backend}/restaurants/edit/${id}`)

	dispatch({
		type: UPDATE_RESTAURANT,
		payload: res.data.restaurants,
	})
}

export const updateRestaurantError = error => ({
	type: UPDATE_RESTAURANT_ERROR,
	error,
})

export const deleteRestaurant = id => async (dispatch, getState) => {
	const res = await axios.delete(`${backend}/restaurants/delete/${id}`)

	dispatch({
		type: DELETE_RESTAURANT,
		payload: res.data.restaurants,
	})
}

export const deleteRestaurantError = error => ({
	type: DELETE_RESTAURANT_ERROR,
	error,
})
