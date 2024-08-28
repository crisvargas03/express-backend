const { isValid } = require('date-fns');
const { is } = require('date-fns/locale');

const isDate = value => {
	if (!value) return false;

	var dateToValid = Date.parse(new Date(value).toISOString());
	return isValid(dateToValid);
};

module.exports = { isDate };
