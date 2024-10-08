<template>
	<dl class="my-4 p-2 border-b border-t border-gray-300">
		<div v-for="(value, key) in format" class="grid grid-cols-2">
			<dt class="font-bold">{{ key }}:</dt>
			<dd>{{ convert(value) }}</dd>
		</div>
	</dl>	
</template>
<script>

import Vue from 'vue'

const VALUE_MAP = {
	'A4': '(210 x 297mm)',
	'A5': '(148 x 210mm)',
	'US Royal': '(152 x 229mm)',
	'US Letter': '(215.9 x 279.4mm)'
}

export default Vue.component('ProductFormat', {
	props: {
		format: {
			type: Object,
			required: true,
		},
	},

	methods: {
		convert(value) {
			return value in VALUE_MAP ? `${value} ${VALUE_MAP[value]}` : value
		},
	},
})

</script>
