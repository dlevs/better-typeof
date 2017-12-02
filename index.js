const { toString } = {};

/**
 * Get the type of a value.
 * Like the typeof operator, but with more useful type descriptions.
 *
 * @param {*} value Value to test
 * @return {string} Type of `value`
 */
const betterTypeof = (value) => {
	const type = typeof value;

	if (type !== 'object') {
		return type;
	}

	return toString.call(value).slice(8, -1).toLowerCase();
};

module.exports = betterTypeof;
