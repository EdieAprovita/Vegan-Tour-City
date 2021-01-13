const Recipe = require('../models/Recipe')

exports.getAllRecipes = async (req, res) => {
	try {
		const recipes = await Recipe.find().populate('owner')
		res.status(200).json({ recipes })
	} catch (error) {
		res.status(400).json({ message: `${error}` })
	}
}

exports.getRecipe = async (req, res) => {
	try {
		const { id } = req.params
		const recipe = await Recipe.findById(id).populate('owner')
		res.status(200).json({ recipe })
	} catch (error) {
		res.status(400).json({ message: `${error}` })
	}
}

exports.createRecipe = async (req, res) => {
	try {
		const { title, description, ingredients, typeDish, imgUrl, cookingTime, difficulty, reviews, rating, numReviews } = req.body

		const recipe = await Recipe.create({
			title,
			description,
			ingredients,
			typeDish,
			imgUrl,
			cookingTime,
			difficulty,
			reviews,
			rating,
			numReviews,
		})

		res.status(201).json({ recipe })
	} catch (error) {
		res.status(400).json({ message: `${error}` })
	}
}

exports.updateRecipe = async (req, res) => {
	try {
		const { id } = req.params
		const { title, description, ingredients, typeDish, imgUrl, cookingTime, difficulty, reviews, rating, numReviews } = req.body
		const recipe = await Recipe.findByIdAndUpdate(id, {
			title,
			description,
			ingredients,
			typeDish,
			imgUrl,
			cookingTime,
			difficulty,
			reviews,
			rating,
			numReviews,
		})

		res.status(200).json({ recipe })
	} catch (error) {
		res.status(400).json({ message: `${error}` })
	}
}

exports.deleteRecipe = async (req, res) => {
	try {
		const { id } = req.params
		await Recipe.findByIdAndDelete(id)
		res.status(200).json({ message: 'deleted recipe' })
	} catch (error) {
		res.status(400).json({ message: `${error}` })
	}
}
