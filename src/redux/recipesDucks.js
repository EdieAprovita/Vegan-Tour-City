import axios from 'axios'

import { baseURLRecipes } from '../services/apiServices'

//Constants
const initialData = {
	recipeArr: [],
}

//Types
const GET_ALL_RECIPES = 'GET_ALL_RECIPES'

//Reducers

export default function recipeReducer(state = initialData, action) {
	switch (action.type) {
		case GET_ALL_RECIPES:
			return { ...state, recipeArr: action.payload }

		default:
			return state
	}
}

//Actions
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
