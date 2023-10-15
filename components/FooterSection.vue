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
									<img :src="item.img" :alt="item.title" class="max-w-xs mt-2" />
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
			<div class="text-sm mt-8 flex justify-center">
				<a href="https://we-evolve.co.uk/" class="block text-gray-300 hover:text-gray-100 text-center">
					<img src="/img/we-evolve-transparent.png" alt="we evolve" class="mb-2 max-w-xs" />
					Copyright &copy; 2018&ndash;{{ (new Date()).getFullYear() }} we-evolve
				</a>
			</div>
		</div>
	</footer>
</template>
<script>

import Vue from 'vue'
import { id } from '~/utils/string'

export default Vue.component('FooterSection', {
	async fetch() {
		await this.$state.fetch()

		const games = this.$state.games().sortByProperty('sort')

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
				{ icon: 'itch', href: 'https://we-evolve.itch.io/', colour: 'text-red-400' },
				{ title: 'DriveThruRPG', href: 'https://www.drivethrurpg.com/browse/pub/14996/we-evolve', img: '/img/drivethrurpg.png' },
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