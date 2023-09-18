import { SlackTextElement } from './text.js';

export class SlackMarkdownElement extends SlackTextElement {
	#verbatim;

	constructor(text, { id, verbatim = false } = {}) {
		super(text, { id });

		if (typeof verbatim !== 'undefined') {
			this.verbatim = verbatim;
		}
	}

	get verbatim() {
		return this.#verbatim;
	}

	set verbatim(val) {
		if (typeof val === 'boolean') {
			this.#verbatim = val;
		} else {
			throw new TypeError('verbatim must be a boolean.');
		}
	}

	toJSON() {
		return {
			...super.toJSON(),
			verbatim: this.#verbatim,
		};
	}

	static get TYPE() {
		return 'mrkdwn';
	}
}
