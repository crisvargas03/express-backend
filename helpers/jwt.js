const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {
	return new Promise((reolve, reject) => {
		const payload = { uid, name };

		jwt.sign(
			payload,
			process.env.SECRET_TOKEN_SEED,
			{
				expiresIn: '2h',
			},
			(err, token) => {
				if (err) {
					console.log(err);
					reject('Token can not be generate...');
				}
				reolve(token);
			}
		);
	});
};

module.exports = {
	generateJWT,
};
