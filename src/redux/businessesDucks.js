import axios from 'axios'

import backend from '../services/apiServices'

//Constants

const initialData = {
	businessArr: [],
	status: '',
	error: undefined,
}

//Types
const LOADING = 'LOADING'

const GET_ALL_BUSINESSES = 'GET_ALL_BUSINESSES'
const GET_ALL_BUSINESSES_ERROR = 'GET_ALL_BUSINESSES_ERROR'

const GET_BUSINESS = 'GET_ALL_BUSINESS'
const GET_BUSINESS_ERROR = 'GET_BUSINESS_ERROR'

const CREATE_BUSINESS = 'CREATE_BUSINESS'
const CREATE_BUSINESS_ERROR = 'CREATE_BUSINESS_ERROR'

const UPDATE_BUSINESS = 'UPDATE_BUSINESS'
const UPDATE_BUSINESS_ERROR = 'UPDATE_BUSINESS_ERROR'

const DELETE_BUSINESS = 'DELETE_BUSINESS'
const DELETE_BUSINESS_ERROR = 'DELETE_BUSINESS_ERROR'

const GETTOPBUSINESS = 'GETTOPBUSINESS'
const GETTOPBUSINESS_ERROR = 'GETTOPBUSINESS_ERROR'

const CREATEBUSINESSREVIEW = 'CREATEBUSINESSREVIEW'
const CREATEBUSINESSREVIEW_ERROR = 'CREATEBUSINESSREVIEW_ERROR'

//Reducer

export default function businessReducer(state = initialData, action) {
	switch (action.type) {
		case LOADING:
			return { ...state, status: 'pending' }

		case GET_ALL_BUSINESSES:
			return { ...state, status: 'success', businessArr: action.payload }

		case GET_ALL_BUSINESSES_ERROR:
			return { ...state, status: 'error', error: action.error }

		case GET_BUSINESS:
			return { ...state, status: 'success', businessArr: action.payload }

		case GET_BUSINESS_ERROR:
			return { ...state, status: 'error', error: action.error }

		case CREATE_BUSINESS:
			return { ...state, status: 'success', businessArr: action.payload }

		case CREATE_BUSINESS_ERROR:
			return { ...state, status: 'error', error: action.error }

		case UPDATE_BUSINESS:
			return { ...state, status: 'success', businessArr: action.payload }

		case UPDATE_BUSINESS_ERROR:
			return { ...state, status: 'error', error: action.error }

		case DELETE_BUSINESS:
			return { ...state, status: 'success', businessArr: action.payload }

		case DELETE_BUSINESS_ERROR:
			return { ...state, status: 'error', error: action.error }

		case GETTOPBUSINESS:
			return { ...state, status: 'success', businessArr: action.payload }

		case GETTOPBUSINESS_ERROR:
			return { ...state, status: 'error', error: action.error }

		case CREATEBUSINESSREVIEW:
			return { ...state, status: 'success', businessArr: action.payload }

		case CREATEBUSINESSREVIEW_ERROR:
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
	const res = await axios.get(`${backend}/businesses`)
	dispatch({
		type: GET_ALL_BUSINESSES,
		payload: res.data.businesses,
	})
}

export const getAllBusinessesError = error => ({
	type: GET_ALL_BUSINESSES_ERROR,
	error,
})

export const getBusiness = id => async (dispatch, getState) => {
	const res = await axios.get(`${backend}/businesses/${id}`)

	dispatch({
		type: GET_BUSINESS,
		payload: res.data.businesses,
	})
}

export const getBusinessError = error => ({
	type: GET_BUSINESS_ERROR,
	error,
})

export const createBusiness = () => async (dispatch, getState) => {
	const res = await axios.post(`${backend}/businesses/create`)

	dispatch({
		type: CREATE_BUSINESS,
		payload: res.data.businesses,
	})
}

export const createBusinessError = error => ({
	type: CREATE_BUSINESS_ERROR,
	error,
})

export const updateBusiness = id => async (dispatch, getState) => {
	const res = await axios.put(`${backend}/businesses/edit/${id}`)

	dispatch({
		type: UPDATE_BUSINESS,
		payload: res.data.businesses,
	})
}

export const updateBusinessError = error => ({
	type: UPDATE_BUSINESS_ERROR,
	error,
})

export const deleteBusiness = id => async (dispatch, getState) => {
	const res = await axios.delete(`${backend}/businesses/delete/${id}`)

	dispatch({
		type: DELETE_BUSINESS,
		payload: res.data.businesses,
	})
}

export const deleteBusinessError = error => ({
	type: DELETE_BUSINESS_ERROR,
	error,
})
