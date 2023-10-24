<template>
	<markdown-content :content="content" />
</template>
<script>
export default {
	layout: 'default',

	computed: {
		content() {
			const { params } = this.$nuxt.context

			return params.page
		}
	}
}
</script>