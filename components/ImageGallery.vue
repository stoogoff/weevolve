<template>
	<div class="lg:block grid grid-cols-3">
		<div v-for="(image, idx) in images" :key="`image_${idx}`">
			<div class="cursor-pointer" @click="showGallery(idx)">
				<image-caption v-if="image.url" :url="image.url" :title="image.title" />
				<image-caption v-else :url="image" />
			</div>
		</div>
		<overlay-fade v-if="showFull !== null">
			<div class="p-10 h-screen">
				<img class="max-h-full p-1 bg-white border border-black" :src="`/img/${currentImage()}`" :key="currentImage()" />
				<span class="absolute top-4 right-4"><icon-action icon="close" outlined @click="hideGallery()" /></span>
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
		currentImage() {
			if(this.showFull === null) return ''

			const currentImage = this.images[this.showFull]

			return currentImage.url ? currentImage.url : currentImage
		},

		showGallery(index) {
			this.showFull = index
		},

		hideGallery() {
			this.showFull = null
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
