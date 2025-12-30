<template>
	<div class="shadow-lg flex flex-col">
		<cdn-image class="w-full" :source="`/img/${tool.image}`" :alt="tool.title" />
		<div class="px-4 py-2 flex-grow">
			<header>
				<h1 class="text-xl text-gray-700 font-bold">{{ tool.title }}</h1>
			</header>
			<p class="text-sm tracking-normal" v-html="$options.filters.markdownNoPara(tool.description)" />
		</div>
		<div class="px-4 py-2">
			<link-action block type="primary" :to="tool.link.url">Go</link-action>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('ToolCard', {
	props: {
		tool: {
			type: Object,
			required: true,
		},
	},
})
</script>