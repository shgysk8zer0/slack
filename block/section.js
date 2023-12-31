import { SlackBlock } from './block.js';
import { SlackInteractiveElement } from '../element/interactive.js';
import { SlackTextElement } from '../element/text.js';
import { SlackPlainTextElement } from '../element/plain-text.js';
import { createFactory } from '../functions.js';

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
		if (val instanceof SlackInteractiveElement) {
			this.#accessory = val;
		} else {
			throw new TypeError('Accessory must be a SlackInteractiveElement.');
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
		const before = this.#fields.length;
		const count = this.#fields.push(...fields.filter(field => field instanceof SlackTextElement));

		if (count - before !== fields.length) {
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

export const createSlackSectionBlock = createFactory(SlackSectionBlock);
