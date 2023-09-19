import { SlackInputElement } from './input.js';
import { createFactory } from '../../functions.js';

export class SlackTextInputElement extends SlackInputElement {
	#initialValue;
	#maxLength;
	#minLength;
	#multiLine;

	constructor({ id, action, autoFocus = false, placeholder, minLength, maxLength, multiLine, initialValue } = {}) {
		super({ id, action, autoFocus, placeholder });

		if (typeof initialValue !== 'undefined') {
			this.initialValue = initialValue.toString();
		}

		if (typeof maxLength !== 'undefined') {
			this.maxLength = maxLength;
		}

		if (typeof minLength !== 'undefined') {
			this.minLength = minLength;
		}

		if (typeof multiLine !== 'undefined') {
			this.multiLine = multiLine;
		}
	}

	get initialValue() {
		return this.#initialValue;
	}

	set initialValue(val) {
		if (typeof val === 'string' && val.length !== 0) {
			this.#initialValue = val;
		} else {
			throw new TypeError('initialValue must be a non-empty string.');
		}
	}

	get maxLength() {
		return this.#maxLength;
	}

	set maxLength(val) {
		if (! (Number.isSafeInteger(val) && val > 0)) {
			throw new TypeError('maxLength must be a positive integer.');
		} else {
			this.#maxLength = val;
		}
	}

	get minLength() {
		return this.#minLength;
	}

	set minLength(val) {
		if (! (Number.isSafeInteger(val) && val > 0)) {
			throw new TypeError('minLength must be a positive integer.');
		} else {
			this.#minLength = val;
		}
	}

	get multiLine() {
		return this.#multiLine;
	}

	set multiLine(val) {
		if (typeof val === 'boolean') {
			this.#multiLine = val;
		} else {
			throw new TypeError('multiLine must be a boolean.');
		}
	}

	toJSON() {
		return {
			...super.toJSON(),
			initial_value: this.#initialValue,
			max_length: this.#maxLength,
			min_length: this.#minLength,
			multiline: this.#multiLine,
		};
	}

	static get TYPE() {
		return 'plain_text_input';
	}
}

export const createSlackTextInputElement = createFactory(SlackTextInputElement);
