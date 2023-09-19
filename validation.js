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

export function isEmail(val) {
	if (typeof val !== 'string' || val.endsWith('/')) {
		return false;
	} else {
		try {
			const { username, password, host, pathname, search, hash, port } = new URL(`https://${val}/`);
			return pathname.length === 1 && username.length !== 0 && password.length === 0
				&& host.length !== 0 && search.length === 0 && hash.length === 0
				&& port.length === 0;
		} catch {
			return false;
		}
	}
}
