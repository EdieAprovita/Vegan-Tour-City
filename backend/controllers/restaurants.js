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
		const { name, typePlace, address, imgUrl, budget, numReviews } = req.body

		const restaurant = await Restaurant.create({
			name,
			typePlace,
			address,
			imgUrl,
			budget,
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
		const { name, typePlace, address, imgUrl, budget } = req.body
		const restaurant = await Restaurant.findByIdAndUpdate(id, {
			name,
			typePlace,
			address,
			imgUrl,
			budget,
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
exports.createRestaurantReview = async (req, res) => {
	try {
		const { rating, comment } = req.body

		const restaurant = await Restaurant.findById(req.params.id)

		if (restaurant) {
			const alreadyReviewed = restaurant.reviews.find(
				r => r.user.toString() === req.user._id.toString()
			)

			if (alreadyReviewed) {
				res.status(400)
				throw new Error('Restaurant already Reviewed')
			}

			const review = {
				username: req.user.username,
				rating: Number(rating),
				comment,
				user: req.user._id,
			}

			restaurant.reviews.push(review)
			restaurant.numReviews = restaurant.reviews.length
			restaurant.rating =
				restaurant.reviews.reduce((acc, item) => item.rating + acc, 0) /
				restaurant.reviews.length

			await restaurant.save()
			res.status(201).json({ message: 'Review Added' })
		}
	} catch (error) {
		res.status(400).json({ message: `${error}` })
	}
}

exports.getTopRestaurants = async (req, res) => {
	try {
		const restaurants = await Restaurant.find({}).sort({ rating: -1 }).limit(3)
		res.status(200).json(restaurants)
	} catch (error) {
		res.status(400).json({ message: `${error}` })
	}
}
