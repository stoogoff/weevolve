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

		<div class="banner content">
			<h2>we evolve Partners with GMS</h2>
			<p>we evolve has partnered with <a href="https://gmstabletopgames.com/">GMS Hobby Games Logistics</a> to make the <strong class="uppercase">Aegean</strong> RPG available in more shops throughout the UK. If you're a retailer looking to stock Aegean or just trying to find print copies of the books, check them out!</p>
		</div>

		<div class="banner content">
			<h2>The Isle of Pelops</h2>
			<p><a href="https://www.kickstarter.com/projects/stoo-goff/aegean-the-isle-of-pelops">The Kickstarter</a> for the new supplement to <strong class="uppercase">Aegean</strong> is now running through to the <time datetime="2024-11-30" class="border-b border-dotted border-slate-500 cursor-default" title="01/11/2024 to 30/11/2024">end of November</time>! Rewards include digital, POD, as well as print options while add ons include the existing books, dice and the Terror at Aspis adventure. Click to <a href="https://www.kickstarter.com/projects/stoo-goff/aegean-the-isle-of-pelops">find out more!</a></p>
		</div>

		<div class="banner content">
			<h2>Tabletop Scotland</h2>
			<p>we evolve will be at <a href="https://tabletopscotland.co.uk/">Tabletop Scotland</a> in <time datetime="2024-09-06" class="border-b border-dotted border-slate-500 cursor-default" title="06/09/2024 to 08/09/2024">September</time> sharing a stall with <a href="https://www.etsy.com/uk/shop/MiseryMakesShop">Misery Makes</a>. Find us on stand <strong>H3-16</strong> and say hello!</p>
		</div>

		<div class="banner content">
			<h2>The Isle of Pelops</h2>
			<p><strong>COMING SOON!</strong> A new setting guide for the <strong class="uppercase">Aegean</strong> role-playing game. The Isle of Pelops will describe the mythology and history of the Peloponnese as well as provide details of important people and locations, including the citadel of Mykenai and Sparta. New options are provided for players and GMs alike, including new backgrounds, Mystery Cults, adversaries, and more!</p>
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
			banners: [],
		}
	},
}
</script>
<style scoped>

.banner {
	@apply my-8 p-4 bg-stone-200 rounded-md;
}
.banner h2 {
	@apply text-left normal-case mb-2 mt-0 uppercase text-gray-500;
}
.banner *:last-child {
	@apply mb-0;
}

</style>
