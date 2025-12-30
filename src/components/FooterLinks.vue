<template>
	<div class="px-4 ml-auto">
		<h5 class="block uppercase text-sm font-semibold mb-2">{{ title }}</h5>
		<ul>
			<li
				:key="`items_${idx}`"
				v-for="(item, idx) in items"
			>
				<a
					class="text-gray-300 hover:text-gray-100 inline-block pb-2 text-sm"
					:href="item.href"
					v-if="isExternal(item.href)"
				>{{ item.title }}</a>
				<nuxt-link
					class="text-gray-300 hover:text-gray-100 inline-block pb-2 text-sm"
					:to="item.href"
					v-else
					>
						{{ item.title }}
				</nuxt-link>
			</li>
		</ul>	
	</div>
</template>
<script>

import Vue from 'vue'
import { isExternalUrl } from '~/utils/string'

export default Vue.component('FooterLinks', {
	props: {
		title: {
			type: String,
			required: true,
		},
		items: {
			type: Array,
			required: true,
		},
	},

	methods: {
		isExternal(url) {
			return isExternalUrl(url)
		},
	},
})

</script>