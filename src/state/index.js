import Vue from 'vue'
import { findByProperty, sortByProperty } from 'we-ui/utils/list'
import { getAllDocsByType } from '~/utils/couch'

class Collection {
	constructor(prefix, data = []) {
		this.prefix = prefix
		this.all = data
	}

	setData(data = []) {
		this.all = data.map(item => ({
			...item,
			slug: (item._id || '').replace(`${this.prefix}:`, '')
		}))
	}

	findBySlug(slug) {
		return this.all.find(item => item.slug === slug)
	}

	filterByProperty(property, value) {
		return this.all.filter(findByProperty(property, value))
	}

	sortByProperty(property) {
		return [ ...this.all ].sort(sortByProperty(property))
	}
}

const state = Vue.observable({
	games: new Collection('game'),
	supplements: new Collection('supplement'),
	appearances: new Collection('appearance'),
	reviews: new Collection('reviews'),
	site: new Collection('site'),
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

		reviews() {
			return state.reviews
		},

		site() {
			return state.site
		},

		async fetch() {
			if(state.fetched && !process.server) {
				return
			}

			state.games.setData(await getAllDocsByType($axios, 'game'))
			state.supplements.setData(await getAllDocsByType($axios, 'supplement'))
			state.appearances.setData(await getAllDocsByType($axios, 'appearance'))
			state.reviews.setData(await getAllDocsByType($axios, 'review'))
			state.site.setData(await getAllDocsByType($axios, 'site'))
			state.fetched = true
		},
	}
}
