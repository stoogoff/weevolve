<template>
	<div class="shadow-lg cursor-pointer" @click="navigateTo">
		<img class="w-full" :src="`/img/${game.images[0]}`" />
		<div class="px-4 py-2">
			<h1 class="text-xl font-gray-700 font-bold">{{ game.title }}</h1>
			<p class="h-40 text-sm tracking-normal" v-html="$options.filters.markdownNoPara(game.summary)" />
			<link-action block type="primary" :to="actualUrl">Read more</link-action>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('GameCard', {
	props: {
		game: {
			type: Object,
			required: true,
		},
		url: {
			type: String,
		},
	},

	computed: {
		actualUrl() {
			return this.url || this.game.path
		}
	},

	methods: {
		navigateTo() {
			this.$router.push(this.actualUrl)
		},
	},
})
</script>