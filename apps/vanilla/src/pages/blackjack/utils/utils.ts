/**
 * Function to get a random number.
 * @param max Max value of the random range.
 * @returns Return a random number.
 */
export function getRandomIntegerNumber(max: number): number {
	const { crypto } = window ;
	const array = new Uint32Array(1);
	crypto.getRandomValues(array);

	return 1 + Math.floor(array[0] % max);
}
