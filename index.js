var NativePromise;

if (typeof Promise !== "undefined") {
	NativePromise = Promise;
}

function generate(Promise) {
	if (Promise == null) Promise = NativePromise;

	return function(condition, action, ctx) {
		var whilst = function(data) {
			try {
				if (ctx == null) ctx = this;
				if (!condition.call(ctx, data)) return Promise.resolve(data);
				return Promise.resolve(action.call(ctx, data)).then(whilst);
			} catch(e) {
				return Promise.reject(e);
			}
		}

		return whilst;
	}
}

module.exports = generate();
module.exports.generate = generate;

module.exports.register = function(Promise) {
	var asyncWhile = generate(Promise);

	Promise.while = function() {
		return asyncWhile.apply(this, arguments)();
	}

	Promise.prototype.while = function() {
		return this.then(asyncWhile.apply(this, arguments));
	}

	return asyncWhile;
}
