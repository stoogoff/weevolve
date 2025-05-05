<template>
	<div class="carousel w-full" ref="container">
		<review
			v-for="review in shuffledReviews"
			:key="review._id"
			:review="review"
			class="carousel-item w-full"
		/>
	</div>
</template>
<script>

import Vue from 'vue'
import shuffle from 'lodash/shuffle'

export default Vue.component('ReviewCarousel', {
	props: {
		reviews: {
			type: Array,
			required: true,
		},
	},

	data() {
		return {
			timer: null,
			index: 0,
		}
	},

	mounted() {
		const node = this.$refs.container

		this.timer = window.setInterval(() => {
			const scrolling = {
				block: 'nearest',
				inline: 'nearest',
			}

			if(++this.index >= node.children.length) {
				this.index = 0
				scrolling.behavior = 'instant'
			}

			node.children[this.index].scrollIntoView(scrolling)
		}, 10000)
	},

	onBeforeDestroy() {
		if(this.timer) {
			window.clearInterval(this.timer)
		}
	},

	computed: {
		shuffledReviews() {
			return shuffle(this.reviews)
		}
	}
})

</script>
<style scoped>

.carousel {
	@apply inline-flex overflow-x-scroll;
	scroll-snap-type: x mandatory;
	scroll-behavior: smooth;
	-ms-overflow-style: none;
	scrollbar-width: none;
}

.carousel::-webkit-scrollbar {
	@apply hidden;
}

.carousel-item {
	@apply box-content flex flex-none;
	scroll-snap-align: start;
}

</style>
