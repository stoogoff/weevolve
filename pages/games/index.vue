<template>
	<main>
		<section v-if="games.length">
			<h1>Games</h1>
			<div class="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
				<div class="shadow-lg cursor-pointer" v-for="(game, idx) in games" :key="idx" @click="navigateTo(game.path)">
					<img class="w-full" :src="`/img/${game.images[0]}`" />
					<div class="px-4 py-2">
						<h1 class="text-xl font-gray-700 font-bold">{{ game.title }}</h1>
						<p class="h-40 text-sm tracking-normal" v-html="$options.filters.markdownNoPara(game.summary)" />
						<link-action block type="primary" :to="game.path">Read more</link-action>
					</div>
				</div>
			</div>
		</section>

		<section v-if="supplements.length">
			<h2>Supplements</h2>
			<ul>
				<li v-for="(supplement, idx) in supplements" :key="idx">{{ supplement.title }}</li>
			</ul>
		</section>
	</main>
</template>
<script>
import { sortByProperty } from '~/utils/list'

export default {
	layout: 'default',

	async fetch() {
		this.games = (await this.$content('games').fetch()).sort(sortByProperty('sort'))
	},

	data() {
		return {
			games: [],
			supplements: [],
		}
	},

	computed: {
		baseUrl() {
			return this.$nuxt.context.env.baseUrl
		},
	},

	head() {
		return {
			title: 'Games',
			link: [
				{ hid: 'canonical', rel: 'canonical', href: `${this.baseUrl}/games/` },
			]
		}
	},

	methods: {
		navigateTo(path) {
			this.$router.push(path)
		},
	},
}
</script>