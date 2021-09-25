const { build, rand } = require("../../src/bases/ration");
const Drawer = require("../utils");

describe("build", () => {
	it("should throw if rations is not an array of at least 2 items", () => {
		expect(() => build()).toThrow(/Rations/);
		expect(() => build("")).toThrow(/Rations/);
		expect(() => build([""])).toThrow(/Rations/);
	});

	it("should throw if an item in rations does not have a numeric ratio property", () => {
		const noRatio = { a: "" };
		expect(() => build([noRatio, noRatio])).toThrow(/Ratio/);
		const nanRatio = { a: "0", ratio: "s" };

		expect(() => build([nanRatio, nanRatio])).toThrow(/Ratio/);
	});

	it("should throw if the sum of all ratios is <= 0", () => {
		const rations = [{ a: 1 }, { b: -1 }];

		expect(() => build(rations)).toThrow(/sum/);
	});

	describe("KeyValuePair {a:1} ", () => {
		it("should accept key value pair item", () => {
			const rations = [{ a: 1 }, { b: 2 }];
			expect(() => build(rations)).not.toThrow();
		});

		it("should return the correct tuple", () => {
			const rations = [{ a: 1 }, { b: 2 }];
			const [cache, sum] = build(rations);

			expect(cache.length).toBe(2);
			expect(sum).toBe(3);

			const [a, b] = cache;

			expect(a).toEqual({ value: "a", s: 0, e: 1 });
			expect(b).toEqual({ value: "b", s: 1, e: 3 });
		});
	});

	describe("RatioAndCustomValue {value:{...}, ratio:1}", () => {
		it("should accept custom value and ratio item", () => {
			const obj = { value: "custom", ratio: 1 };
			const rations = [obj, obj];
			expect(() => build(rations)).not.toThrow();
		});

		it("should return the correct tuple", () => {
			const rations = [
				{ value: "a", ratio: 1 },
				{ value: "b", ratio: 2 },
			];
			const [cache, sum] = build(rations);

			expect(cache.length).toBe(2);
			expect(sum).toBe(3);

			const [a, b] = cache;

			expect(a).toEqual({ value: "a", s: 0, e: 1 });
			expect(b).toEqual({ value: "b", s: 1, e: 3 });
		});
	});

	describe("RatioObject (any object with a ratio property)", () => {
		it("should accept any object that has a ratio property", () => {
			const obj = { a: false, ratio: 1 };
			const rations = [obj, obj];
			expect(() => build(rations)).not.toThrow();
		});

		it("should return the correct tuple", () => {
			const base = { my: { custom: "object" } };
			const rations = [
				{ my: { custom: "a" }, ratio: 1 },
				{ my: { custom: "b" }, ratio: 2 },
			];
			const [cache, sum] = build(rations);

			expect(cache.length).toBe(2);
			expect(sum).toBe(3);

			const [a, b] = cache;

			expect(a).toEqual({ value: { my: { custom: "a" }, ratio: 1 }, s: 0, e: 1 });
			expect(b).toEqual({ value: { my: { custom: "b" }, ratio: 2 }, s: 1, e: 3 });
		});
	});
});

describe("rand", () => {
	const randomize = function pick(rations) {
		const [cache, sum] = build(rations);
		return rand(cache, sum);
	};

	it("should return all options in time", () => {
		const rations = [{ a: 1 }, { b: 1 }];
		const $ = new Drawer(() => randomize(rations));
		expect($.count).toBe(2);
		expect($.hasKeys("a", "b"));
	});

	it("should return more of the higher ratio values", () => {
		const rations = [{ a: 1 }, { b: 0.3 }, { c: 0.4 }];
		const $ = new Drawer(() => randomize(rations));
		const [a, b, c] = [$.keyRatio("a"), $.keyRatio("b"), $.keyRatio("c")];

		expect(a > b && a > c);
	});

	it("should return aprox. equal values when ratios are equals", () => {
		const rations = [{ a: 1 }, { b: 1 }, { c: 0.1 }];
		const $ = new Drawer(() => randomize(rations));
		const [min, max] = [0.2, 0.7];
		const [a, b] = [$.keyRatio("a"), $.keyRatio("b")];

		expect(a > min && a < max).toBe(true);
		expect(b > min && b < max).toBe(true);
	});
});
