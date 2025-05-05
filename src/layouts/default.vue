<template>
	<div>
		<we-main-nav :menu-items="menuItems">we evolve</we-main-nav>
		<main-content class="py-16">
			<Nuxt />
		</main-content>
		<footer-section />
	</div>
</template>
<script>

import { menuItems } from '~/utils/config'

export default {
	name: 'DefaultLayout',

	computed: {
		menuItems() {
			return menuItems
		},
	},
}

</script>