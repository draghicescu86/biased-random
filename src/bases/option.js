const base = require("./base");

function guard(options, bias) {
	if (!Array.isArray(options) || options.length < 2)
		throw "Options must be an array with at least 2 items!";
	if (typeof bias !== "number") throw "Bias must be a number!";
}

function rand(options, bias, guarded = true) {
	if (guarded) guard(options, bias);

	const index = Math.floor(base(bias) * options.length);
	return options[index];
}

module.exports = {
	guard,
	rand,
};
