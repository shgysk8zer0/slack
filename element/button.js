import { SlackElement } from './element.js';
import { SlackPlainTextElement } from './plain-text.js';
import { SLACK_DEFAULT, SLACK_PRIMARY, SLACK_DANGER } from './styles.js';
import { isURL } from '../validation.js';

export class SlackButtonElement extends SlackElement {
	#text;
	#action;
	#url;
	#value;
	#style;
	#confirm;
	#accessibilityLabel;

	constructor(text, {
		id,
		action,
		url,
		value,
		style = SLACK_DEFAULT,
		accessibilityLabel,
		// confirm,
	} = {}) {
		super({ id });

		this.text = text;

		if (typeof accessibilityLabel !== 'undefined') {
			this.accessibilityLabel = accessibilityLabel;
		}

		if (typeof action !== 'undefined') {
			this.action = action;
		}

		if (typeof style !== 'undefined') {
			this.style = style;
		}

		if (typeof url !== 'undefined') {
			this.url = url;
		}

		if (typeof value !== 'undefined') {
			this.value = value;
		}
	}

	get accessibilityLabel() {
		return this.#accessibilityLabel;
	}

	set accessibilityLabel(val) {
		if (typeof val === 'string' && val.length !== 0) {
			this.#accessibilityLabel = val;
		} else {
			throw new TypeError('accessibilityLabel must be a non-empty string.');
		}
	}

	get action() {
		return this.#action;
	}

	set action(val) {
		if (typeof val === 'string') {
			this.#action = val;
		} else {
			throw new TypeError('action must be a string.');
		}
	}

	get style() {
		return this.#style;
	}

	set style(val) {
		if (typeof val !== 'string' || val.length === 0) {
			throw new TypeError('style must be a non-empty string.');
		} else if (! SlackButtonElement.STYLES.includes(val)) {
			throw new Error(`Invalid style: ${val}.`);
		} else {
			this.#style = val;
		}
	}

	get text() {
		return this.#text;
	}

	set text(val) {
		if (val instanceof SlackPlainTextElement) {
			this.#text = val;
		} else if (typeof val === 'string') {
			this.#text = new SlackPlainTextElement(val);
		} else {
			throw new TypeError('text must be a plain SlackPlainTextElement or a string.');
		}
	}

	get url() {
		return this.#url;
	}

	set url(val) {
		if (! isURL(val)) {
			throw new TypeError(`${val} is not a URL.`);
		} else {
			this.#url = val;
		}
	}

	get value() {
		return this.#value;
	}

	set value(val) {
		if (typeof val === 'string' && val.length !== 0) {
			this.#value = val;
		} else {
			throw new TypeError('Value must be a non-empty string.');
		}
	}

	toJSON() {
		return {
			...super.toJSON(),
			text: this.#text,
			style: this.#style,
			action_id: this.#action,
			url: this.#url,
			value: this.#value,
			accessibility_label: this.#accessibilityLabel,
		};
	}

	static get TYPE() {
		return 'button';
	}

	static get STYLES() {
		return [SLACK_DEFAULT, SLACK_PRIMARY, SLACK_DANGER];
	}
}
