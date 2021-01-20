import axios from 'axios'

import { baseURLBusiness } from '../services/apiServices'

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

		default:
			return state
	}
}

//Actions

export const getAllBusinesses = () => async (dispatch, getState) => {
	try {
		const res = await axios.get(`${baseURLBusiness}`)
		dispatch({
			type: GET_ALL_BUSINESSES,
			payload: res.data.businesses,
		})
	} catch (error) {
		console.log(error)
	}
}
