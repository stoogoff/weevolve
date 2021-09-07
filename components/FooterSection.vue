<template>
	<footer class="relative pt-8 pb-6 bg-gray-800 border-yellow-500 border-t-8 border-b-2 text-gray-400">
		<div class="container mx-auto px-4 max-w-screen-lg">
			<div class="flex flex-wrap">
				<div class="w-full lg:w-6/12 px-4 mb-6 lg:mb-0">
					<div class="mt-6">
						<span :key="`elsewhere_${idx}`" v-for="(item, idx) in elsewhere">
							<a
								v-if="item.icon"
								class="bg-white shadow-lg rounded-full outline-none focus:outline-none mr-2 p-3 inline-block hover:bg-gray-800 hover:text-white transition-all duration-500"
								:class="item.colour"
								:href="item.href"
								target="_blank"
							>
								<icon-view :icon="item.icon" />
							</a>
							<div v-else>
								<a
									class="text-gray-300 hover:text-gray-100 inline-block pb-2 text-sm"
									:href="item.href"
									target="_blank"
								>
									{{ item.title }}
								</a>
							</div>
						</span>
					</div>
				</div>
				<div class="w-full lg:w-3/12 px-4">
					<div class="px-4 ml-auto" v-if="games">
						<h5 class="block uppercase text-sm font-semibold mb-2">Games</h5>
						<ul>
							<li
								:key="`games_${idx}`"
								v-for="(item, idx) in games"
							>
								<nuxt-link
									class="text-gray-300 hover:text-gray-100 inline-block pb-2 text-sm"
									:to="item.href"
									>
										{{ item.title }}
								</nuxt-link>
							</li>
						</ul>
					</div>
				</div>
				<div class="w-full lg:w-3/12 px-4">
					<div class="px-4 ml-auto" v-if="useful">
						<h5 class="block uppercase text-sm font-semibold mb-2">Useful Links</h5>
						<ul>
							<li
								:key="`useful_${idx}`"
								v-for="(item, idx) in useful"
							>
								<a
									v-if="item.external"
									class="text-gray-300 hover:text-gray-100 inline-block pb-2 text-sm"
									:href="item.href"
									>
										{{ item.title }}
								</a>							
								<nuxt-link
									v-else
									class="text-gray-300 hover:text-gray-100 inline-block pb-2 text-sm"
									:to="item.href"
									>
										{{ item.title }}
								</nuxt-link>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="text-sm py-1 mt-6 ml-4">
				<a
					href="https://we-evolve.co.uk/"
					class="text-gray-300 hover:text-gray-100">
				Copyright &copy; 2021 we-evolve</a
				>
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
				{ icon: 'itch', href: 'https://we-evolve.itch.io/', colour: 'text-black' },
				{ title: 'DriveThruRPG', href: 'https://www.drivethrurpg.com/browse/pub/14996/we-evolve' },
			],
			useful: [
				{ title: 'About Us', href: '/support/about-us' },
				{ title: 'aegeanrpg.com', href: 'https://www.aegeanrpg.com/', external: true },
				{ title: 'wildrpg.com', href: 'https://www.wildrpg.com/', external: true },

			],
			games: null,
		}
	},
})

</script>