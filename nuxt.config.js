
import { meta, url, title } from './utils/meta'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: title(),
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      ...meta(),
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { hid: 'canonical', rel: 'canonical', href: url() },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/filters.js',
    '~/plugins/state',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    {
      path: '~/components', // will get any components nested in let's say /components/test too
      pathPrefix: false,
    },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    'we-ui/nuxt',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxt/content',
  ],

  serverMiddleware: [
    '~/server/api/index.js',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
  }
}
