export function isURL(val) {
	if (val instanceof URL) {
		return true;
	} else if (typeof val !== 'string') {
		return false;
	} else {
		try {
			new URL(val);
			return true;
		} catch {
			return false;
		}
	}
}
