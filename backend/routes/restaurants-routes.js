const express = require('express')
const router = express.Router()
const uploadConfig = require('../config/cloudinary')

const {
	getAllPlaces,
	getPlace,
	createPlace,
	updatePlace,
	deletePlace,
	getTopRestaurants,
	createRestaurantReview,
} = require('../controllers/restaurants')

router.post('/upload', uploadConfig.single('photo'), (req, res, next) => {
	if (!req.file) {
		next(new Error('No file uploades'))
	}
	res.status(201).json({ secure_url: req.file.secure_url })
})

//CRUD RESTAURANTS

router.get('/', getAllPlaces)
router.get('/:id', getPlace)
router.get('/top', getTopRestaurants)
router.post('/:id/reviews', createRestaurantReview)
router.post('/create', createPlace)
router.put('/edit/:id', updatePlace)
router.delete('/delete/:id', deletePlace)

module.exports = router
