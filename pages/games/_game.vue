<template>
	<loading-spinner v-if="$fetchState.pending" />
	<div v-else>
		<img :src="`/img/${game.banner}`" class="block object-cover w-full" />
		<div class="w-full bg-gray-700 border-b-2 border-yellow-500 flex justify-center p-2">
			<link-action :to="link.url" v-for="(link, idx) in game.links" :key="`link_${idx}`">{{ link.title }}</link-action>
		</div>
		<main-content>
			<div class="flex flex-wrap">
				<article class="w-full lg:w-9/12 mb-6 lg:mb-0">
					<div class="content mb-8">
						<nuxt-content :document="game" />
					</div>
				</article>
				<aside>
					<image-gallery :images="game.images" v-slot="props" />
				</aside>
			</div>
		</main-content>
	</div>
</template>
<script>
import meta from '~/utils/meta'

export default {
	layout: 'home',

	async fetch() {
		const { params } = this.$nuxt.context

		try {
			this.game = await this.$content(`/games/${params.game}`).fetch()
		}
		catch(error) {
			this.game = await this.$content('404').fetch()
		}
	},

	data() {
		return {
			game: null
		}
	},

	computed: {
		title() {
			return this.game ? this.game.title : ''
		},

		baseUrl() {
			return this.$nuxt.context.env.baseUrl
		},

		meta() {
			if(!this.game) return {}

			return meta({
				type: 'article',
				title: this.title,
				description: this.game.summary.replace(/\*/g, ''),
				url: `/games/${this.$route.params.game}`,
				image: `/img/${this.game.banner}`,
			})
		}
	},

	head() {
		return {
			title: this.title,
			meta: this.meta,
			link: [
				{ hid: 'canonical', rel: 'canonical', href: `${this.baseUrl}/games/${this.$route.params.game}` },
			]
		}
	},
}
</script>