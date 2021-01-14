const express = require('express')
const router = express.Router()
const uploadConfig = require('../config/cloudinary')

const { getAllMarkets, getMarket, createMarket, updateMarket, deleteMarket, createMarketReview, getTopMarkets } = require('../controllers/markets')

router.post('/upload', uploadConfig.single('photo'), (req, res, next) => {
	if (!req.file) {
		next(new Error('No file uploades'))
	}
	res.status(201).json({ secure_url: req.file.secure_url })
})

//CRUD MARKETS

router.get('/markets', getAllMarkets)
router.get('/markets/:id', getMarket)
router.get('/markets/top', getTopMarkets)
router.post('/markets/:id/reviews', createMarketReview)
router.post('/markets/create', createMarket)
router.put('/markets/edit/:id', updateMarket)
router.delete('/markets/delete/:id', deleteMarket)

module.exports = router
