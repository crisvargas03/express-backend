const { response, request } = require('express');
const { verify } = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => {
	const token = req.header('x-token');

	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: 'No token provided in the request',
		});
	}

	try {
		const { uid, name } = verify(token, process.env.SECRET_TOKEN_SEED);
		req.uid = uid;
		req.name = name;
	} catch (error) {
		console.log(error);
		return res.status(401).json({
			ok: false,
			msg: 'Invalid Token',
		});
	}

	next();
};

module.exports = {
	validateJWT,
};
