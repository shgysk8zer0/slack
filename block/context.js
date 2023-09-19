import { SlackBlock } from './block.js';
import { SlackTextElement } from '../element/text.js';
import { SlackImageBlock } from './image.js';
import { createFactory } from '../functions.js';

export class SlackContextBlock extends SlackBlock {
	#elements = [];

	constructor({ elements = [], id } = {}) {
		super({ id });

		if (! Array.isArray(elements)) {
			throw new TypeError('elements must be an array.');
		} else if (elements.length !== 0) {
			this.add(...elements);
		}
	}add(...elements) {
		const count = this.#elements.push(...elements.filter(el => el instanceof SlackTextElement || el instanceof SlackImageBlock));

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
		return 'context';
	}
}

export const createSlackContextBlock = createFactory(SlackContextBlock);
