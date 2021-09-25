const Drawer = require("../utils");
const { rand, guard } = require("../../src/bases/range");

describe("Range:guard - ERRORS", () => {
	const def = { min: 0, max: 1, bias: 0, asInt: true };

	it("should throw an error when 'min' , 'max' or 'bias' are not numbers", () => {
		expect(() => guard()).toThrow();
		expect(() => guard({})).toThrow();
		expect(() => guard({ ...def, min: "" })).toThrow(/min/);
		expect(() => guard({ ...def, max: "" })).toThrow(/max/);
		expect(() => guard({ ...def, bias: "" })).toThrow(/bias/);
	});

	it("should throw when type specifier 'asInt' is not a boolean", () => {
		expect(() => guard({ ...def, asInt: "" })).toThrow(/asInt/);
	});

	it("should throw when 'min' === 'max' (no range)", () => {
		expect(() => guard({ ...def, min: 1, max: 1 })).toThrow(/equal/);
	});

	it("should be able to be turned of by rand (for caching)", () => {
		const isGuarding = false;
		expect(() => rand({}, isGuarding)).not.toThrow();
	});
});

describe("Range:rand - general", () => {
	it("should return the correct type", () => {
		const def = { min: 0, max: 2, bias: 0, asInt: false };

		const float = rand({ ...def, asInt: false });
		const int = rand({ ...def, asInt: true });

		expect(Number.isInteger(int)).toBe(true);
		expect(Number.isInteger(float)).toBe(false);
		expect(typeof float === "number").toBe(true);
	});
});

describe("Range:rand - float(part)", () => {
	const def = { min: 0, max: 2, bias: 0, asInt: false };

	it("should return a float starting at 'min' ending before 'max'", () => {
		const $ = new Drawer(() => rand(def));

		expect($.largest < 2).toBe(true);
		expect($.smallest >= 0).toBe(true);
	});

	it("should generate more values towards 'min' when bias is negative ", () => {
		const options = { ...def, bias: -1 };
		const $ = new Drawer(() => Math.floor(rand(options)));

		expect($.keyRatio(0) >= 0.6).toBe(true);
	});

	it("should generate more values towards 'max' when bias is positive ", () => {
		const options = { ...def, bias: 1 };
		const $ = new Drawer(() => Math.floor(rand(options)));

		expect($.keyRatio(1) >= 0.6).toBe(true);
	});

	it("should generate evenly spread values when bias is 0 (default) ", () => {
		const options = { ...def, bias: 0 };
		const $ = new Drawer(() => Math.floor(rand(options)));

		const [k0, k1] = [$.keyRatio(0), $.keyRatio(1)];
		const [min, max] = [0.3, 0.7];

		expect(k0 > min && k0 < max).toBe(true);
		expect(k1 > min && k1 < max).toBe(true);
	});
});

describe("Range:rand - int(part)", () => {
	const def = { min: 0, max: 2, bias: 0, asInt: true };

	it("should return an integer starting at 'min' ending at 'max'", () => {
		const $ = new Drawer(() => rand(def));

		expect($.hasKeys([0, 1, 2])).toBe(true);
		expect($.count).toBe(3);
	});

	it("should generate evenly spread values when bias is 0 (default) ", () => {
		const options = { ...def, bias: 0 };
		const $ = new Drawer(() => rand(options));

		const [k0, k1, k2] = [$.keyRatio(0), $.keyRatio(1), $.keyRatio(2)];

		const [min, max] = [0.2, 0.7];

		expect(k0 > min && k0 < max).toBe(true);
		expect(k1 > min && k1 < max).toBe(true);
		expect(k2 > min && k2 < max).toBe(true);
	});

	it("should self-correct the bias (flip it togheter with min and max) when 'min' > 'max'", () => {
		const options = { ...def, min: 2, max: 0, bias: -1 };
		const $ = new Drawer(() => rand(options));
		expect($.keyRatio(2) > $.keyRatio(0));
	});

	it("bias should work for int as it does for float", () => {
		const negative = { ...def, bias: -1 };
		const positive = { ...def, bias: 1 };

		const neg = new Drawer(() => rand(negative));
		const pos = new Drawer(() => rand(positive));

		const [neg0, neg1] = [neg.keyRatio(0), neg.keyRatio(1)];
		const [pos0, pos1] = [pos.keyRatio(0), pos.keyRatio(1)];

		expect(neg0 > neg1).toBe(true);
		expect(pos1 > pos0).toBe(true);
	});
});
