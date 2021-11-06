<template>
	<div>
		<div v-for="(image, idx) in images" :key="`image_${idx}`">
			<div @click="showGallery(idx)">
				<image-caption :url="image" />
			</div>
		</div>
		<overlay-fade v-if="showFull !== null">
			<div class="p-10 h-screen">
				<img class="h-full p-1 bg-white border border-black" :src="`/img/${images[showFull]}`" />
				<span class="absolute top-4 right-4"><icon-action icon="close" outlined @click="showFull = null" /></span>
				<span class="absolute bottom-4 left-4"><icon-action icon="prev" outlined @click="showPrev()" /></span>
				<span class="absolute bottom-4 right-4"><icon-action icon="next" outlined @click="showNext()" /></span>
			</div>
		</overlay-fade>
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('ImageGallery', {
	props: {
		images: {
			type: Array,
			required: true,
		},
	},

	data() {
		return {
			showFull: null,
		}
	},

	methods: {
		showGallery(index) {
			this.showFull = index
		},

		showNext() {
			++this.showFull

			if(this.showFull > this.images.length - 1) {
				this.showFull = 0
			}
		},

		showPrev() {
			--this.showFull

			if(this.showFull < 0) {
				this.showFull = this.images.length - 1
			}
		},
	},
})
</script>