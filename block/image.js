import { SlackBlock } from './block.js';
import { SlackTextElement } from '../element/text.js';
import { SlackPlainTextElement } from '../element/plain-text.js';
import { isURL } from '../validation.js';

export class SlackImageBlock extends SlackBlock {
	#url;
	#alt;
	#title;

	constructor(url, { alt, title, id } = {}) {
		super({ id });
		this.url = url;
		this.#alt = alt;
		this.#title = title;
	}

	get alt() {
		return this.#alt;
	}

	set alt(val) {
		this.#alt = val;
	}

	get title() {
		return this.#title;
	}

	set title(val) {
		if (val instanceof SlackTextElement) {
			this.#title = val;
		} else if (typeof val === 'string') {
			this.title = new SlackPlainTextElement(val);
		} else {
			throw new TypeError('title must be SlackTextElement or a string.');
		}
	}

	get url() {
		return this.#url;
	}

	set url(val) {
		if (! isURL(val)) {
			throw new TypeError(`${val} is not a valid URL.`);
		} else if (val instanceof URL) {
			this.#url = val.href;
		} else {
			this.#url = val;
		}
	}

	toJSON() {
		return {
			...super.toJSON(),
			image_url: this.#url,
			title: this.#title,
			alt_text: this.#alt,
		};
	}

	static get TYPE() {
		return 'image';
	}
}
