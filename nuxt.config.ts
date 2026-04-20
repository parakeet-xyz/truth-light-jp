export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'ja',
      },
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@nuxt/content'
  ],
  css: [
    '~/assets/css/tailwind.css',
  ],
  site: {
    url: 'https://www.truth-light.jp',
    name: 'Truth Light',
  },
  sitemap: {
    sources: ['/api/__sitemap__/urls'],
  },
  nitro: {
    routeRules: {
      "/ketcher/**": {
        headers: {
          "Content-Security-Policy": "frame-ancestors 'self';",
          "X-Frame-Options": "SAMEORIGIN",
        },
      },
    },
  },
  runtimeConfig: {
    openaiApiKey: '',
    public: {
      maintenanceMode: false,
    },
  },
  experimental: {
    appManifest: false,
  },
})