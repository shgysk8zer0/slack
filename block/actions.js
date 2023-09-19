import { SlackBlock } from './block.js';
import { SlackInteractiveElement } from '../element/interactive.js';
import { createFactory } from '../functions.js';

export class SlackActionsBlock extends SlackBlock {
	#elements = [];

	constructor({ elements = [], id } = {}) {
		super({ id });

		if (! Array.isArray(elements)) {
			throw new TypeError('elements must be an array.');
		} else if (elements.length !== 0) {
			this.add(...elements);
		}
	}

	add(...elements) {
		const count = this.#elements.push(...elements.filter(el => el instanceof SlackInteractiveElement));

		if (count !== elements.length) {
			throw new Error('Error adding some elements.');
		}

		return this;
	}

	toJSON() {
		return {
			...super.toJSON(),
			elements: this.#elements,
		};
	}

	static get TYPE() {
		return 'actions';
	}
}

export const createSlackActionsBlock = createFactory(SlackActionsBlock);
