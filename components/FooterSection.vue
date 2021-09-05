<template>
	<footer class="relative pt-8 pb-6">
		<div class="container mx-auto px-4 max-w-screen-lg">
			<div class="flex flex-wrap">
				<div class="w-full lg:w-6/12 px-4 mb-6 lg:mb-0">
					<div class="mt-6">
						<a
							:key="`elsewhere_${idx}`"
							v-for="(item, idx) in elsewhere"
							class="bg-white shadow-lg rounded-full outline-none focus:outline-none mr-2 p-3 inline-block"
							:class="item.colour"
							:href="item.href"
							target="_blank"
						>
							<icon-view :icon="item.icon" />
						</a>
					</div>
				</div>
				<div class="w-full lg:w-3/12 px-4">
					<div class="px-4 ml-auto" v-if="games">
						<h5 class="block uppercase text-gray-600 text-sm font-semibold mb-2">Games</h5>
						<ul>
							<li
								:key="`games_${idx}`"
								v-for="(item, idx) in games"
							>
								<nuxt-link
									class="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
									:to="item.href"
									>
										{{ item.title }}
								</nuxt-link>
							</li>
						</ul>
					</div>
				</div>
				<div class="w-full lg:w-3/12 px-4 bg-red">
					<div class="px-4 ml-auto" v-if="useful">
						<h5 class="block uppercase text-gray-600 text-sm font-semibold mb-2">Useful Links</h5>
						<ul>
							<li
								:key="`useful_${idx}`"
								v-for="(item, idx) in useful"
							>
								<nuxt-link
									class="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
									:to="item.href"
									>
										{{ item.title }}
								</nuxt-link>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<hr class="my-6" />
			<div
				class="flex flex-wrap items-center md:justify-between justify-center"
			>
				<div class="w-full md:w-4/12 px-4 mx-auto text-center">
					<div class="text-sm text-gray-600 font-semibold py-1">
						<a
							href="https://we-evolve.co.uk/"
							class="text-gray-600 hover:text-gray-900">
						Copyright &copy; 2021 we-evolve</a
						>.
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>
<script>

import Vue from 'vue'
import { sortByProperty } from '~/utils/list'
import { id } from '~/utils/string'

export default Vue.component('FooterSection', {
	async fetch() {
		const games = (await this.$content('games').only(['title', 'sort', 'path']).fetch()).sort(sortByProperty('sort'))

		this.games = games.map(game => ({
			title: game.title,
			href: game.path
		}))
	},

	data() {
		return {
			elsewhere: [
				{ icon: 'twitter', href: 'https://twitter.com/stoogoff', colour: 'text-blue-400' },
				{ icon: 'facebook', href: 'https://www.facebook.com/weevolvegames/', colour: 'text-blue-600' },
			],
			useful: [
				{ title: 'About Us', href: '/support/about-us' },
			],
			games: null,
		}
	},
})

</script>