const base = require("./base");

function rand(options, guarded = true) {
	if (guarded) guard(options);

	let { min, max, bias, asInt } = options;

	if (min > max) [min, max, bias] = flip(min, max, bias);

	let r = min + base(bias) * (max + Number(asInt) - min);

	return asInt ? Math.floor(r) : r;
}

function flip(min, max, bias) {
	return [Math.min(min, max), Math.max(min, max), bias * -1];
}

function guard(options) {
	for (let key in options) {
		//separate check for
		if (key === "asInt") continue;
		if (typeof options[key] !== "number")
			throw `'${key}' must be a number! Got:'${options[key]}'`;
	}

	if (typeof options.asInt !== "boolean") throw "'asInt' must be a boolean!";

	if (options.min === options.max)
		throw `'min' and 'max' must not be equal! Got: min='${options.min}', max='${options.max}'`;
}

module.exports = {
	rand,
	guard,
};
