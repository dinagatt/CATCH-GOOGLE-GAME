/**
 * Utility class for generating random integers within a specified range.
 */
export class NumberUtility {
    /**
     * Returns a random integer between fromInclusive (inclusive) and toExclusive (exclusive).
     *
     * @param {number} fromInclusive - The lower bound (inclusive).
     * @param {number} toExclusive - The upper bound (exclusive).
     * @returns {number} A random integer in the specified range.
     * @throws {TypeError} If arguments are not numbers.
     * @throws {RangeError} If fromInclusive is not less than toExclusive.
     */
    getRandomIntegerNumber(fromInclusive, toExclusive) {
        if(typeof fromInclusive !== 'number' || typeof toExclusive !== 'number') {
            throw new TypeError('Arguments must be a positive integer');
        }

        if(fromInclusive >= toExclusive) {
            throw new RangeError('fromInclusive must be less than toExclusive');
        }

        return Math.floor(Math.random() * (toExclusive - fromInclusive)) + fromInclusive;

    }
} //TESTS ON 1:24:00 LESSON 13 Dimych
