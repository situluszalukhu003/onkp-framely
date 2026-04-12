export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  
  // Konfigurasi tambahan jika diperlukan
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2025-07-15'
})