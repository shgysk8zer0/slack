import { SlackBase } from '../base.js';

export class SlackBlock extends SlackBase {
	#id;

	constructor({ id } = {}) {
		super();

		if (typeof id === 'string') {
			this.#id = id;
		}
	}

	get id() {
		return this.#id;
	}

	set id(val) {
		if (typeof id === 'string') {
			this.#id = val;
		} else {
			throw new TypeError('id must be a string.');
		}
	}

	toJSON() {
		return {
			...super.toJSON(),
			block_id: this.#id,
		};
	}
}
