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
								:class="item.cssClass"
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
									<cdn-image :source="item.img" :alt="item.title" class="max-w-xs mt-2" :class="item.cssClass" />
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
					<cdn-image source="/img/we-evolve-transparent.png" alt="we evolve" class="mb-2 max-w-xs" />
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

		const games = this.$state.games().sortByProperty('title')

		this.games = games.map(game => ({
			title: game.title,
			href: game.path
		}))

		const { elsewhere, useful } = this.$state.site().findBySlug('footer')

		this.elsewhere = elsewhere
		this.useful = useful
	},

	data() {
		return {
			elsewhere: [],
			useful: [],
			games: null,
		}
	},
})

</script>