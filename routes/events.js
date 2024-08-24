const { Router } = require('express');
const {
	getEvents,
	createEvent,
	updateEvent,
	deleteEvent,
} = require('../controllers/eventsController');
const { validateJWT } = require('../middlewares/validate-jwt');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validators');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.use(validateJWT);

router.get('/', getEvents);

router.post(
	'/create',
	[
		check('title', 'Title is required').not().isEmpty(),
		check('start', 'Start Date is required').custom(isDate),
		check('end', 'Start Date is required').custom(isDate),
		fieldValidator,
	],
	createEvent
);

router.put(
	'/update/:id',
	[
		check('title', 'Title is required').not().isEmpty(),
		check('start', 'Start Date is required').custom(isDate),
		check('end', 'Start Date is required').custom(isDate),
		fieldValidator,
	],
	updateEvent
);

router.delete('/delete/:id', deleteEvent);

module.exports = router;
