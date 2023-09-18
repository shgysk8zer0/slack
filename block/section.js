import { SlackBlock } from './block.js';
import { SlackElement } from '../element/element.js';
import { SlackTextElement } from '../element/text.js';
import { SlackPlainTextElement } from '../element/plain-text.js';

export class SlackSectionBlock extends SlackBlock {
	#text;
	#fields = [];
	#accessory;

	constructor(text, { id, accessory, fields } = {}) {
		super({ id });

		if (typeof text !== 'undefined') {
			this.text = text;
		}

		if (typeof accessory !== 'undefined') {
			this.accessory = accessory;
		}

		if (Array.isArray(fields) && fields.length !== 0) {
			this.add(...fields);
		}
	}

	get accessory() {
		return this.#accessory;
	}

	set accessory(val) {
		if (val instanceof SlackElement) {
			this.#accessory = val;
		} else {
			throw new TypeError('Accessory must be a SlackElement.');
		}
	}

	get text() {
		return this.#text;
	}

	set text(val) {
		if (val instanceof SlackTextElement) {
			this.#text = val;
		} else if (typeof val === 'string') {
			this.#text = new SlackPlainTextElement(val);
		} else {
			throw new TypeError('text must be a plain SlackTextElement or a string.');
		}
	}

	add(...fields) {
		const count = this.#fields.push(...fields.filter(field => field instanceof SlackTextElement));

		if (count !== fields.length) {
			throw new Error('Error adding some fields.');
		}

		return this;
	}

	toJSON() {
		return {
			...super.toJSON(),
			text: this.#text,
			accessory: this.#accessory,
			fields: this.#fields,
		};
	}
	static get TYPE() {
		return 'section';
	}
}
