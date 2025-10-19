<template>
	<div>
		<h1>Appearances</h1>
		<loading-spinner v-if="$fetchState.pending" />
		<article
			v-else
			v-for="appearance in appearances"
			:key="appearance.path"
			class="mb-6 md:flex pb-6 border-b border-gray-300 last:border-b-0"
		>
			<div class="md:w-9/12">
				<h2 class="text-2xl font-bold text-left mb-2">{{ appearance.title }}</h2>
				<h3 class="text-left italic text-gray-700 mb-2" v-if="appearance.subtitle">{{ appearance.subtitle }}</h3>
				<aside class="uppercase text-xs flex text-gray-600 mb-4">
					<icon-view icon="calendar" />
					<p class="mb-0 mt-1 ml-2">
						Published <time :datetime="appearance.date">{{ appearance.date | date }}</time>
					</p>
				</aside>
				<p class="content" v-html="$options.filters.markdownNoPara(appearance.description)" />
				<div>
					<a v-if="appearance.link" :href="appearance.link.url" class="link">{{ appearance.link.title }}</a>
					<iframe v-if="appearance.embed" style="max-width: 100%;" width="560" height="315" :src="appearance.embed" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
				</div>
			</div>
			<div class="mt-4 md:mt-0 md:w-3/12 md:pr-6">
				<cdn-image
					v-if="appearance.logo"
					:source="`/img/${appearance.logo}`"
					:alt="appearance.title"
				/>
			</div>
		</article>
	</div>
</template>

<script>

import { title, meta, url } from '~/utils/meta'

export default {
	layout: 'default',
	scrollToTop: true,

	async fetch() {
		await this.$state.fetch()

		this.appearances = this.$state.appearances().sortByProperty('date').reverse()
	},

	data() {
		return {
			appearances: []
		}
	},

	head() {
		const metadata = {
			title: 'Appearances',
			url: '/appearances/',
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