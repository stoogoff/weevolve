import Vue from 'vue'
import { findByProperty, sortByProperty } from 'we-ui/utils/list'

class Collection {
	constructor(prefix, data = []) {
		this.prefix = prefix
		this.all = data
	}

	setData(data = []) {
		this.all = data.map(item => new Model(this.prefix, item))
	}

	findBySlug(slug) {
		return this.all.find(item => item.slug === slug)
	}

	filterByProperty(property, value) {
		return this.all.filter(findByProperty(property, value))
	}

	sortByProperty(property) {
		return this.all.sort(sortByProperty(property))
	}
}

class Model {
	constructor(prefix, data = {}) {
		this.prefix = prefix

		Object.keys(data).forEach(key => {
			this[key] = data[key]
		})
	}

	get slug() {
		return (this._id || '').replace(`${this.prefix}:`, '')
	}
}

const state = Vue.observable({
	games: new Collection('game'),
	supplements: new Collection('supplement'),
	appearances: new Collection('appearance'),
	fetched: false,
})

export default ({ $axios }) => {
	return {
		games() {
			return state.games
		},

		supplements() {
			return state.supplements
		},

		appearances() {
			return state.appearances
		},

		async fetch() {
			if(state.fetched) {
				return
			}

			state.games.setData(await $axios.$get('/api/games'))
			state.supplements.setData(await $axios.$get('/api/supplements'))
			state.appearances.setData(await $axios.$get('/api/appearances'))
			state.fetched = true
		},
	}
}