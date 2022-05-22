<template>
	<loading-spinner v-if="$fetchState.pending" />
	<div v-else>
		<main>
			<header>
				<h1 class="w-8/12" style="margin-left: 33%">{{ supplement.title }}</h1>
			</header>
			<div class="flex flex-wrap">
				<aside class="lg:block lg:w-4/12 lg:pr-6 pb-6">
					<image-caption :url="coverImage" />
					<link-action
						:to="link.url"
						v-for="(link, idx) in supplement.links"
						:key="`link_${idx}`"
						class="w-full mt-4 lg:mt-0"
					>
						Available on {{ link.title }}
					</link-action>
				</aside>
				<article class="w-full lg:w-8/12 mb-6 lg:mb-0">
					<div class="content mb-8">
						<nuxt-content :document="supplement" />
					</div>
 					<image-gallery class="lg:grid gap-x-2" :images="galleryImages" />
				</article>
			</div>
		</main>
	</div>
</template>
<script>
import { meta, title, url } from '~/utils/meta'

export default {
	layout: 'default',

	async fetch() {
		const { params } = this.$nuxt.context

		try {
			this.supplement = await this.$content(`/supplements/${params.supplement}`).fetch()
		}
		catch(error) {
			this.supplement = await this.$content('404').fetch()
		}
	},

	data() {
		return {
			supplement: null
		}
	},

	computed: {
		coverImage() {
			return this.supplement.images[0]
		},

		galleryImages() {
			return this.supplement.images.splice(1)
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