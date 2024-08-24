const { response, request } = require('express');
const Event = require('../models/Event');

const getEvents = async (req, res = response) => {
	try {
		const events = await Event.find().populate('user', 'name');

		return res.status(200).json({
			ok: true,
			events,
		});
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			ok: false,
			msg: 'Server unavialable...',
		});
	}
};

const createEvent = async (req, res = response) => {
	const newEvent = Event(req.body);
	newEvent.user = req.uid;

	try {
		const savedEvent = await newEvent.save();

		return res.status(201).json({
			ok: true,
			savedEvent,
		});
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			ok: false,
			msg: 'Server unavialable...',
		});
	}
};

const updateEvent = async (req = request, res = response) => {
	console.log(request);
	const eventId = req.params.id;
	try {
		const findedEvent = await Event.findById(eventId);
		if (!findedEvent) {
			return res.status(404).json({
				ok: false,
				msg: 'Not found event',
			});
		}

		if (findedEvent.user.toString() !== req.uid) {
			return res.status(401).json({
				ok: false,
				msg: 'Not can modified others user events',
			});
		}

		const eventToUpdate = {
			...req.body,
			user: req.uid,
		};

		const updatedEvent = await Event.findByIdAndUpdate(
			eventId,
			eventToUpdate,
			{ new: true }
		);

		return res.status(200).json({
			ok: true,
			updatedEvent,
		});
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			ok: false,
			msg: 'Server unavialable...',
		});
	}
};

const deleteEvent = async (req = request, res = response) => {
	const eventId = req.params.id;
	try {
		const findedEvent = await Event.findById(eventId);
		if (!findedEvent) {
			return res.status(404).json({
				ok: false,
				msg: 'Not found event',
			});
		}

		if (findedEvent.user.toString() !== req.uid) {
			return res.status(401).json({
				ok: false,
				msg: 'Not can modified others user events',
			});
		}

		await Event.deleteOne({ _id: eventId });
		return res.status(200).json({
			ok: true,
			deletedEvent: eventId,
		});
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			ok: false,
			msg: 'Server unavialable...',
		});
	}
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
