const { rand, build } = require("./bases/ration");

const _store = new WeakMap();

module.exports = class Ration {
	static pick(rations) {
		return rand(...build(rations));
	}

	constructor(rations) {
		let [cache, sum] = build(rations);
		_store.set(this, { rations, cache, sum });
	}

	get rations() {
		return _store.get(this).rations;
	}

	next() {
		const { cache, sum } = _store.get(this);
		return rand(cache, sum);
	}
};
