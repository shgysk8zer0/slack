import { SlackElement } from './element.js';

export class SlackTextElement extends SlackElement {
	#text;

	constructor(text, { id } = {}) {
		super({ id });
		this.text = text;
	}

	get text() {
		return this.#text;
	}

	set text(val) {
		if (typeof val === 'string' && val.length !== 0) {
			this.#text = val;
		} else {
			throw new TypeError('text must be a non-empty string.');
		}
	}

	toString() {
		return this.#text;
	}

	toJSON() {
		return {
			...super.toJSON(),
			text: this.#text,
		};
	}
}
