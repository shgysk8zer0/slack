import { SlackInteractiveElement } from '../interactive.js';
import { SlackPlainTextElement } from '../plain-text.js';

export class SlackInputElement extends SlackInteractiveElement {
	#autoFocus;
	#placeholder;

	constructor({ id, action, autoFocus = false, placeholder }) {
		super({ id, action });

		if (typeof autoFocus !== 'undefined') {
			this.autoFocus = autoFocus;
		}

		if (typeof placeholder !== 'undefined') {
			this.placeholder = placeholder;
		}
	}

	get autoFocus() {
		return this.#autoFocus;
	}

	set autoFocus(val) {
		if (typeof val !== 'boolean') {
			throw new TypeError('focus must be a boolean.');
		} else {
			this.#autoFocus = val;
		}
	}

	get placeholder() {
		return this.#placeholder;
	}

	set placeholder(val) {
		if (typeof val === 'string') {
			this.#placeholder = new SlackPlainTextElement(val);
		} else if (val instanceof URL || typeof val === 'number') {
			this.#placeholder = val.toString();
		} else {
			throw new TypeError('Invalid placeholder for input.');
		}
	}

	toJSON() {
		return {
			...super.toJSON(),
			placeholder: this.#placeholder,
			focus_on_load: this.#autoFocus,
		};
	}
}
