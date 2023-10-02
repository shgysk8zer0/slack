import { openLink } from '@shgysk8zer0/http/utils.js';
import { isURL } from './validation.js';

/**
 * Custom error class for handling errors related to sending Slack messages.
 *
 * @class SlackError
 * @extends {Error}
 */
export class SlackError extends Error {
	#debugURL;
	#status;
	#statusText;
	#code;

	/**
	* Creates an instance of SlackError.
	*
	* @param {string} message - A descriptive error message.
	* @param {object} options - Optional error details.
	* @param {number} [options.status=0] - The HTTP status code of the response (default: 0).
	* @param {string} [options.statusText=''] - The HTTP status text of the response (default: '').
	* @param {string} [options.code=''] - A custom error code (default: '').
	* @param {string|URL} [options.debugURL] - The URL to open the message body in Slack's Block Kit Builder.
	* @param {Error} [options.cause] - The underlying cause of the error (optional).
	*/
	constructor(message, { status = 0, statusText = '', code = '', debugURL, cause }) {
		super(message, { cause });
		this.#status = status;
		this.#statusText = statusText;
		this.#code = code;

		if (typeof debugURL !== 'undefined' && isURL(debugURL)) {
			this.#debugURL = debugURL;
		}
	}

	get code() {
		return this.#code;
	}

	get status() {
		return this.#status;
	}

	get statusText() {
		return this.#statusText;
	}

	toJSON() {
		const { message, status, statusText, code } = this;
		return { message, status, statusText, code };
	}

	/**
	* Opens the message body in Slack's Block Kit Builder using the provided debug URL.
	*
	* @async
	* @throws {Error} Throws an error if no debug URL is set.
	* @returns {Promise<void>} - A Promise that resolves when the Block Kit Builder is opened.
	*/
	async openInBlockKitBuilder() {
		if (isURL(this.#debugURL)) {
			await openLink(this.#debugURL);
		} else {
			throw new Error('No debug URL set.');
		}
	}
}
