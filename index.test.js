
/* eslint-disable */

const each = require('lodash/each');
const isPlainObject = require('lodash/isPlainObject');
const betterTypeof = require('.');

/* There are some environment-dependant quirks when using the
 * result of Object.prototype.toString.call() on a value:
 *
 * - function* () {}
 *   - is "generatorfunction" in environments that support it
 *   - may be "function" if being transpiled
 *
 * - async () => {}
 *   - is "asyncfunction" in environments that support it
 *   - may be "function" if being transpiled
 *
 * - document.createElement('div')
 *   - is "htmldivelement" in the browser.
 *   - is "object" in the Jest test environment
 */

class Foo {
}
class Bar {
	toString() {
		return 'Bar';
	}
}
const expectedResults = {
	'array': {
		'plain': [],
		'built with constructor': new Array()
	},
	'string': {
		'plain': 'foo',
		'built with constructor': new String('foo')
	},
	'function': {
		'anonymous functions': function () {
		},
		'named functions': function foo() {
		},
		'async functions': async function () {
		},
		'generator functions': function*() {
		},
		'arrow functions': () => {
		},
		'async arrow functions': async () => {
		},
	},
	'number': {
		'built with constructor': new Number(10),

		// All of the following ar just normal numbers
		'integers': 1,
		'negative integers': -1,
		'floats': 0.5,
		'octal': 0x10,
		'exponential': 1e10
	},
	'infinity': {
		'positive': Number.POSITIVE_INFINITY,
		'negative': Number.NEGATIVE_INFINITY
	},
	'object': {
		'plain': {},
		'built with constructor': new Object(),
		'class instances': new Foo(),
		'class instances with a custom "toString" method': new Bar()
	},
	'error': {
		'caught native errors': (() => {
			try{
				foo();
			} catch (e) {
				return e;
			}
		})(),
		'plain': new Error(),
		'type errors': new TypeError(),
		'range errors': new RangeError(),
		'reference errors': new ReferenceError(),
		'syntax errors': new SyntaxError()
	},
	'regexp': {
		'plain': /foo/,
		'built with constructor': new RegExp('foo')
	},
	'boolean': {
		'plain': true,
		'built with constructor': new Boolean()
	},
	'promise': Promise.resolve(),
	'nan': NaN,
	'undefined': undefined,
	'null': null,
	'date': new Date(),
	'math': Math,
	'json': JSON,
	'set': new Set(),
	'map': new Map(),
	'weakmap': new WeakMap(),
};



describe('betterTypeof()', () => {
	each(expectedResults, (valuesToTest, expectedType) => {
		if (isPlainObject(valuesToTest)) {
			describe(`returns "${expectedType}" for ${expectedType}s that are`, () => {
				each(valuesToTest, (valueToTest, description) => {
					test(description, () => {
						expect(betterTypeof(valueToTest)).toBe(expectedType);
					});
				});
			});
		} else {
			test(`returns "${expectedType}" for ${expectedType} values`, () => {
				expect(betterTypeof(valuesToTest, true)).toBe(expectedType);
			});
		}
	});
});
