// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
    runtimeConfig: {
        GC_API_KEY: process.env.GC_API_KEY,
    },
    typescript: {
        typeCheck: true,
    },
});
