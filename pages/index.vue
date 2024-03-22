<template>
	<article class="w-full">
		<div class="content mb-8 text-lg">
			<markdown-content content="home" />
		</div>

		<div class="md:grid grid-cols-2 gap-2 my-4">
			<home-banner
				url="/games/aegean"
				image="/img/home/banner-aegean.png"
			>Mythic adventures across the Aegean sea.</home-banner>

			<div class="grid grid-rows-2 gap-3">
				<home-banner
					url="/games/wild"
					image="/img/home/banner-wild.png"
				>A Tarot-based game of dream-sharing adventures.</home-banner>
				<home-banner
					url="/games/action-potential"
					image="/img/home/banner-action-potential.png"
				>A Forged in the Dark game set in a dystopian future.</home-banner>
			</div>
		</div>

		<review-carousel class="mb-4" :reviews="reviews"/>

		<p class="mt-4">Checkout the games section for other games published by we evolve.</p>
	</article>
</template>

<script>
export default {
	layout: 'default',
	scrollToTop: true,

	async fetch() {
		await this.$state.fetch()

		this.reviews = this.$state.reviews().all
	},

	data() {
		return {
			games: [
				{
					title: 'Aegean',
					image: 'banner-aegean.png',
				},
			],
			reviews: [],
		}
	},
}
</script>
