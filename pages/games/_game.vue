<template>
	<loading-spinner v-if="$fetchState.pending" />
	<div v-else>
		<cdn-image :source="`/img/${game.banner}`" :alt="game.title" class="block object-cover w-full" />
		<nuxt-child :game="game" :supplements="supplements" />
	</div>
</template>
<script>
import { meta, title, url } from '~/utils/meta'
import { sortByProperty } from 'we-ui/utils/list'
import tail from 'lodash/tail'

export default {
	layout: 'home',
	scrollToTop: true,

	async fetch() {
		const { params } = this.$nuxt.context

		try {
			await this.$state.fetch()

			this.game = this.$state.games().findBySlug(params.game)
			this.supplements = this.$state.supplements().filterByProperty('for', this.game.title)
				.sort(sortByProperty('sort'))
		}
		catch(error) {
			this.game = await this.$content('404').fetch()
		}
	},

	data() {
		return {
			game: null,
			supplements: [],
		}
	},

	computed: {
		coverImage() {
			return this.game.images[0]
		},

		galleryImages() {
			return tail(this.game.images)
		},
	},

	head() {
		if(!this.game) return {}

		const metadata = {
			type: 'article',
			title: this.game.title,
			description: this.game.summary.replace(/\*/g, ''),
			url: `/games/${this.$route.params.game}/`,
			image: `/img/${this.game.banner}`,
		}

		return {
			title: title(metadata),
			meta: meta(metadata),
			link: [
				{ hid: 'canonical', rel: 'canonical', href: url(metadata) },
			]
		}
	},
}
</script>