const express = require('express');
const router = express.Router();
const uploadConfig = require('../config/cloudinary');

const {
  getAllRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipes');

router.post('/upload', uploadConfig.single('photo'), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploades'));
  }
  res.status(201).json({ secure_url: req.file.secure_url });
});

//CRUD RECIPES

router.get('/recipes', getAllRecipes);
router.get('/recipes/:id', getRecipe);
router.post('/recipes/create', createRecipe);
router.put('/recipes/edit/:id', updateRecipe);
router.delete('/recipes/delete/:id', deleteRecipe);

module.exports = router;
