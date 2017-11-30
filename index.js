const { toString } = {};

/**
 * Get the type of a value.
 * Like the typeof operator, but with more useful type descriptions.
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
 * @param {*} value Value to test
 * @param {boolean} [beSpecific] Types to return more specific values for
 * @return {string} Type of `value`
 */
const betterTypeof = (value, beSpecific = false) => {
	const type = typeof value;

	if (type === 'number') {
		if (
			value === Number.POSITIVE_INFINITY ||
			value === Number.NEGATIVE_INFINITY
		) {
			return 'infinity';
		}

		if (Number.isNaN(value)) {
			return 'nan';
		}
	}

	if (!beSpecific && type === 'function') {
		return type;
	}

	return toString.call(value).slice(8, -1).toLowerCase();
};

module.exports = betterTypeof;
