<template>
	<blockquote class="grid gap-2 py-4 border-gray-300 border-b border-t">
		<icon-view icon="quote-open" class="w-20 h-20 inline-block text-gray-300" />
		<div>
			<h5 class="uppercase text-lg text-gray-400">{{ review.for }}</h5>
			<p class="text-2xl italic">{{ review.quote }}</p>
			<cite class="not-italic font-bold">{{ review.reviewer }}</cite>
		</div>
	</blockquote>	
</template>
<script>

import Vue from 'vue'

export default Vue.component('Review', {
	props: {
		review: {
			type: Object,
			required: true,
		},
	},
})

</script>
<style scoped>

blockquote {
	grid-template-columns: 5rem 1fr;
}

</style>
