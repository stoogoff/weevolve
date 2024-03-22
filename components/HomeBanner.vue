<template>
	<section>
		<nuxt-link :to="url"><cdn-image :source="image" /></nuxt-link>
		<p class="italic"><slot /></p>
	</section>	
</template>
<script>

import Vue from 'vue'

export default Vue.component('HomeBanner', {
	props: {
		url: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
	},
})

</script>