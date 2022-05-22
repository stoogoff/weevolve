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
				<aside class="lg:block lg:w-3/12 lg:pl-6">
					<image-gallery :images="game.images" v-slot="props" />
				</aside>
			</div>
			<section v-if="supplements.length" class="pt-10">
				<h2>Supplements</h2>
				<div class="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0 pt-10">
					<game-card
						:game="supplement"
						v-for="(supplement, idx) in supplements"
						:key="`supplement_${idx}`"
						:url="`/games/supplements/${supplement.slug}`"
					/>
				</div>
			</section>
		</main-content>
	</div>
</template>
<script>
import { meta, title, url } from '~/utils/meta'

export default {
	layout: 'home',

	async fetch() {
		const { params } = this.$nuxt.context

		try {
			this.game = await this.$content(`/games/${params.game}`).fetch()

			const supplements = await this.$content('supplements').fetch()

			this.supplements = supplements.filter(s => s.for === this.game.title)
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