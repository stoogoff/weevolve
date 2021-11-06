<template>
	<div>
		<img src="/img/kickstarter-banner.png" class="block object-cover w-full" />
		<div class="w-full bg-gray-700 border-b-2 border-yellow-500 flex justify-center p-2">
			<link-action :to="link.url" v-for="(link, idx) in links" :key="`link_${idx}`">{{ link.title }}</link-action>
		</div>
		<main-content>
			<div class="flex flex-wrap">
				<article class="w-full lg:w-9/12 mb-6 lg:mb-0">
					<div class="content mb-8">
						<markdown-content content="home" />
					</div>
				</article>
				<aside class="grid grid-cols-3 lg:block lg:w-3/12 lg:pl-6">
					<image-caption
						v-for="(image, idx) in images"
						:key="`image_${idx}`"
						:title="image.title"
						:url="image.url"
					/>
				</aside>
			</div>
		</main-content>
	</div>

</template>

<script>
export default {
	layout: 'home',

	data() {
		return {
			links: [
				{
					title: 'Aegean Kickstarter',
					url: 'https://www.kickstarter.com/projects/stoo-goff/aegean-mythic-role-playing-across-the-aegean-sea',
				},
				{
					title: 'Aegean Website',
					url: 'https://www.aegeanrpg.com/',
				},
			],
			images: [
				{
					title: 'Coming soon',
					url: 'ap/action-potential-logo.png'
				},
				{
					title: 'In development',
					url: 'footfall/footfall-logo.png',
				},
			],
		}
	},

	head() {
		return {
			title: 'Home',
		}
	},
}
</script>
