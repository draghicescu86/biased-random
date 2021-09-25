/**
 *
 * @param {Bias} [bias=0]
 * @returns {number} a number between 0.0 and 1.0 based on {@link Bias}
 */
module.exports = function base(bias = 0) {
	if (typeof bias !== "number") throw "Bias must be a number!";

	bias = clamp(bias);
	const value = Math.pow(Math.random(), 1 / (Math.abs(bias) + 1));
	return bias < 0 ? 1 - value : value;
};

function clamp(bias) {
	return bias < -1 ? -1 : bias > 1 ? 1 : bias;
}
