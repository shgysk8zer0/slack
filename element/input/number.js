import { SlackInputElement } from './input.js';
import { createFactory } from '../../functions.js';

export class SlackNumberInputElement extends SlackInputElement {
	#initialValue;
	#minValue;
	#maxValue;
	#decimal = false;

	constructor({ id, action, autoFocus = false, placeholder, initialValue, decimal = false, minValue, maxValue } = {}) {
		super({ id, action, autoFocus, placeholder });
		this.decimal = decimal;

		if (typeof minValue !== 'undefined') {
			this.minValue = minValue;
		}

		if (typeof maxValue === 'number') {
			this.maxValue = maxValue;
		}

		if (typeof initialValue !== 'undefined') {
			this.initialValue = initialValue;
		}
	}

	get decimal() {
		return this.#decimal;
	}

	set decimal(val) {
		if (typeof val === 'boolean') {
			this.#decimal = val;
		} else {
			throw new TypeError('decimal must be a boolean.');
		}
	}

	get initialValue() {
		return this.#initialValue;
	}

	set initialValue(val) {
		const minValue = this.#minValue;
		const maxValue = this.#maxValue;

		if (typeof val !== 'number' || ! Number.isFinite(val)) {
			throw new TypeError('initialValue must be a valid number.');
		} else if (! this.#decimal && ! Number.isSafeInteger(val)) {
			throw new TypeError('Floats/decimals not allowed without `decimal: true`.');
		} else if (typeof minValue === 'number' && val < minValue) {
			throw new TypeError(`intialValue must be > ${minValue}`);
		} else if (typeof maxValue === 'number' && val > maxValue) {
			throw new TypeError(`initialValue must be  > ${maxValue}`);
		} else {
			this.#initialValue = val;
		}
	}

	get maxValue() {
		return this.#maxValue;
	}

	set maxValue(val) {
		if (typeof val === 'number' && Number.isFinite(val)) {
			this.#maxValue = val;
		} else {
			throw new TypeError('maxValue must be a number that is finite.');
		}
	}

	get minValue() {
		return this.#minValue;
	}

	set minValue(val) {
		if (typeof val === 'number' && Number.isFinite(val)) {
			this.#minValue = val;
		} else {
			throw new TypeError('minValue must be a number that is finite.');
		}
	}

	toJSON() {
		return {
			...super.toJSON(),
			is_decimal_allowed: this.#decimal,
			max_value: this.#maxValue?.toString(),
			min_value: this.#minValue?.toString(),
			initial_value: this.#initialValue?.toString(),
		};
	}

	static get TYPE() {
		return 'number_input';
	}
}

export const createSlackNumberInputElement = createFactory(SlackNumberInputElement);
