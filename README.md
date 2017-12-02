## What
`better-typeof` is a single JavaScript function that returns the type of a value. This is mainly a learning exercise. You should probably use [kind-of](https://www.npmjs.com/package/kind-of) instead.


## Why
The native JavaScript `typeof` operator is drunk and will shout `"object"` at almost any value you give it.
```javascript
typeof {}; // object
typeof /a/; // object
typeof null; // object
typeof []; // object
typeof new String('foo'); // object
```

## Installation
```bash
npm install --save better-typeof
```

## Usage
```javascript
const betterTypeof = require('better-typeof');

betterTypeof({}); // object
betterTypeof(/a/); // regexp
betterTypeof(null); // null
betterTypeof([]); // array
betterTypeof(new String('foo')); // string
```
