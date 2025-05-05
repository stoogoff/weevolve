<template>
	<img :src="absoluteSource" :alt="alt" />
</template>
<script>
import Vue from 'vue'

export default Vue.component('CdnImage', {
	props: {
		source: {
			type: String,
			required: true,
		},
		alt: {
			type: String,
			default: '',
		},
	},

	computed: {
		absoluteSource() {
			const cdn = new URL(process.env.cdn)

			cdn.pathname = this.source

			return cdn.toString()
		},
	},
})
</script>
