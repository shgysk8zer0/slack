import { describe, test } from 'node:test';
import assert from 'node:assert';
import {
	SlackMessage, SlackHeaderBlock, SlackPlainTextElement, SlackSectionBlock, SlackMarkdownElement,
	SlackDividerBlock, SlackContextBlock, SlackActionsBlock, SlackButtonElement, SlackImageBlock,
	SLACK_PRIMARY, SLACK_DANGER, SLACK_DEFAULT,
} from '@shgysk8zer0/slack';

const signal = AbortSignal.timeout(3000);
const skip = typeof process.env.SLACK_WEBHOOK_URL !== 'string';

describe('Send test message', async () => {
	test('Create and send message', { signal, skip }, async () => {
		try {
			const nowId = Date.now().toString(34);
			const result = await new SlackMessage(process.env.SLACK_WEBHOOK,
				new SlackHeaderBlock(new SlackPlainTextElement('Testing Slack library.')),
				new SlackSectionBlock(new SlackPlainTextElement('This is only a test.'), {
					fields: [
						new SlackMarkdownElement('*Testing*: Markdown'),
					],
				}),
				new SlackDividerBlock(),
				new SlackContextBlock({
					elements: [
						new SlackPlainTextElement('This is the message body.'),
					],
				}),
				new SlackImageBlock('https://cdn.kernvalley.us/img/raster/missing-image.png', { alt: 'Image test' }),
				new SlackActionsBlock({
					elements: [
						new SlackButtonElement(new SlackPlainTextElement('Primary Btn'), {
							action: `btn-prim-${nowId}`,
							style: SLACK_PRIMARY,
						}),
						new SlackButtonElement(new SlackPlainTextElement('Danger Btn'), {
							action: `btn-danger-${nowId}`,
							style: SLACK_DANGER,
						}),
						new SlackButtonElement(new SlackPlainTextElement('Default Btn'), {
							action: `btn-default-${nowId}`,
							style: SLACK_DEFAULT,
						}),
					]
				}),
			).send({ signal });

			assert.ok(typeof result === 'string', 'Message ID should be returned.');
		} catch(err) {
			assert.fail(err);
		}
	});
});
