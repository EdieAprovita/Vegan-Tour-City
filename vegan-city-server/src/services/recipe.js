import axios from 'axios'
const baseURL = 'http://localhost:5000/api/recipes'

const recipeService = axios.create({ baseURL })

export const newRecipe = async ({ title, description, ingredientes, typeDish, imgUrl, cookingTime, difficulty }) => {
	try {
		const { data: recipe } = await recipeService.post('/', {
			title,
			description,
			ingredientes,
			typeDish,
			imgUrl,
			cookingTime,
			difficulty,
		})
		return recipe
	} catch (error) {
		return { message: `${error}` }
	}
}

export const getRecipes = async () => {
	try {
		const { data: recipes } = await recipeService.get('/')
		return recipes
	} catch (error) {
		return { message: `${error}` }
	}
}

export const getRecipe = async recipeID => {
	try {
		const { data: recipe } = await recipeService.get(`/${recipeID}`)
		return recipe
	} catch (error) {
		return { message: `${error}` }
	}
}

export const editRecipe = async (recipeID, title, description, ingredientes, typeDish, imgUrl, cookingTime, difficulty) => {
	try {
		const { data: recipe } = await recipeService.put(`/${recipeID}`, {
			title,
			description,
			ingredientes,
			typeDish,
			imgUrl,
			cookingTime,
			difficulty,
		})
		return recipe
	} catch (error) {
		return { message: `${error}` }
	}
}

export const deleteRecipe = async recipeID => {
	try {
		const { data } = await recipeService.delete(`/${recipeID}`)
		return data
	} catch (error) {
		return { message: `${error}` }
	}
}
