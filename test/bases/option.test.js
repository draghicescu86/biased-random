const Drawer = require("../utils");
const { rand, guard } = require("../../src/bases/option");

describe("Option:guard - ERRORS", () => {
	const def = { min: 0, max: 1, bias: 0, asInt: true };

	it("should throw an error when  options is not an array or less than 2 items", () => {
		expect(() => guard()).toThrow(/Options/);
		expect(() => guard({})).toThrow(/Options/);
		expect(() => guard([])).toThrow(/Options/);
		expect(() => guard([1])).toThrow(/Options/);
	});

	it("should throw when bias is not a number", () => {
		expect(() => guard([0, 1], "")).toThrow(/Bias/);
	});

	test("rand() should be able to disable the guard", () => {
		expect(() => rand([0, 1], 0, false)).not.toThrow();
	});
});

describe("Option:rand - general", () => {
	it("should return all options in time", () => {
		const options = ["a", "b", "c"];
		const $ = new Drawer(() => rand(options, 0));

		expect($.hasKeys(options)).toBe(true);
		expect($.count).toBe(options.length);
	});

	it("should return more of the options at the beggining if negative bias", () => {
		const options = ["a", "b", "c"];
		const bias = -1;
		const $ = new Drawer(() => rand(options, bias));

		const [a, b, c] = [$.keyRatio("a"), $.keyRatio("b"), $.keyRatio("c")];

		expect(a > b && b > c).toBe(true);
		expect($.hasKeys(options)).toBe(true);
		expect($.count).toBe(options.length);
	});

	it("should return more of the options at the end if positive bias", () => {
		const options = ["a", "b", "c"];
		const bias = 1;
		const $ = new Drawer(() => rand(options, bias));

		const [a, b, c] = [$.keyRatio("a"), $.keyRatio("b"), $.keyRatio("c")];

		expect(a < b && b < c).toBe(true);
		expect($.hasKeys(options)).toBe(true);
		expect($.count).toBe(options.length);
	});

	it("should have an aprox. number of draws when unbiased(0)", () => {
		const options = ["a", "b", "c"];
		const $ = new Drawer(() => rand(options, 0));
		const [a, b, c] = [$.keyRatio("a"), $.keyRatio("b"), $.keyRatio("c")];

		const [min, max] = [0.2, 0.7];

		expect(a > min && a < max).toBe(true);
		expect(b > min && b < max).toBe(true);
		expect(c > min && c < max).toBe(true);
	});
});
