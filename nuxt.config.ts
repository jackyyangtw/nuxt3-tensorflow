// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
    plugins: ["~/plugins/model.js"],
    runtimeConfig: {
        GC_API_KEY: process.env.GC_API_KEY,
    },
});
