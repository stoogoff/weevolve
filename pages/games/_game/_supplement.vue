<template>
	<loading-spinner v-if="!supplement" />
	<main-content v-else>
		<header>
			<h1>{{ supplement.title }}</h1>
		</header>
		<div class="flex flex-wrap">
			<aside class="lg:block lg:w-4/12 lg:pr-6 pb-6">
				<image-caption :url="coverImage" />
				<link-action
					:to="link.url"
					v-for="(link, idx) in supplement.links"
					:key="`link_${idx}`"
					class="w-full mt-4 lg:mt-0"
					type="primary"
				>
					{{ link.title }}
				</link-action>
				<product-format v-if="supplement.format" :format="supplement.format" />
				<link-action
					:to="`/games/${game.slug}`"
					class="w-full mt-4 lg:mt-0"
				>
					&laquo; Back to {{ game.title }}
				</link-action>
			</aside>
			<article class="w-full lg:w-8/12 mb-6 lg:mb-0">
				<div class="content mb-8" v-html="$options.filters.markdown(supplement.content)" />
				<image-gallery class="lg:grid gap-x-2" :images="galleryImages" />
			</article>
		</div>
	</main-content>
</template>
<script>
import { meta, title, url } from '~/utils/meta'
import tail from 'lodash/tail'
import head from 'lodash/head'

export default {
	scrollToTop: true,
	props: {
		game: {
			type: Object,
			required: true,
		},
		supplements: {
			type: Array,
			default: [],
		}
	},

	data() {
		return {
			supplement: null,
		}
	},

	mounted() {
		const { params } = this.$nuxt.context

		this.supplement = this.supplements.find(s => s.slug === params.supplement)
	},

	computed: {
		coverImage() {
			return head(this.supplement.images)
		},

		galleryImages() {
			return tail(this.supplement.images)
		},
	},

	head() {
		if(!this.supplement) return {}

		const metadata = {
			type: 'article',
			title: this.supplement.title,
			description: this.supplement.summary.replace(/\*/g, ''),
			url: `/games/supplements/${this.$route.params.supplement}/`,
			image: `/img/${this.supplement.banner}`,
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