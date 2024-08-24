const mongoose = require('mongoose');

const dbConnetion = async () => {
	try {
		mongoose.connect(process.env.DB_CONNECTION);
		console.log('DB Connected!');
	} catch (error) {
		console.log(error);
		throw new Error('Error trying to connect to the database...');
	}
};

module.exports = {
	dbConnetion,
};
