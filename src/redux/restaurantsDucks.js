import axios from 'axios'

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

const CREATERESTAURANTREVIEW_REQUEST = 'CREATERESTAURANTREVIEW_REQUEST'
const CREATERESTAURANTREVIEW = 'CREATERESTAURANTREVIEW'
const CREATERESTAURANTREVIEW_ERROR = 'CREATERESTAURANTREVIEW_ERROR'

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

//Actions

export const loadingRestaurants = () => ({})

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
