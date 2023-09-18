import { open } from './functions.js';

export class SlackError extends Error {
	#debugURL;

	constructor(message, { status = 0, statusText = '', code = '', debugURL, cause }) {
		super(message, { cause });
		this.status = status;
		this.statusText = statusText;
		this.code = code;
		this.#debugURL = debugURL;
	}

	toJSON() {
		const { message, status, statusText, code } = this;
		return { message, status, statusText, code };
	}

	async openInBlockKitBuilder() {
		await open(this.#debugURL);
	}
}
