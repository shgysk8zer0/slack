import { SlackInputElement } from './input.js';
import { createFactory } from '../../functions.js';
import { isEmail } from '../../validation.js';

export class SlackEmailInputElement extends SlackInputElement {
	#initialValue;

	constructor({ id, action, autoFocus = false, placeholder, initialValue } = {}) {
		super({ id, action, autoFocus, placeholder });

		if (typeof initialValue !== 'undefined') {
			this.initialValue = initialValue.toString();
		}
	}

	get initialValue() {
		return this.#initialValue;
	}

	set initialValue(val) {
		if (isEmail(val)) {
			this.#initialValue = val;
		} else {
			throw new TypeError('initialValue must be a non-empty string.');
		}
	}

	toJSON() {
		return {
			...super.toJSON(),
			initial_value: this.#initialValue,
		};
	}

	static get TYPE() {
		return 'email_text_input';
	}
}

export const createSlackEmailInputElement = createFactory(SlackEmailInputElement);
