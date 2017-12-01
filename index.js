const { toString } = {};

/**
 * Get the type of a value.
 * Like the typeof operator, but with more useful type descriptions.
 *
 * @param {*} value Value to test
 * @param {boolean} [specific] Set to `true` for more specific results
 * @return {string} Type of `value`
 */
const betterTypeof = (value, specific = false) => {
	const type = typeof value;

	if (type === 'number' && Number.isNaN(value)) {
		return 'nan';
	}

	if (type === 'function' && !specific) {
		return type;
	}

	return toString.call(value).slice(8, -1).toLowerCase();
};

module.exports = betterTypeof;
