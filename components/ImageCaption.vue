<template>
	<figure class="border border-gray-400 p-1 shadow-lg lg:mb-6">
		<img class="lg:w-full" :src="`/img/${url}`" />
		<figcaption v-if="title" class="text-sm text-center italic">{{ title }}</figcaption>
	</figure>
</template>
<script>
import Vue from 'vue'

export default Vue.component('ImageCaption', {
	props: {
		url: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			default: '',
		},
	},
})
</script>