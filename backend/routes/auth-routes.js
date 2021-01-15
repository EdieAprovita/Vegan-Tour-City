const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../models/User')

const bcrypt = require('bcrypt')
const bcryptSalt = 10

router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, failureDetails) => {
		if (err) {
			console.log(failureDetails)
			res.status(500).json({ message: `${err}` })
			return
		}

		if (!user) {
			res.status(401).json(failureDetails)
			return
		}
		req.login(user, err => {
			if (err) {
				res.status(500).json({ message: `${err}` })
				return
			}
			res.status(200).json(user)
		})
	})(req, res, next)
})

router.post('/signup', (req, res, next) => {
	const { email, password } = req.body
	if (email === '' || password === '') {
		res.status(401).json({ message: 'Indicate email and password' })
		return
	}

	User.findOne({ email }, 'email', (err, user) => {
		if (user !== null) {
			res.status(401).json({ message: 'The email already exists' })
			return
		} else {
			res.status(400).json({ message: `${err}` })
		}

		const salt = bcrypt.genSaltSync(bcryptSalt)
		const hashPass = bcrypt.hashSync(password, salt)

		const newUser = new User({
			email,
			password: hashPass,
		})

		newUser
			.save()
			.then(() => {
				res.status(200).json({ message: 'User created' })
			})
			.catch(err => {
				res.status(500).json({ message: `${err}` })
			})
	})
})

router.get('/logout', (req, res) => {
	req.logout()
	res.status(200).json({ message: 'loggedout' })
})

router.get('/currentuser', (req, res) => {
	res.status(200).json({ user: req.user })
})

router.put('/photo', async (req, res) => {
	const { photo } = req.body
	await User.findByIdAndUpdate(req.user.id, { photo })
	res.status(200).json({ message: 'Downloaded Photo!!' })
})

module.exports = router
