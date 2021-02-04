import backend from '../services/apiServices'
import { logout } from './authDucks'

//Types

const GET_ALL_RECIPES_REQUEST = 'GET_ALL_RECIPES_REQUEST'
const GET_ALL_RECIPES = 'GET_ALL_RECIPES'
const GET_ALL_RECIPES_ERROR = 'GET_ALL_RECIPES_ERROR'

const GET_RECIPE_REQUEST = 'GET_RECIPE_REQUEST'
const GET_RECIPE = 'GET_RECIPE'
const GET_RECIPE_ERROR = 'GET_RECIPE_ERROR'

const CREATE_RECIPE_REQUEST = 'CREATE_RECIPE_REQUEST'
const CREATE_RECIPE = 'CREATE_RECIPE'
const CREATE_RECIPE_ERROR = 'CREATE_RECIPE_ERROR'

const UPDATE_RECIPE_REQUEST = 'UPDATE_RECIPE_REQUEST'
const UPDATE_RECIPE = 'UPDATE_RECIPE'
const UPDATE_RECIPE_ERROR = 'UPDATE_RECIPE_ERROR'

const DELETE_RECIPE_REQUEST = 'DELETE_RECIPE_REQUEST'
const DELETE_RECIPE = 'DELETE_RECIPE'
const DELETE_RECIPE_ERROR = 'DELETE_RECIPE_ERROR'

const GET_TOP_RECIPES_REQUEST = 'GET_TOP_RECIPES_REQUEST'
const GET_TOP_RECIPES = 'GET_TOP_RECIPES'
const GET_TOP_RECIPES_ERROR = 'GET_TOP_RECIPES_ERROR'

const CREATE_RECIPE_REVIEW_REQUEST = 'CREATE_RECIPE_REVIEW_REQUEST'
const CREATE_RECIPE_REVIEW = 'CREATE_RECIPE_REVIEW'
const CREATE_RECIPE_REVIEW_ERROR = 'CREATE_RECIPE_REVIEW_ERROR'

//Reducer

export const recipesListReducer = (state = { recipes: [] }, action) => {
	switch (action.type) {
		case GET_ALL_RECIPES_REQUEST:
			return { loading: true, recipes: [] }
		case GET_ALL_RECIPES:
			return {
				loading: false,
				recipes: action.payload.recipes,
				pages: action.payload.pages,
				page: action.payload.page,
			}
		case GET_ALL_RECIPES_ERROR:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const recipesDetailsReducer = (state = { recipe: { reviews: [] } }, action) => {
	switch (action.type) {
		case GET_RECIPE_REQUEST:
			return { ...state, loading: true }
		case GET_RECIPE:
			return { loading: false, recipe: action.payload }
		case GET_RECIPE_ERROR:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const recipeCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case CREATE_RECIPE_REQUEST:
			return { loading: true }
		case CREATE_RECIPE:
			return { loading: false, success: true, recipe: action.payload }
		case CREATE_RECIPE_ERROR:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const recipeUpdateReducer = (state = { recipe: {} }, action) => {
	switch (action.type) {
		case UPDATE_RECIPE_REQUEST:
			return { loading: true }
		case UPDATE_RECIPE:
			return { loading: true, success: true, recipe: action.payload }
		case UPDATE_RECIPE_ERROR:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const recipeDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_RECIPE_REQUEST:
			return { loading: true }
		case DELETE_RECIPE:
			return { loading: false, success: true }
		case DELETE_RECIPE_ERROR:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const recipeTopReviewReducer = (state = { recipes: [] }, action) => {
	switch (action.type) {
		case GET_TOP_RECIPES_REQUEST:
			return { loading: true, recipes: [] }
		case GET_TOP_RECIPES:
			return { loading: false, recipes: action.payload }
		case GET_TOP_RECIPES_ERROR:
			return { loading: false, error: action.payload }

		default:
			return state
	}
}

export const recipeReviewCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case CREATE_RECIPE_REVIEW_REQUEST:
			return { loading: true }
		case CREATE_RECIPE_REVIEW:
			return { loading: false, success: true }
		case CREATE_RECIPE_REVIEW_ERROR:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
//Actions

export const listRecipes = (keyword = '', pageNumber = '') => async dispatch => {
	try {
		dispatch({ type: GET_ALL_RECIPES_REQUEST })

		const { data } = await backend.get(
			`/api/recipes?keyword=${keyword}&pageNumber=${pageNumber}`
		)

		dispatch({
			type: GET_ALL_RECIPES,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: GET_ALL_RECIPES_ERROR,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const listRecipesDetails = id => async dispatch => {
	try {
		dispatch({
			type: GET_ALL_RECIPES,
		})

		const { data } = await backend.get(`/api/recipes/${id}`)

		dispatch({
			type: GET_RECIPE,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: GET_ALL_RECIPES_ERROR,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const createRecipe = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: CREATE_RECIPE_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await backend.post(`/api/recipes`, {}, config)

		dispatch({
			type: CREATE_RECIPE,
			payload: data,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'You cannot PASS!!') {
			dispatch(logout())
		}
		dispatch({
			type: CREATE_RECIPE_ERROR,
			payload: message,
		})
	}
}

export const updateRecipe = recipe => async (dispatch, getState) => {
	try {
		dispatch({
			type: UPDATE_RECIPE_REQUEST,
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

		const { data } = await backend.put(`/api/recipes/${recipe._id}`, recipe, config)

		dispatch({
			type: UPDATE_RECIPE,
			payload: data,
		})

		dispatch({
			type: GET_RECIPE,
			payload: data,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'You cannot PASS!!') {
			dispatch(logout())
		}
		dispatch({
			type: UPDATE_RECIPE_ERROR,
			payload: message,
		})
	}
}

export const deleteRecipe = id => async (dispatch, getState) => {
	try {
		dispatch({
			type: DELETE_RECIPE_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		await backend.delete(`/api/recipes/${id}`, config)

		dispatch({
			type: DELETE_RECIPE,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'You cannot PASS!!') {
			dispatch(logout())
		}
		dispatch({
			type: DELETE_RECIPE_ERROR,
			payload: message,
		})
	}
}

export const createRecipeReview = (recipeId, review) => async (dispatch, getState) => {
	try {
		dispatch({
			type: CREATE_RECIPE_REQUEST,
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

		await backend.post(`/api/recipes/${recipeId}/reviews`, review, config)

		dispatch({
			type: CREATE_RECIPE,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'You cannot PASS!!') {
			dispatch(logout())
		}
		dispatch({
			type: CREATE_RECIPE_ERROR,
			payload: message,
		})
	}
}

export const listTopRecipes = () => async dispatch => {
	try {
		dispatch({
			type: GET_TOP_RECIPES_REQUEST,
		})

		const { data } = await backend.get('/api/recipes/top')

		dispatch({
			type: GET_TOP_RECIPES,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: GET_TOP_RECIPES_ERROR,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
