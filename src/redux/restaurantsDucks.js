import axios from 'axios'

import { baseURLRestaurants } from '../services/apiServices'

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

export default function businessReducer(state = initialData, action) {
	switch (action.type) {
		case LOADING:
			return { ...state, status: 'pending' }

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

export const loadingBusinesses = () => ({
	type: LOADING,
})

export const getAllBusinesses = () => async (dispatch, getState) => {
	try {
		const res = await axios.get(`${baseURLRestaurants}`)
		dispatch({
			type: GET_ALL_RESTAURANTS,
			payload: res.data.businesses,
		})
	} catch (error) {
		console.log(error)
	}
}

export const getAllBusinessesError = error => ({
	type: GET_ALL_RESTAURANTS_ERROR,
	error,
})

export const getBusiness = id => async (dispatch, getState) => {
	try {
		const res = await axios.get(`${baseURLRestaurants}/${id}`)

		dispatch({
			type: GET_RESTAURANT,
			payload: res.data.businesses,
		})
	} catch (error) {
		console.log(error)
	}
}

export const getBusinessError = error => ({
	type: GET_RESTAURANT_ERROR,
	error,
})

export const createBusiness = () => async (dispatch, getState) => {
	try {
		const res = await axios.post(`${baseURLRestaurants}/create`)

		dispatch({
			type: CREATE_RESTAURANT,
			payload: res.data.businesses,
		})
	} catch (error) {
		console.log(error)
	}
}

export const createBusinessError = error => ({
	type: CREATE_RESTAURANT_ERROR,
	error,
})

export const updateBusiness = id => async (dispatch, getState) => {
	try {
		const res = await axios.put(`${baseURLRestaurants}/edit/${id}`)

		dispatch({
			type: UPDATE_RESTAURANT,
			payload: res.data.businesses,
		})
	} catch (error) {
		console.log(error)
	}
}

export const updateBusinessError = error => ({
	type: UPDATE_RESTAURANT_ERROR,
	error,
})

export const deleteBusiness = id => async (dispatch, getState) => {
	try {
		const res = await axios.delete(`${baseURLRestaurants}/delete/${id}`)

		dispatch({
			type: DELETE_RESTAURANT,
			payload: res.data.businesses,
		})
	} catch (error) {
		console.log(error)
	}
}

export const deleteBusinessError = error => ({
	type: DELETE_RESTAURANT_ERROR,
	error,
})
