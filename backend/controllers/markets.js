const Market = require('../models/Market')

exports.getAllMarkets = async (req, res) => {
	try {
		const markets = await Market.find().populate('owner')
		res.status(200).json({ markets })
	} catch (error) {
		res.status(400).json({ message: `${error}`.red })
	}
}

exports.getMarket = async (req, res) => {
	try {
		const { id } = req.params
		const market = await Market.findById(id).populate('owner')
		res.status(200).json({ market })
	} catch (error) {
		res.status(400).json({ message: `${error}`.red })
	}
}

exports.createMarket = async (req, res) => {
	try {
		const { name, address, typeMarket, imgUrl, reviews, rating, numReviews } = req.body

		const market = await Market.create({ name, address, typeMarket, imgUrl, reviews, rating, numReviews })
		res.status(201).json({ market })
	} catch (error) {
		res.status(400).json({ message: `${error}`.red })
	}
}

exports.updateMarket = async (req, res) => {
	try {
		const { id } = req.params
		const { name, address, typeMarket, imgUrl, reviews, rating, numReviews } = req.body
		const market = await Market.findByIdAndUpdate(id, {
			name,
			address,
			typeMarket,
			imgUrl,
			reviews,
			rating,
			numReviews,
		})
		res.status(200).json({ market })
	} catch (error) {
		res.status(400).json({ message: `${error}`.red })
	}
}

exports.deleteMarket = async (req, res) => {
	try {
		const { id } = req.params
		await Market.findOneAndDelete(id)
		res.status(200).json({ message: 'Deleted market' })
	} catch (error) {
		res.status(400).json({ message: `${error}`.red })
	}
}
