import { SlackElement } from './element.js';

export class SlackInteractiveElement extends SlackElement {
	#action;

	constructor({ id, action } = {}) {
		super({ id });

		if (typeof action !== 'undefined') {
			this.action = action;
		}
	}

	get action() {
		return this.#action;
	}

	set action(val) {
		if (typeof val === 'string' && val.length !== 0) {
			this.#action = val;
		} else {
			throw new TypeError('action must be a non-empty string.');
		}
	}

	toJSON() {
		return {
			...super.toJSON(),
			action_id: this.#action,
		};
	}
}
