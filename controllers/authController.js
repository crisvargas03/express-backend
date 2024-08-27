const { response } = require('express');
const User = require('../models/User');
const { genSaltSync, hashSync, compareSync } = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
	const { email, password } = req.body;
	try {
		const findedUser = await User.findOne({ email });
		if (findedUser) {
			return res.status(400).json({
				ok: false,
				msg: 'Email provided already used',
			});
		}

		const user = new User(req.body);
		// encrypt password
		const salt = genSaltSync();
		user.password = hashSync(password, salt);
		await user.save();

		const token = await generateJWT(user.id, user.name);
		return res.status(201).json({
			ok: true,
			uid: user.id,
			name: user.name,
			token,
		});
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			ok: false,
			msg: 'Server unavialable...',
		});
	}
};

const login = async (req, res = response) => {
	const { email, password } = req.body;

	try {
		const findedUser = await User.findOne({ email });
		if (!findedUser) {
			return res.status(400).json({
				ok: false,
				msg: 'Email or Password invalid',
			});
		}

		const validPassword = compareSync(password, findedUser.password);
		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: 'Email or Password incorrect',
			});
		}

		const token = await generateJWT(findedUser.id, findedUser.name);

		return res.status(200).json({
			ok: true,
			uid: findedUser.id,
			name: findedUser.name,
			token,
		});
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			ok: false,
			msg: 'Server unavialable...',
		});
	}
};

const renewToken = async (req, res = response) => {
	const { uid, name } = req;

	const token = await generateJWT(uid, name);

	return res.json({
		ok: true,
		uid,
		name,
		token,
	});
};

module.exports = { createUser, login, renewToken };
