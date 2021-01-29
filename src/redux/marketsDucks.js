import axios from 'axios'

import { baseURLMarkets } from '../services/apiServices'

//Constants

const initialData = {
	marketsArr: [],
	status: '',
	error: undefined,
}

//Types

const LOADING = 'LOADING'

const GET_ALL_MARKETS = 'GET_ALL_MARKETS'
const GET_ALL_MARKETS_ERROR = 'GET_ALL_MARKETS_ERROR'

const GET_MARKET = 'GET_MARKET'
const GET_MARKET_ERROR = 'GET_MARKET_ERROR'

const CREATE_MARKET = 'CREATE_MARKET'
const CREATE_MARKET_ERROR = 'CREATE_MARKET_ERROR'

const UPDATE_MARKET = 'UPDATE_MARKET'
const UPDATE_MARKET_ERROR = 'UPDATE_MARKET_ERROR'

const DELETE_MARKET = 'DELETE_MARKET'
const DELETE_MARKET_ERROR = 'DELETE_MARKET_ERROR'

const GETTOPMARKET = 'GETTOPMARKET'
const GETTOPMARKET_ERROR = 'GETTOPMARKET_ERROR'

const CREATEREVIEWMARKET = 'CREATEREVIEWMARKET'
const CREATEREVIEWMARKET_ERROR = 'CREATEREVIEWMARKET_ERROR'

//Reducers

export default function recipeReducer(state = initialData, action) {
	switch (action.type) {
		case LOADING:
			return { ...state, status: 'pending' }

		case GET_ALL_MARKETS:
			return { ...state, status: 'success', recipeArr: action.payload }

		case GET_ALL_MARKETS_ERROR:
			return { ...state, status: 'error', error: action.error }

		case GET_MARKET:
			return { ...state, recipeArr: action.payload }

		case GET_MARKET_ERROR:
			return { ...state, status: 'error', error: action.error }

		case CREATE_MARKET:
			return { ...state, status: 'success', recipeArr: action.payload }

		case CREATE_MARKET_ERROR:
			return { ...state, status: 'error', error: action.error }

		case UPDATE_MARKET:
			return { ...state, status: 'error', recipeArr: action.payload }

		case UPDATE_MARKET_ERROR:
			return { ...state, status: 'error', error: action.error }

		case DELETE_MARKET:
			return { ...state, status: 'error', recipeArr: action.payload }

		case DELETE_MARKET_ERROR:
			return { ...state, status: 'error', error: action.error }

		case GETTOPMARKET:
			return { ...state, status: 'success', recipeArr: action.payload }

		case GETTOPMARKET_ERROR:
			return { ...state, status: 'error', error: action.error }

		case CREATEREVIEWMARKET:
			return { ...state, status: 'success', recipeArr: action.payload }

		case CREATEREVIEWMARKET_ERROR:
			return { ...state, status: 'error', error: action.error }

		default:
			return state
	}
}

//Actions

export const loadingMarkets = () => ({
	type: LOADING,
})

export const getAllMarkets = () => async (dispatch, getState) => {
	const res = await axios.get(`${baseURLMarkets}`)
	dispatch({
		type: GET_ALL_MARKETS,
		payload: res.data.markets,
	})
}

export const getAllMarketsError = error => ({
	type: GET_ALL_MARKETS_ERROR,
	error,
})

export const getMarket = id => async (dispatch, getState) => {
	const res = await axios.get(`${baseURLMarkets}/${id}`)

	dispatch({
		type: GET_MARKET,
		payload: res.data.markets,
	})
}

export const getMarketError = error => ({
	type: GET_MARKET_ERROR,
	error,
})

export const createMarket = () => async (dispatch, getState) => {
	const res = await axios.post(`${baseURLMarkets}/create`)

	dispatch({
		type: CREATE_MARKET,
		payload: res.data.markets,
	})
}

export const createMArketError = error => ({
	type: CREATE_MARKET_ERROR,
	error,
})

export const updateMarket = id => async (dispatch, getState) => {
	const res = await axios.put(`${baseURLMarkets}/edit/${id}`)

	dispatch({
		type: UPDATE_MARKET,
		payload: res.data.markets,
	})
}

export const updateMarketError = error => ({
	type: UPDATE_MARKET_ERROR,
	error,
})

export const deleteMarket = id => async (dispatch, getState) => {
	const res = await axios.delete(`${baseURLMarkets}/delete/${id}`)

	dispatch({
		type: DELETE_MARKET,
		payload: res.data.markets,
	})
}

export const deleteMarketError = error => ({
	type: DELETE_MARKET_ERROR,
	error,
})
