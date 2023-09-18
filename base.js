export class SlackBase {
	#type;

	constructor() {
		this.#type = this.constructor.TYPE;
	}

	get type() {
		return this.#type;
	}

	toJSON() {
		return { type: this.#type };
	}
}
