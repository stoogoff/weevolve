<template>
	<nav :class="`top-0 fixed z-30 w-full flex flex-wrap items-center justify-between px-2 py-1 ${background}`">
		<div class="container pl-4 pr-0 md:px-10 mx-auto flex flex-wrap items-center justify-between max-w-screen-lg">
			<div class="w-full relative flex justify-between md:w-auto md:static md:block md:justify-start">
				<span class="text-white text-sm tracking-wider leading-relaxed inline-block mr-4 py-2 whitespace-nowrap lowercase">
					<slot name="title" />
				</span>
				<slot name="buttons" />
			</div>
			<slot />
		</div>
	</nav>
</template>
<script>
import Vue from 'vue'

export default Vue.component('NavBar', {
	props: {
		transparent: {
			type: Boolean,
			default: false,
		}
	},

	computed: {
		background() {
			return this.transparent ? 'bg-black bg-opacity-25' : 'bg-gray-700 border-b-2 border-yellow-500'
		},
	},
})
</script>