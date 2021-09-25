class Drawer {
	constructor(fn, draws = 100) {
		this.map = new Map();
		this.fn = fn;
		this.draws = draws;
		this.smallest = null;
		this.largest = null;

		if (fn) this.draw();
	}

	hasKeys(keys = []) {
		for (let key of keys) {
			if (!this.map.has(key)) return false;
		}
		return true;
	}
	ratioBetween(keyA, keyB) {
		let a = this.map.get(keyA);
		let b = this.map.get(keyB);
		return Math.min(a, b) / Math.max(a, b);
	}
	keyRatio(key) {
		return this.map.get(key) / this.draws;
	}

	get count() {
		return this.map.size;
	}
	get(key) {
		return this.map.get(key);
	}

	draw(fn = this.fn, draws = this.draws) {
		this.draws = draws;
		let map = this.map;
		map.clear();

		while (draws-- > 0) {
			let r = fn();
			let prev = map.has(r) ? map.get(r) : 0;
			map.set(r, prev + 1);

			if (r <= this.smallest) this.smallest = r;
			if (r >= this.largest) this.largest = r;
		}
		return this;
	}
}

module.exports = Drawer;
