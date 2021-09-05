<template>
	<div>
		<!-- TODO second column with products / primary product -->
		<img :src="`/img/${game.banner}`" v-if="!$fetchState.pending" class="block object-cover w-full" />
		<main-content>
			<loading-spinner v-if="$fetchState.pending" />
			<div v-else>
				<p class="text-lg" v-html="$options.filters.markdownNoPara(game.summary)" />
				<div class="content mb-8">
					<nuxt-content :document="game" />
				</div>
			</div>
		</main-content>
	</div>
</template>
<script>
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
}
</script>