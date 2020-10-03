
"use strict";

const DEFAULT = "__default__";

module.exports = function collections(settings) {
	settings = settings || {};

	return (files, metalsmith, next) => {
		let data = metalsmith.metadata();
		let keys = [];

		Object.keys(files).forEach(path => {
			if(!files[path].collection) {
				return;
			}

			let collections = files[path].collection;

			if(!Array.isArray(collections)) {
				collections = [collections];
			}

			collections.forEach(collection => {
				data[collection] = data[collection] || [];
				data[collection].push(files[path]);

				keys.push(collection);
			});
		});

		keys.forEach((key) => {
			let sortKey = "sort";

			if(key in settings) {
				sortKey = settings[key];
			}
			else if(DEFAULT in settings) {
				sortKey = settings[DEFAULT];
			}

			data[key].sort((a, b) => a[sortKey] == b[sortKey] ? 0 : (a[sortKey] > b[sortKey] ? 1 : -1));
		});

		next();
	}
};

module.exports.DEFAULT = DEFAULT;
module.exports.is = (file, collection) => {
	if(!("collection" in file)) {
		return false;
	}

	let fileCol = file.collection;

	if(!Array.isArray(fileCol)) {
		fileCol = [fileCol];
	}

	if(!Array.isArray(collection)) {
		collection = [collection];
	}

	return fileCol.filter(a => collection.indexOf(a) !== -1).length >= 1;
};
