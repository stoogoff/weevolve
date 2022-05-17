<template>
	<main>
		<markdown-content content="support/about-us" />
	</main>
</template>
<script>
import { title } from '~/utils/meta'

export default {
	layout: 'default',

	head() {
		return {
			title: title({
				title: 'About Us'
			}),
		}
	},
}
</script>