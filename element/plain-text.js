import { SlackTextElement } from './text.js';

export class SlackPlainTextElement extends SlackTextElement {
	#emoji;

	constructor(text, { emoji = false, id } = {}) {
		super(text, { id });

		if (typeof emoji !== 'undefined') {
			this.emoji = emoji;
		}
	}

	get emoji() {
		return this.#emoji;
	}

	set emoji(val) {
		if (typeof val === 'boolean') {
			this.#emoji = val;
		} else {
			throw new TypeError('emoji must be a boolean.');
		}
	}

	toJSON() {
		return {
			...super.toJSON(),
			emoji: this.#emoji,
		};
	}

	static get TYPE() {
		return 'plain_text';
	}
}
