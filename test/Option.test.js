const Drawer = require("./utils");
const Option = require("../src/Option");

describe("Option", () => {
	describe("pick", () => {
		it("should throw an error when options is not an array with at least 2 items", () => {
			expect(() => Option.pick("")).toThrow(/Options/);
			expect(() => Option.pick([1])).toThrow(/Options/);
		});

		it("should throw an error when bias is not a number ", () => {
			expect(() => Option.pick([1, 2], "")).toThrow(/Bias/);
		});

		it("should return all options in time", () => {
			const options = ["a", "b", "c"];
			const $ = new Drawer(() => Option.pick(options, 0));

			expect($.hasKeys(options)).toBe(true);
			expect($.count).toBe(3);
		});

		test("should use default bias if missing ", () => {
			const $ = new Drawer(() => Option.pick(["a", "b"]));

			expect($.ratioBetween("a", "b") < 0.66);
		});
	});

	describe("Constructor", () => {
		it("should throw an error when options is not an array with at least 2 items", () => {
			expect(() => new Option("")).toThrow(/Options/);
			expect(() => new Option([1])).toThrow(/Options/);
		});

		it("should store options and bias", () => {
			let o = new Option(["a", "b"], 1);

			expect(o.bias).toBe(1);
			expect(o.options).toEqual(["a", "b"]);
		});
	});
	describe("next", () => {
		it("should return all options in time", () => {
			const options = ["a", "b", "c"];
			const option = new Option(options);
			const $ = new Drawer(() => option.next());

			expect($.hasKeys(options)).toBe(true);
			expect($.count).toBe(3);
		});
	});

	describe("bool", () => {
		it("should return true and false in time", () => {
			const $ = new Drawer(() => Option.bool());

			expect($.count).toBe(2);
			expect($.hasKeys([true, false]));
		});
	});

	describe("sign", () => {
		it("should return -1 and 1 in time", () => {
			const $ = new Drawer(() => Option.sign());

			expect($.count).toBe(2);
			expect($.hasKeys([-1, 1]));
		});
	});

	describe("duo", () => {
		it("should return both options in time", () => {
			const $ = new Drawer(() => Option.duo("a", "b"));

			expect($.count).toBe(2);
			expect($.hasKeys(["a", "b"])).toBe(true);
		});

		test("should use defaults if missing params", () => {
			const $ = new Drawer(() => Option.duo(/* options=[0,1], bias=0 */));

			expect($.ratioBetween(0, 1) < 0.66);
		});
	});

	describe("trio", () => {
		it("should return all options in time", () => {
			const $ = new Drawer(() => Option.trio("a", "b", "c"));

			expect($.count).toBe(3);
			expect($.hasKeys(["a", "b", "c"]));
		});

		test("should use defaults if missing params", () => {
			const $ = new Drawer(() => Option.trio(/* options=[-1,0,1], bias=0 */));

			expect($.smallest > 0.2);
		});
	});

	describe("from", () => {
		it("should return all options in time", () => {
			const options = ["a", "b", "c"];
			let option = Option.from({ options });
			const $ = new Drawer(() => option.next());

			expect($.count).toBe(3);
			expect($.hasKeys(options));
		});

		test("if missing, the bias should default to 0", () => {
			let option = Option.from({ options: ["a", "b", "c"] });

			expect(option.bias).toBe(0);
		});
	});

	describe("toObject", () => {
		it("should return the arguments passed in the constructor", () => {
			const options = ["a", "b"];
			const bias = 1;

			const obj = new Option(options, bias).toObject();
			expect(obj).toEqual({ options, bias });
		});
	});
});
