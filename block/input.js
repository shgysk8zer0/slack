import { SlackBlock } from './block.js';
import { SlackPlainTextElement } from '../element/plain-text.js';
import { SlackInputElement } from '../element/input/input.js';
import { createFactory } from '../functions.js';

/**
 * @see https://api.slack.com/reference/block-kit/blocks#input
 */
export class SlackInputBlock extends SlackBlock {
	#element;
	#optional;
	#label;
	#hint;

	constructor(element, { id, hint, label, optional } = {}) {
		super({ id });

		this.element = element;

		if (typeof hint !== 'undefined') {
			this.hint = hint;
		}

		if (typeof label !== 'undefined') {
			this.label = label;
		}

		if (typeof optional !== 'undefined') {
			this.optional = optional;
		}
	}

	get element() {
		return this.#element;
	}

	set element(val) {
		if (val instanceof SlackInputElement) {
			this.#element = val;
		} else {
			throw new TypeError('element must be a SlackInputElement.');
		}
	}

	get hint() {
		return this.#hint;
	}

	set hint(val) {
		if (typeof val === 'string') {
			this.#hint = new SlackPlainTextElement(val);
		} else if (val instanceof SlackPlainTextElement) {
			this.#hint = val;
		} else {
			throw new TypeError('hint must be a string or SlackPlainText object.');
		}
	}

	get label() {
		return this.#label;
	}

	set label(val) {
		if (typeof val === 'string') {
			this.#label = new SlackPlainTextElement(val);
		} else if (val instanceof SlackPlainTextElement) {
			this.#label = val;
		} else {
			throw new TypeError('label must be a string or SlackPlainText object.');
		}
	}

	get optional() {
		return this.#optional;
	}

	set optional(val) {
		if (typeof val === 'boolean') {
			this.#optional = val;
		} else {
			throw new TypeError('optional must be a boolean.');
		}
	}

	toJSON() {
		return {
			...super.toJSON(),
			element: this.#element,
			label: this.#label,
			optional: this.#optional,
			hint: this.#hint,
		};
	}

	static get TYPE() {
		return 'input';
	}
}

export const createSlackInputBlock = createFactory(SlackInputBlock);
