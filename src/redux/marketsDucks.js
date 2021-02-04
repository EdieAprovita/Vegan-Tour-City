import backend from '../services/apiServices'
import { logout } from './authDucks'

//Types

const GET_ALL_MARKETS_REQUEST = 'GET_ALL_MARKETS_REQUEST'
const GET_ALL_MARKETS = 'GET_ALL_MARKETS'
const GET_ALL_MARKETS_ERROR = 'GET_ALL_MARKETS_ERROR'

const GET_MARKET_REQUEST = 'GET_MARKET_REQUEST'
const GET_MARKET = 'GET_MARKET'
const GET_MARKET_ERROR = 'GET_MARKET_ERROR'

const CREATE_MARKET_REQUEST = 'CREATE_MARKET_REQUEST'
const CREATE_MARKET = 'CREATE_MARKET'
const CREATE_MARKET_ERROR = 'CREATE_MARKET_ERROR'

const UPDATE_MARKET_REQUEST = 'UPDATE_MARKET_REQUEST'
const UPDATE_MARKET = 'UPDATE_MARKET'
const UPDATE_MARKET_ERROR = 'UPDATE_MARKET_ERROR'

const DELETE_MARKET_REQUEST = 'DELETE_MARKET_REQUEST'
const DELETE_MARKET = 'DELETE_MARKET'
const DELETE_MARKET_ERROR = 'DELETE_MARKET_ERROR'

const GET_TOP_MARKET_REQUEST = 'GET_TOP_MARKET_REQUEST'
const GET_TOP_MARKET = 'GET_TOP_MARKET'
const GET_TOP_MARKET_ERROR = 'GET_TOP_MARKET_ERROR'

const CREATE_REVIEW_MARKET_REQUEST = 'CREATE_REVIEW_MARKET_REQUEST'
const CREATE_REVIEW_MARKET = 'CREATE_REVIEW_MARKET'
const CREATE_REVIEW_MARKET_ERROR = 'CREATEREVIEWMARKET_ERROR'

//Reducer

export const marketsListReducer = (state = { markets: [] }, action) => {
	switch (action.type) {
		case GET_ALL_MARKETS_REQUEST:
			return { loading: true, markets: [] }
		case GET_ALL_MARKETS:
			return {
				loading: false,
				markets: action.payload.markets,
				pages: action.payload.pages,
				page: action.payload.page,
			}
		case GET_ALL_MARKETS_ERROR:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const marketsDetailsReducer = (state = { market: { reviews: [] } }, action) => {
	switch (action.type) {
		case GET_MARKET_REQUEST:
			return { ...state, loading: true }
		case GET_MARKET:
			return { loading: false, market: action.payload }
		case GET_MARKET_ERROR:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const marketCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case CREATE_MARKET_REQUEST:
			return { loading: true }
		case CREATE_MARKET:
			return { loading: false, success: true, market: action.payload }
		case CREATE_MARKET_ERROR:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const marketUpdateReducer = (state = { market: {} }, action) => {
	switch (action.type) {
		case UPDATE_MARKET_REQUEST:
			return { loading: true }
		case UPDATE_MARKET:
			return { loading: true, success: true, market: action.payload }
		case UPDATE_MARKET_ERROR:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const marketDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_MARKET_REQUEST:
			return { loading: true }
		case DELETE_MARKET:
			return { loading: false, success: true }
		case DELETE_MARKET_ERROR:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const marketTopReviewReducer = (state = { markets: [] }, action) => {
	switch (action.type) {
		case GET_TOP_MARKET_REQUEST:
			return { loading: true, markets: [] }
		case GET_TOP_MARKET:
			return { loading: false, markets: action.payload }
		case GET_TOP_MARKET_ERROR:
			return { loading: false, error: action.payload }

		default:
			return state
	}
}

export const marketReviewCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case CREATE_REVIEW_MARKET_REQUEST:
			return { loading: true }
		case CREATE_REVIEW_MARKET:
			return { loading: false, success: true }
		case CREATE_REVIEW_MARKET_ERROR:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
//Actions

export const listmarkets = (keyword = '', pageNumber = '') => async dispatch => {
	try {
		dispatch({ type: GET_ALL_MARKETS_REQUEST })

		const { data } = await backend.get(
			`/api/markets?keyword=${keyword}&pageNumber=${pageNumber}`
		)

		dispatch({
			type: GET_ALL_MARKETS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: GET_ALL_MARKETS_ERROR,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const listmarketsDetails = id => async dispatch => {
	try {
		dispatch({
			type: GET_ALL_MARKETS,
		})

		const { data } = await backend.get(`/api/markets/${id}`)

		dispatch({
			type: GET_MARKET,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: GET_ALL_MARKETS_ERROR,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const createmarket = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: CREATE_MARKET_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await backend.post(`/api/markets`, {}, config)

		dispatch({
			type: CREATE_MARKET,
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
			type: CREATE_MARKET_ERROR,
			payload: message,
		})
	}
}

export const updatemarket = market => async (dispatch, getState) => {
	try {
		dispatch({
			type: UPDATE_MARKET_REQUEST,
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

		const { data } = await backend.put(`/api/markets/${market._id}`, market, config)

		dispatch({
			type: UPDATE_MARKET,
			payload: data,
		})

		dispatch({
			type: GET_MARKET,
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
			type: UPDATE_MARKET_ERROR,
			payload: message,
		})
	}
}

export const deletemarket = id => async (dispatch, getState) => {
	try {
		dispatch({
			type: DELETE_MARKET_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		await backend.delete(`/api/markets/${id}`, config)

		dispatch({
			type: DELETE_MARKET,
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
			type: DELETE_MARKET_ERROR,
			payload: message,
		})
	}
}

export const createmarketReview = (marketId, review) => async (dispatch, getState) => {
	try {
		dispatch({
			type: CREATE_MARKET_REQUEST,
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

		await backend.post(`/api/markets/${marketId}/reviews`, review, config)

		dispatch({
			type: CREATE_REVIEW_MARKET,
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
			type: CREATE_REVIEW_MARKET_ERROR,
			payload: message,
		})
	}
}

export const listTopmarkets = () => async dispatch => {
	try {
		dispatch({
			type: GET_TOP_MARKET_REQUEST,
		})

		const { data } = await backend.get('/api/markets/top')

		dispatch({
			type: GET_TOP_MARKET,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: GET_TOP_MARKET_ERROR,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
