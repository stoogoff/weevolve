<template>
	<main-content>
		<div class="flex flex-wrap">
			<aside class="lg:block lg:w-1/3 lg:pr-6 pb-6">
				<image-caption :url="coverImage" />
				<link-action
					:to="link.url"
					v-for="(link, idx) in game.links"
					:key="`link_${idx}`"
					class="mt-4 mb-4 lg:mt-0"
					block
				>
					{{ link.title }}
				</link-action>
			</aside>
			<article class="w-full lg:w-2/3 mb-6 lg:mb-0">
				<review v-if="reviews.length > 0" class="mb-4" :review="review" />
				<div class="content mb-8" v-html="$options.filters.markdown(game.content)" />
				<image-gallery class="lg:grid gap-x-2" :images="galleryImages" />
				<section v-if="supplements.length" class="pt-10">
					<div
						v-for="(supplement, idx) in supplements"
						:key="`supplement_${idx}`"
						class="mb-6 md:flex"
					>
						<div class="md:w-3/12 md:pr-6">
							<cdn-image :source="`/img/${supplement.images[0]}`" :alt="supplement.title" />
						</div>
						<div class="md:w-9/12">
							<h3 class="text-xl font-bold">{{ supplement.title }}</h3>
							<p class="text-sm tracking-normal" v-html="$options.filters.markdownNoPara(supplement.summary)" />
							<link-action
								block
								type="primary"
								:to="`/games/${game.slug}/${supplement.slug}`"
							>
								Read more
							</link-action>
						</div>
					</div>
				</section>
			</article>
		</div>
	</main-content>
</template>
<script>
import { meta, title, url } from '~/utils/meta'
import tail from 'lodash/tail'
import head from 'lodash/head'
import shuffle from 'lodash/shuffle'

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
		},
		reviews: {
			type: Array,
			default: [],
		},
	},

	computed: {
		review() {
			return shuffle(this.reviews)[0]
		},

		coverImage() {
			return head(this.game.images)
		},

		galleryImages() {
			return tail(this.game.images)
		},
	},

	head() {
		if(!this.game) return {}

		const metadata = {
			type: 'article',
			title: this.game.title,
			description: this.game.summary.replace(/\*/g, ''),
			url: `/games/${this.$route.params.game}/`,
			image: `/img/${this.game.banner}`,
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