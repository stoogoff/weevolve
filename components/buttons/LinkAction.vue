<template>
	<a :class="classList" :disabled="disabled" :href="to" v-if="isExternal || isDownload">
		<slot />
	</a>
	<nuxt-link :class="classList" :disabled="disabled" :to="to" v-else>
		<slot />
	</nuxt-link>
</template>
<script>
import Vue from 'vue'

export default Vue.component('LinkAction', {
	props: {
		to: {
			type: String,
			required: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		type: {
			type: String,
			default: '',
		},
		block: {
			type: Boolean,
			default: false,
		},
		outlined: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		isExternal() {
			return this.to.startsWith('http')
		},

		isDownload() {
			return this.to.endsWith('.pdf')
		},

		classList() {
			let classList = ['btn', 'inline-block']

			if(this.block === true) {
				classList.push('block w-full')
			}

			if(this.outlined) {
				classList.push('outlined')
			}

			if(this.disabled === true) {
				classList.push('disabled')
			}
			else {
				classList.push('enabled')
				classList.push(this.type)
			}

			return classList.join(' ')
		},
	}
})
</script>