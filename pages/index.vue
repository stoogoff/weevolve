<template>
	<div>
		<cdn-image source="/img/aegean-home-banner.jpg" class="block object-cover w-full" />
		<div class="w-full bg-gray-700 border-b-2 border-yellow-500 flex justify-center p-2">
			<link-action :to="link.url" v-for="(link, idx) in links" :key="`link_${idx}`">{{ link.title }}</link-action>
		</div>
		<main-content>
			<div class="flex flex-wrap">
				<article class="w-full lg:w-9/12 mb-6 lg:mb-0">
					<div class="content mb-8">
						<markdown-content content="home" />
					</div>
					<image-gallery class="lg:grid gap-x-2" :images="gallery" />
					<hr />
					<p class="mt-4">Checkout the games section for other games published by we-evolve.</p>
				</article>
				<aside class="grid grid-cols-3 lg:block lg:w-3/12 lg:pl-6">
					<div v-for="(image, idx) in images">
						<nuxt-link :to="image.link" v-if="image.link">
							<image-caption
								:key="`image_${idx}`"
								:title="image.title"
								:url="image.url"
							/>
						</nuxt-link>
						<image-caption
							v-else
							:key="`image_${idx}`"
							:title="image.title"
							:url="image.url"
						/>
					</div>
				</aside>
			</div>
		</main-content>
	</div>
</template>

<script>
export default {
	layout: 'home',
	scrollToTop: true,

	data() {
		return {
			links: [
				{
					title: 'Buy Aegean',
					url: 'https://gamefound.com/projects/stoo/aegean-rpg-mythic-roleplaying-across-the-aegean-sea',
				},
				{
					title: 'Aegean Website',
					url: 'https://www.aegeanrpg.com/',
				},
			],
			images: [
				{
					title: 'Now available!',
					url: 'ap/cover-front.jpg',
					link: 'games/action-potential',
				},
				{
					title: 'In development',
					url: 'footfall/footfall-logo.png',
				},
			],
			gallery: [
				{
					title: 'Aegean Core',
					url: 'aegean/aegean-core.jpg',
				},
				{
					title: 'Book of Heroes',
					url: 'aegean/book-of-heroes.jpg',
				},
				{
					title: 'Book of Empires',
					url: 'aegean/book-of-empires.jpg',
				},
			]
		}
	},
}
</script>
