
import Vue from 'vue'
import marked from 'marked'

const MARKDOWN_CONFIG = {
	smartypants: true,
	gfm: true,
	tables: true,
	xhtml: true,
}

Vue.filter('markdown', val => (marked(val, MARKDOWN_CONFIG)))
Vue.filter('markdownNoPara', val => (marked(val, MARKDOWN_CONFIG).replace('<p>', '').replace('</p>', '').trim()))

Vue.filter('date', value => {
	if(!value) return ''

	const date = new Date(Date.parse(value))

	return new Intl.DateTimeFormat('en-GB').format(date)
})
