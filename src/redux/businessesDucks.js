import axios from 'axios'

import { baseURLBusiness } from '../services/apiServices'

//Constants

const initialData = {
	businessArr: [],
}

//Types
const GET_ALL_BUSINESSES = 'GET_ALL_BUSINESSES'
const GET_BUSINESS = 'GET_BUSINESS'
const CREATE_BUSINESS = 'CREATE_BUSINESS'
const UPDATE_BUSINESS = 'UPDATE_BUSINESS'
const DELETE_BUSINESS = 'DELETE_BUSINESS'

//Reducer

export default function businessReducer(state = initialData, action) {
	switch (action.type) {
		case GET_ALL_BUSINESSES:
			return { ...state, businessArr: action.payload }

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
