
/**
 * A valid QQ number must conform to the following rules:
 * 1. must be a positive number;
 * 2. can't start with 0;
 * 3. lengths between 4 and 12. 
 * @param {string} qqnumber
 * @returns {boolean}
 */
export function isValidQQNumber(qqnumber: string): boolean {
	const regex = /^[1-9]\d{3,13}$/
	const ok = regex.exec(qqnumber);
	return ok != null;
}

/**
 * Trigger a function but only once per use case.
 * @param {Function} fn A fucntion to be triggered.
 * @param {number} timeout Default timeout is 300.
 */
export function debounce(fn: Function, timeout: number = 300) {
	let timer: any;
	return (...args: any[]) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn.apply(null, args);
		}, timeout);
	};
}

/**
 * Gurantees the execution of function in a specified period.
 * @param {Function} fn A function to be guranteed.
 * @param {number} delay Default delay is 500
 */
export function throttle(fn: Function, delay: number = 500) {
	let lastCalled = 0;
	return (...args: any[]) => {
		let now = new Date().getTime();
		if (now - lastCalled < delay) {
			return;
		}
		lastCalled = now;

		return fn(...args);
	};
}
