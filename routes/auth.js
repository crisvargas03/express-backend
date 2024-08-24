const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validators');

const router = Router();

const {
	createUser,
	login,
	renewToken,
} = require('../controllers/authController');
const { validateJWT } = require('../middlewares/validate-jwt');

router.post(
	'/new',
	[
		check('name', 'Name is Requiered').not().isEmpty(),
		check('email', 'Email is Requiered').isEmail(),
		check('password', 'Password must hava 6 chars').isLength({ min: 6 }),
		fieldValidator,
	],
	createUser
);

router.post(
	'/login',
	[
		check('email', 'Email is Requiered').isEmail(),
		check('password', 'Password must hava 6 chars').isLength({ min: 6 }),
		fieldValidator,
	],
	login
);

router.get('/renew', validateJWT, renewToken);

module.exports = router;
