// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: true,
  runtimeConfig: {
    mongoUri: process.env.MONGO_URI,
    frontendUrl: process.env.FRONTEND_URL,
  },
  nitro: {
    plugins: ["~/server/middleware/mongo.ts", "~/server/middleware/cookie.ts"],
  },
});
