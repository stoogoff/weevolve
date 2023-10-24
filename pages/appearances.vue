<template>
	<div>
		<h1>Appearances</h1>
		<article
			v-for="appearance in appearances"
			:key="appearance.path"
			class="mb-6 flex pb-6 border-b border-gray-200 last:border-b-0"
		>
			<div class="w-9/12">
				<h3 class="text-xl font-bold text-left">{{ appearance.title }}</h3>
				<aside class="uppercase text-xs flex text-gray-600 mb-4">
					<icon-view icon="calendar" />
					<p class="mb-0 mt-1 ml-2">
						Published <time :datetime="appearance.date">{{ appearance.date | date }}</time>
					</p>
				</aside>
				<p class="content" v-html="$options.filters.markdownNoPara(appearance.description)" />
				<div>
					<a v-if="appearance.link" :href="appearance.link.url" class="link">{{ appearance.link.title }}</a>
					<iframe v-if="appearance.embed" width="560" height="315" :src="appearance.embed" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
				</div>
			</div>
			<cdn-image
				v-if="appearance.logo"
				class="w-3/12 pr-6"
				:source="`/img/${appearance.logo}`"
				:alt="appearance.title"
			/>
		</article>
	</div>
</template>

<script>

export default {
	layout: 'default',

	async fetch() {
		await this.$state.fetch()

		this.appearances = this.$state.appearances().sortByProperty('date').reverse()
	},

	data() {
		return {
			appearances: []
		}
	},
}

</script>