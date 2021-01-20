import axios from 'axios'

import { baseURLRecipes } from '../services/apiServices'

//Constants

const initialData = {
	recipeArr: [],
	status: '',
	error: undefined,
}

//Types

const LOADING = 'LOADING'

const GET_ALL_RECIPES = 'GET_ALL_RECIPES'
const GET_ALL_RECIPES_ERROR = 'GET_ALL_RECIPES_ERROR'

const GET_RECIPE = 'GET_RECIPE'
const GET_RECIPE_ERROR = 'GET_RECIPE_ERROR'

const CREATE_RECIPE = 'CREATE_RECIPE'
const CREATE_RECIPE_ERROR = 'CREATE_RECIPE_ERROR'

const UPDATE_RECIPE = 'UPDATE_RECIPE'
const UPDATE_RECIPE_ERROR = 'UPDATE_RECIPE_ERROR'

const DELETE_RECIPE = 'DELETE_RECIPE'
const DELETE_RECIPE_ERROR = 'DELETE_RECIPE_ERROR'

//Reducers

export default function recipeReducer(state = initialData, action) {
	switch (action.type) {
		case LOADING:
			return { ...state, status: 'pending' }

		case GET_ALL_RECIPES:
			return { ...state, status: 'success', recipeArr: action.payload }

		case GET_ALL_RECIPES_ERROR:
			return { ...state, status: 'error', error: action.error }

		case GET_RECIPE:
			return { ...state, recipeArr: action.payload }

		case GET_RECIPE_ERROR:
			return { ...state, status: 'error', error: action.error }

		case CREATE_RECIPE:
			return { ...state, status: 'success', recipeArr: action.payload }

		case CREATE_RECIPE_ERROR:
			return { ...state, status: 'error', error: action.error }

		case UPDATE_RECIPE:
			return { ...state, status: 'error', recipeArr: action.payload }

		case UPDATE_RECIPE_ERROR:
			return { ...state, status: 'error', error: action.error }

		case DELETE_RECIPE:
			return { ...state, status: 'error', recipeArr: action.payload }

		case DELETE_RECIPE_ERROR:
			return { ...state, status: 'error', error: action.error }

		default:
			return state
	}
}

//Actions

export const loadingRecipes = () => ({
	type: LOADING,
})

export const getAllRecipes = () => async (dispatch, getState) => {
	try {
		const res = await axios.get(`${baseURLRecipes}`)
		dispatch({
			type: GET_ALL_RECIPES,
			payload: res.data.recipes,
		})
	} catch (error) {
		console.log(error)
	}
}

export const getAllRecipesError = (error) => ({
	type: GET_ALL_RECIPES_ERROR,
	error,
})

export const getRecipe = id => async (dispatch, getState) => {
	try {
		const res = await axios.get(`${baseURLRecipes}/${id}`)

		dispatch({
			type: GET_RECIPE,
			payload: res.data.recipes,
		})
	} catch (error) {
		console.log(error)
	}
}

export const getRecipeError = (error) => ({
	type: GET_RECIPE_ERROR,
	error,
})

export const createRecipe = () => async (dispatch, getState) => {
	try {
		const res = await axios.post(`${baseURLRecipes}/create`)

		dispatch({
			type: CREATE_RECIPE,
			payload: res.data.recipes,
		})
	} catch (error) {
		console.log(error)
	}
}

export const createRecipeError = (error) => ({
	type: CREATE_RECIPE_ERROR,
	error,
})

