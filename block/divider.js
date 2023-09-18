import { SlackBlock } from './block.js';
import { createFactory } from '../functions.js';

export class SlackDividerBlock extends SlackBlock {
	static get TYPE() {
		return 'divider';
	}
}

export const createSlackDividerBlock = createFactory(SlackDividerBlock);
