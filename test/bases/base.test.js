const Drawer = require("../utils");
const base = require("../../src/bases/base");

describe("base", () => {
	const countTrend = (bias = 0, draws = 100) =>
		new Drawer(() => Math.round(base(bias), draws));

	it("should clamp bias to -1,1", () => {
		let lows = countTrend(-1000);
		let highs = countTrend(1000);
		//without clamp it would return only one value in time
		expect(lows.count == 2).toBe(true);
		expect(highs.count == 2).toBe(true);
	});

	it("should return an error if bias is not a number", () => {
		expect(() => base("")).toThrow(/Bias/);
	});

	it("should return mostly LOW values when BIAS is negative", () => {
		$ = countTrend(-1);
		expect($.keyRatio(0) > $.keyRatio(1)).toBe(true);
	});

	it("should return mostly HIGH values when BIAS is positive", () => {
		$ = countTrend(1);
		expect($.keyRatio(0) < $.keyRatio(1)).toBe(true);
	});

	it("should return an aprox. equal number of draws on each side when BIAS is 0", () => {
		$ = countTrend(0);
		expect($.keyRatio(0) > 1 / 3).toBe(true);
		expect($.keyRatio(1) > 1 / 3).toBe(true);
		//no side should have less than 1 third of the number of draws
	});

	it("should be able to generate 2 separate values, in time, when rounding the result, regardles of the BIAS", () => {
		let lows = countTrend(-1).count;
		let mids = countTrend(0).count;
		let highs = countTrend(1).count;

		expect(lows == 2 && mids == 2 && highs == 2).toBe(true);
	});
});
