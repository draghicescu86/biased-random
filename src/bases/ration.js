function rand(cache, sum) {
	const rnd = Math.random() * sum;
	return cache.find(({ s, e }) => rnd >= s && rnd <= e).value;
}

function build(rations) {
	guard(rations);

	let sum = 0;
	const cache = [];

	rations.forEach((item) => {
		const [value, ratio] = extractValueAndRatio(item);
		if (typeof ratio !== "number") throw "Ratio must be a number!";
		cache.push({ value, s: sum, e: (sum += ratio) });
	});

	if (sum <= 0) throw "The sum of all ratios is less than 0!";

	return [cache, sum];
}

const UNKNOW_TYPE = "Unknown item type!";

function extractValueAndRatio(item) {
	if (typeof item !== "object") throw UNKNOW_TYPE;

	const props = Object.getOwnPropertyNames(item);
	const len = props.length;

	if (len < 1) throw UNKNOW_TYPE;

	const hasRatio = props.includes("ratio");
	const hasValue = props.includes("value");

	//{value:"",ratio:1}
	if (hasValue && hasRatio) return [item.value, item.ratio];

	//{my:{custom:"object"},ratio}
	if (hasRatio) return [item, item.ratio];

	//{value:*,ratio:1}
	if (len === 1) return [props[0], item[props[0]]];

	throw UNKNOW_TYPE;
}

function guard(rations) {
	if (!Array.isArray(rations) || rations.length < 2)
		throw "Rations must be an array with at least 2 items";
}

module.exports = { rand, build };
