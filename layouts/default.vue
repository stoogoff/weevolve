<template>
	<div>
		<main-nav />
		<section class="relative py-16">
			<div class="container mx-auto md:px-4 max-w-screen-lg">
				<div class="relative flex flex-col py-8 w-full mb-6">
					<Nuxt />
				</div>
			</div>
		</section>
		<footer-section />
	</div>
</template>
<script>

export default {
	name: 'DefaultLayout',
}

</script>