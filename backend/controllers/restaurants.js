const Restaurant = require('../models/Restaurant')

exports.getAllPlaces = async (req, res) => {
	try {
		const restaurant = await Restaurant.find().populate('owner')
		res.status(200).json({ restaurant })
	} catch (error) {
		res.status(400).json({ message: `${error}` })
	}
}

exports.getPlace = async (req, res) => {
	try {
		const { id } = req.params
		const restaurant = await Restaurant.findById(id).populate('owner')
		res.status(200).json({ restaurant })
	} catch (error) {
		res.status(400).json({ message: `${error}` })
	}
}

exports.createPlace = async (req, res) => {
	try {
		const { name, typePlace, address, imgUrl, reviews, rating, numReviews } = req.body

		const restaurant = await Restaurant.create({
			name,
			typePlace,
			address,
			imgUrl,
			reviews,
			rating,
			numReviews,
		})
		res.status(201).json({ restaurant })
	} catch (error) {
		res.status(400).json({ message: `${error}` })
	}
}

exports.updatePlace = async (req, res) => {
	try {
		const { id } = req.params
		const { name, typePlace, address, imgUrl, reviews, rating, numReviews } = req.body
		const restaurant = await Restaurant.findByIdAndUpdate(id, {
			name,
			typePlace,
			address,
			imgUrl,
			reviews,
			rating,
			numReviews,
		})
		res.status(200).json({ restaurant })
	} catch (error) {
		res.status(400).json({ message: `${error}` })
	}
}

exports.deletePlace = async (req, res) => {
	try {
		const { id } = req.params
		await Restaurant.findByIdAndDelete(id)
		res.status(200).json({ message: 'Deleted Restaurant' })
	} catch (error) {
		res.status(400).json({ message: `${error}` })
	}
}
