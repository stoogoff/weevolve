
const express = require('express')
const { badRequest, notFound, serverError, jsonErrorHandler } = require('../errors')
const {
	getAllDocsByType,
	getDocByTypeId,
} = require('./api')

const app = express()

const ALLOWED_PREFIXES = ['games', 'supplements', 'appearances']

// ----------
// MIDDLEWARE

// general purpose parameter verification
const verify = (key, allowedValues) => {
	return (req, res, next) => {
		const param = req.params[key]

		if(!param || !allowedValues.includes(param)) {
			return next(notFound())
		}

		next()
	}
}

// check a the prefix is in the allowed range
const verifyPrefix = verify('prefix', ALLOWED_PREFIXES)

// verify query string data matches expected and throw error otherwise
const verifyQueryString = (req, res, next) => {
	if(req.query.limit && isNaN(req.query.limit)) {
		return next(badRequest())
	}

	next()
}


// ------
// ROUTES

// check it works
app.get('/hello', (req, res) => res.send('Hello'))

// generic list route for books
app.get('/:prefix', verifyPrefix, verifyQueryString, async (req, res, next) => {
	const limit = req.query.limit ? parseInt(req.query.limit) : false
	const prefix = req.params.prefix.replace(/s$/, '')

	try {
		const items = await getAllDocsByType(prefix, limit)

		res.json(items)
	}
	catch(ex) {
		next(serverError(ex.message))
	}
})

// generic fetch by id route
app.get('/:prefix/:id', verifyPrefix, async (req, res, next) => {
	const prefix = req.params.prefix.replace(/s$/, '')
	const id = req.params.id

	try {
		const item = await getDocByTypeId(prefix, id)

		res.json(item)
	}
	catch(ex) {
		next(notFound(`Type with id '${id}' not found.`))
	}
})

// error handler
app.use(jsonErrorHandler)

module.exports = {
	path: '/api', handler: app
}
