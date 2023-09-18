import { SlackBlock } from './block.js';
import { SlackPlainTextElement } from '../element/plain-text.js';

export class SlackHeaderBlock extends SlackBlock {
	#text;

	constructor(text, { id } = {}) {
		super({ id });

		if (typeof text !== 'undefined') {
			this.text = text;
		}
	}

	get text() {
		return this.#text;
	}

	set text(val) {
		if (val instanceof SlackPlainTextElement) {
			this.#text = val;
		} else if (typeof val === 'string') {
			this.text = new SlackPlainTextElement(val);
		} else {
			throw new TypeError('text must be a string or plain SlackPlainTextElement.');
		}
	}

	toJSON() {
		return {
			...super.toJSON(),
			text: this.#text,
		};
	}

	static get TYPE() {
		return 'header';
	}
}
