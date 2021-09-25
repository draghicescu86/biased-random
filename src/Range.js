const { rand, guard } = require("./bases/range");

const _struct = new WeakMap();

module.exports = class Range {
	static float(min = 0, max = 1, bias = 0) {
		return rand({ min, max, bias, asInt: false });
	}

	static int(min = 0, max = 1, bias = 0) {
		return rand({ min, max, bias, asInt: true });
	}

	static from({ min = 0, max = 1, bias = 0, asInt = false } = {}) {
		return new Range(min, max, bias, asInt);
	}

	constructor(min = 0, max = 1, bias = 0, asInt = false) {
		const struct = { min, max, bias, asInt };
		guard(struct);
		_struct.set(this, struct);
	}

	get min() {
		return _struct.get(this).min;
	}

	get max() {
		return _struct.get(this).max;
	}

	get bias() {
		return _struct.get(this).bias;
	}

	get asInt() {
		return _struct.get(this).asInt;
	}

	toObject() {
		return _struct.get(this);
	}

	next() {
		return rand(_struct.get(this), false);
	}
};
