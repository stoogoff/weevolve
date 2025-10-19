<template>
	<aside class="uppercase text-xs flex text-gray-600 mb-4">
		<icon-view icon="calendar" />
		<div class="mb-0 mt-1 ml-2">
			Published <time :datetime="publishedOn">{{ publishedOn | date }}</time>
		</div>
	</aside>	
</template>
<script>

import Vue from 'vue'

export default Vue.component('PublishedDate', {
	props: {
		publishedOn: {
			type: String,
			required: true,
		},
	},
})

</script>