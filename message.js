/**
 * @see https://api.slack.com/reference/block-kit/blocks
 * @see https://app.slack.com/block-kit-builder/
 */
import { JSON as JSON_MIME } from '@shgysk8zer0/consts/mimes.js';
import { SlackBlock } from './block/block.js';
import { SlackError } from './error.js';
import { isURL } from './validation.js';
import { createFactory } from './functions.js';

const HOOK_ORIGINS = ['https://hooks.slack.com/'];

export class SlackMessage {
	#webhook;
	#blocks = [];

	constructor(webhook = globalThis?.process?.env?.SLACK_WEBHOOK_URL, ...blocks) {
		if (! (isURL(webhook) && HOOK_ORIGINS.some(origin => webhook.startsWith(origin)))) {
			throw new Error('Invalid Slack Web Hook URL.');
		} else {
			this.#webhook = webhook;
		}

		if (blocks.length !== 0) {
			this.add(...blocks);
		}
	}

	get debugURL() {
		const url = new URL('https://app.slack.com/block-kit-builder');
		url.hash = JSON.stringify(this);
		return url;
	}

	toString()  {
		return JSON.stringify(this);
	}

	toJSON() {
		return { blocks: this.#blocks };
	}

	add(...blocks) {
		const count = this.#blocks.push(...blocks.filter(block => block instanceof SlackBlock));

		if (count !== blocks.length) {
			throw new Error('Error adding block to message.');
		}

		return this;
	}

	clear() {
		this.#blocks = [];
	}

	// async debug() {
	// 	await openLink(this.debugURL);
	// }

	/**
	 * Send the Slack message.
	 * @param {object} [options] - Optional parameters for the fetch request.
	 * @param {AbortSignal} [options.signal] - An optional AbortSignal for aborting the request.
	 * @throws {SlackError} If there is an error sending the message.
	 */
	async send({ signal } = {}) {
		try {
			const resp = await fetch(this.#webhook, {
				method: 'POST',
				moode: 'cors',
				referrerPolicy: 'no-referrer',
				headers: new Headers({
					Accept: 'text/plain',
					'Content-Type': JSON_MIME,
				}),
				body: this,
				signal,
			});

			if (! resp.ok) {
				const code = await resp.text();
				const { status, statusText } = resp;
				throw new SlackError('Error sending message', { code, status, statusText, debugURL: this.debugURL });
			} else {
				return resp.headers.get('x-slack-unique-id');
			}
		} catch(err) {
			if (! (err instanceof SlackError)) {
				const { status, statusText } = Response.error();
				throw new  SlackError('Error sending message', { code: '', status, statusText, debugURL: this.debugURL, cause: err });
			} else {
				throw err;
			}
		}
	}
}

export const createSlackMessage = createFactory(SlackMessage);
