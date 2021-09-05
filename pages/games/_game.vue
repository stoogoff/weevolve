<template>
	<main>
		<markdown-content :content="content" />
	</main>
</template>
<script>
export default {
	layout: 'default',

	computed: {
		content() {
			const { params } = this.$nuxt.context

			return `/games/${params.game}`
		}
	}
}
</script>