const { isValid } = require('date-fns');
const { is } = require('date-fns/locale');

const isDate = value => {
	if (!value) return false;

	return isValid(value);
};

module.exports = { isDate };
