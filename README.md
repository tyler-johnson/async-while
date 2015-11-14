# Async While

This is a small utility for generating while loops with ES6 Promises.

## Install

Download a UMD bundle from the [releases page](). The variable `asyncWhile` will be attached to `window`.

```html
<script type="text/javascript" src="async-while.js"></script>
```

If using Browserify or Node.js, you can install via NPM.

```sh
$ npm install async-while
```

## Usage

First, load async while. By default, the global Promise object is used, but you can create a while generator with a custom Promise class, too.

```js
// simple
var asyncWhile = require("async-while");

// while with Bluebird promises
var Promise = require("bluebird");
var asyncWhile = require("async-while").generate(Promise);
```

Now, generate a while function with `asyncWhile`. You'll need two functions: a synchronous condition and an action.

```js
var myWhile = asyncWhile(function(data) {
	// synchronous conditional
	return true;
}, function(data) {
	// loop content goes here
	return doSomethingAsync(data);
});
```

This is just a method that can be called directly or used in `.then()` statements.

```js
myWhile(somedata).then(function(result) {
	console.log(result);
});

// or
someAsyncAction().then(myWhile).then(function(result) {
	console.log(result);
});
```

Here is a common use case of the while loop, processing list items in a series:

```js
function eachSeries(items, onEach, ctx) {
	var index = -1;

	return asyncWhile(function() {
		// bump index before every loop
		index++;

		// synchronously checks if there are more
		return index < items.length;
	}, function() {
		return onEach.call(ctx, items[index], index, items);
	})();
}
```
