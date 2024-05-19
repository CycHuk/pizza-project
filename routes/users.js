const express = require('express')
const router = express.Router()
const {
	login,
	register,
	current,
	logout,
	update,
} = require('../controllers/user')
const { auth } = require('../middleware/auth')
const { body, validationResult } = require('express-validator')

router.get('/current', auth, current)
router.get('/logout', logout)

router.put('/', auth, update)

router.post(
	'/register',
	[
		body('phoneNumber')
			.matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/)
			.withMessage('Некорректный номер телефона'),

		body('password')
			.isLength({ min: 6 })
			.withMessage('Пароль должен содержать минимум 6 символов'),
	],
	register
)

router.post(
	'/login',
	[
		body('phoneNumber')
			.matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/)
			.withMessage('Некорректный номер телефона'),

		body('password')
			.isLength({ min: 6 })
			.withMessage('Пароль должен содержать минимум 6 символов'),
	],
	login
)

module.exports = router
