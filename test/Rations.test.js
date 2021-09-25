const Ration = require("../src/Ration");

describe("Ration", () => {
	describe("Constructor", () => {
		it("should throw when invalid rations", () => {
			expect(() => new Ration()).toThrow();
		});

		it("should create an instance of Ration", () => {
			const r = new Ration([{ a: 1 }, { b: 2 }]);
			expect(r instanceof Ration).toBe(true);
		});

		it("store original rations ", () => {
			const a = { a: 1 };
			const b = { b: 2 };

			const r = new Ration([a, b]);
			const rations = r.rations;

			expect(rations[0]).toEqual(a);
			expect(rations[1]).toEqual(b);
		});
	});

	describe("next", () => {
		it("should return a random options, using the cache", () => {
			const r = new Ration([{ a: 1 }, { b: 2 }]);

			expect(r === "a" || r === "b");
		});
	});

	describe("pick", () => {
		it("should throw when invalid rations", () => {
			expect(() => Ration.pick()).toThrow();
		});

		it("should return a random options", () => {
			const r = Ration.pick([{ a: 1 }, { b: 2 }]);

			expect(r === "a" || r === "b");
		});
	});
});
