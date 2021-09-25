const { guard, rand } = require("./bases/option");

/**
 * Randomly pick one of the options based bias
 * @param {Array} options
 * @param {number} bias
 * @return {number}
 */

const _struct = new WeakMap();

module.exports = class Option {
	static bool = (bias = 0) => rand([false, true], bias);
	static sign = (bias = 0) => rand([-1, 1], bias);
	static duo = (v1 = 0, v2 = 1, bias = 0) => rand([v1, v2], bias);
	static trio = (v1 = -1, v2 = 0, v3 = 1, bias = 0) => rand([v1, v2, v3], bias);
	static pick = (options, bias = 0) => rand(options, bias);
	static from = ({ options = [], bias = 0 }) => new Option(options, bias);

	constructor(options = [0, 1], bias = 0) {
		guard(options, bias);
		_struct.set(this, { options, bias });
	}

	next() {
		const r = rand(this.options, this.bias, false);
		if (this["onNext"]) this.onNext(r);
		return r;
	}
	get options() {
		return _struct.get(this).options;
	}
	get bias() {
		return _struct.get(this).bias;
	}

	toObject() {
		return _struct.get(this);
	}

	store(useTimestamp = false) {
		//store results
	}
};
