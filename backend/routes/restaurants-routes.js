const express = require('express');
const router = express.Router();
const uploadConfig = require('../config/cloudinary');

const {
  getAllPlaces,
  getPlace,
  createPlace,
  updatePlace,
  deletePlace,
} = require('../controllers/restaurants');

router.post('/upload', uploadConfig.single('photo'), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploades'));
  }
  res.status(201).json({ secure_url: req.file.secure_url });
});

//CRUD PLACES

router.get('/restaurants', getAllPlaces);
router.get('/restaurants/:id', getPlace);
router.post('/restaurants/create', createPlace);
router.put('/restaurants/edit/:id', updatePlace);
router.delete('/restaurants/delete/:id', deletePlace);

module.exports = router;
