import { SlackBlock } from './block.js';

export class SlackDividerBlock extends SlackBlock {
	static get TYPE() {
		return 'divider';
	}
}
