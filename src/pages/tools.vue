<template>
	<div>
		<loading-spinner v-if="$fetchState.pending" />
		<section v-else>
			<h1>Tools</h1>
			<p>RPG tools to help you with we evolve games as well as some for third party publishers.</p>
			<div class="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0 pt-10">
				<tool-card
					:tool="tool"
					v-for="(tool, idx) in tools"
					:key="`tool_${idx}`"
				/>
			</div>
		</section>
	</div>
</template>
<script>
import { meta, title, url } from '~/utils/meta'

export default {
	layout: 'default',
	scrollToTop: true,

	async fetch() {
		await this.$state.fetch()

		this.tools = this.$state.tools().sortByProperty('title')
	},

	data() {
		return {
			tools: []
		}
	},

	head() {
		const metadata = {
			title: 'Tools',
			url: '/tools/',
		}

		return {
			title: title(metadata),
			meta: meta(metadata),
			description: 'RPG tools to help you with we evolve games as well as some for third party publishers.',
			link: [
				{ hid: 'canonical', rel: 'canonical', href: url(metadata) },
			]
		}
	},
}

</script>