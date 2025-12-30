
export const id = function id(input) {
	return input.trim().normalize("NFD").replace(/[^a-z0-9\-\s]/gi, '').replace(/\s{1,}/g, "-").toLowerCase();
}

export const isExternalUrl = function isExternalUrl(url) {
	return url.startsWith('http://') || url.startsWith('https://')
}
