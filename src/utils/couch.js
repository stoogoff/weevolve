
import { sortByProperty } from 'we-ui/utils/list'

// -------
// HELPERS

// get the public id of the item, without the type: prefix
export const id = input => input.substring(input.lastIndexOf(':') + 1)

// convert CouchDB format and add a path for _all_docs responses
export const convertAllDocsToArray = (response, prefix) => response.data.rows.map(row => ({
	...row.doc,
	path: `/${prefix}s/` + id(row.doc._id)
}))

export const getAllDocsByType = async ($axios, prefix, limit = false) => {
	const params = {
		startkey: `"${prefix}:"`,
		endkey: `"${prefix}:\ufff0"`,
		include_docs: true
	}

	const response = await $axios.get('_all_docs', { params })
	let items = convertAllDocsToArray(response, prefix)

	items = items.sort(sortByProperty('order'))

	if(limit) {
		items = items.slice(0, limit)
	}

	return items
}

export const getDocByTypeId = async ($axios, prefix, id) => {
	const response = await $axios.get(`/${prefix}:${id}`)

	return response.data
}
