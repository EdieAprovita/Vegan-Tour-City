import axios from 'axios'

let baseURL

process.env.NODE_ENV === 'production'
	? (baseURL = process.env.production)
	: (baseURL = process.env.developer)

const recipeService = axios.create({
	baseURL,
	withCredentials: true,
})

export const getAllRecipes = () => recipeService.get('/recipes')

export const getRecipe = id => recipeService.get(`/recipes/${id}`)

export const createRecipe = recipe => recipeService.post('/recipes', recipe)

export const updateRecipe = (id, recipe) => recipeService.put(`/recipes/${id}`, recipe)

export const deleteRecipe = id => recipeService.delete(`/recipes/${id}`)
