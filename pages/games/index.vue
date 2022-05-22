<template>
	<main>
		<section v-if="games.length">
			<h1>Games</h1>
			<div class="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
				<game-card
					:game="game"
					v-for="(game, idx) in games"
					:key="`game_${idx}`"
				/>
			</div>
		</section>

		<section v-if="supplements.length" class="pt-10">
			<h2>Supplements</h2>
			<p>Free and PWYW supplements for games by other publishers.</p>
			<div class="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0 pt-10">
				<game-card
					:game="supplement"
					v-for="(supplement, idx) in supplements"
					:key="`supplement_${idx}`"
					:url="`/games/supplements/${supplement.slug}`"
				/>
			</div>
		</section>
	</main>
</template>
<script>
import { sortByProperty } from '~/utils/list'
import { meta, title, url } from '~/utils/meta'

export default {
	layout: 'default',

	async fetch() {
		this.games = (await this.$content('games').fetch()).sort(sortByProperty('sort'))

		const supplements = (await this.$content('supplements').fetch()).sort(sortByProperty('sort'))
		const published = this.games.map(g => g.title)

		this.supplements = supplements.filter(s => published.indexOf(s.for) === -1)
	},

	data() {
		return {
			games: [],
			supplements: [],
		}
	},

	head() {
		const metadata = {
			title: 'Games',
			url: '/games/',
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