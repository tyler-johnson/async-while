var NativePromise = Promise;

var generate =
module.exports = function(Promise) {
	if (Promise == null) Promise = NativePromise;

	return function(condition, action, ctx) {
		return function(data) {
			try {
				if (ctx == null) ctx = this;
				if (!condition.call(ctx, data)) return Promise.resolve(data);
				return Promise.resolve(action.call(ctx, data)).then(whilst);
			} catch(e) {
				return Promise.reject(e);
			}
		}
	}
}

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
