// Register babel so that it will transpile ES6 to ES5
// before our tests run.
require('babel-register')({
  "presets": ["es2015", "stage-0"]
});
require('babel-polyfill');

process.env.NODE_ENV = 'test';
