<template>
	<markdown-content :content="content" />
</template>
<script>
export default {
	layout: 'default',
	scrollToTop: true,

	computed: {
		content() {
			const { params } = this.$nuxt.context

			return params.page
		}
	}
}
</script>