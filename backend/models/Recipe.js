const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a name'],
		},

		rating: {
			type: Number,
			required: [true, 'Please add a rating'],
		},

		comment: {
			type: String,
			required: [true, 'Please write a comment'],
		},

		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: [true, 'Please add a user'],
		},
	},
	{
		timestamps: true,
	},
)

const recipeSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, 'Write a title for the recipe'],
			unique: true,
		},

		description: {
			type: String,
			maxlength: [60, 'The description is to big'],
			required: [true, 'Write a recipe description'],
		},

		ingredients: {
			type: String,
			required: [true, 'Write the ingredients for the recipe'],
		},

		typeDish: {
			type: String,
			enum: ['breakfast', 'lunch', 'dinner', 'dessert'],
			required: [true, 'Write the type of dish please'],
		},

		imgUrl: {
			type: [String],
			required: [true, 'Add and image for the recipe'],
		},

		cookingTime: {
			type: Number,
			required: [true, 'Write the cooking time'],
		},

		difficulty: {
			type: String,
			required: [true, 'Please assign the difficulty of the recipe'],
			enum: ['amateur', 'semipro', 'chef'],
		},

		reviews: [reviewSchema],

		rating: {
			type: Number,
			required: [true, 'Please add the rating'],
			default: 0,
		},

		numReviews: {
			type: Number,
			required: [true, 'Please add the number reviews'],
			default: 0,
		},
	},
	{
		timestamps: true,
	},
)

const Recipe = mongoose.model('Recipe', recipeSchema)
module.exports = Recipe
