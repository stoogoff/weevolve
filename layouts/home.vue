<template>
	<div id="home">
		<we-main-nav :menu-items="menuItems">we evolve</we-main-nav>
		<Nuxt />
		<footer-section />
	</div>
</template>
<script>

import { menuItems } from '~/utils/config'

export default {
	name: 'HomeLayout',

	computed: {
		menuItems() {
			return menuItems
		},
	},
}

</script>