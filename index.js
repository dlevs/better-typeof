const { toString } = {};

/**
 * Get the type of a value.
 * Like the typeof operator, but it provides more useful type descriptions.
 *
 * @example
 * typeof {}          // object
 * typeof /a/         // object
 * typeof null        // object
 * typeof []          // object
 *
 * betterTypeof({})   // object
 * betterTypeof(/a/)  // regexp
 * betterTypeof(null) // null
 * betterTypeof([])   // array
 *
 * @param {*} value
 * @param {Array<"number"|"function">} specificTypes
 * @returns {string}
 */
const betterTypeof = (value, specificTypes = []) => {
	const type = typeof value;

	if (
		type === 'number' &&
		specificTypes.includes('number') &&
		Number.isNaN(value)
	) {
		return 'nan';
	}

	if (
		(type === 'function' && specificTypes.includes('function')) ||
		type !== 'object'
	) {
		return type;
	}

	return toString.call(value)
		.slice(8, -1)
		.toLowerCase();
};

module.exports = betterTypeof;
