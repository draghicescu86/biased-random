const Drawer = require("./utils");
const Range = require("../src/Range");

describe("float", () => {
	it("should return a float", () => {
		const float = Range.float(1, 2);

		expect(Number.isInteger(float)).toBe(false);
		expect(typeof float === "number").toBe(true);
	});

	it("should apply defaults", () => {
		const $ = new Drawer(() => Math.floor(Range.float()));

		expect($.hasKeys([0, 1]));
	});
});

describe("int", () => {
	it("should return an integer", () => {
		const int = Range.int(1, 2);

		expect(Number.isInteger(int)).toBe(true);
	});

	it("should apply defaults", () => {
		const $ = new Drawer(() => Range.int());

		expect($.hasKeys([0, 1]));
	});
});

describe("from", () => {
	it("should return a Range instance", () => {
		const range = Range.from();

		expect(range instanceof Range).toBe(true);
	});

	it("should apply defaults", () => {
		const range = Range.from();

		expect(range.min === 0).toBe(true);
		expect(range.max === 1).toBe(true);
		expect(range.bias === 0).toBe(true);
		expect(range.asInt === false).toBe(true);
	});
});

describe("Constructor - ", () => {
	it("should apply defaults", () => {
		const range = new Range();

		expect(range.min === 0).toBe(true);
		expect(range.max === 1).toBe(true);
		expect(range.bias === 0).toBe(true);
		expect(range.asInt === false).toBe(true);
	});

	it("should apply custom params", () => {
		const range = new Range(1, 2, -1, true);

		expect(range.min === 1).toBe(true);
		expect(range.max === 2).toBe(true);
		expect(range.bias === -1).toBe(true);
		expect(range.asInt === true).toBe(true);
	});
});

describe("Instance", () => {
	it("should generate on next() call", () => {
		const range = new Range();

		expect(typeof range.next() === "number").toBe(true);
	});

	it("toObject() should return the args pased into the constructor", () => {
		const range = new Range();

		expect(range.toObject()).toEqual({ min: 0, max: 1, bias: 0, asInt: false });
	});
});
