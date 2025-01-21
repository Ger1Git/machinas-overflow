export default defineNuxtConfig({
    devtools: { enabled: true },
    compatibilityDate: '2025-01-21',
    ssr: true,
    runtimeConfig: {
        private: {
            mongoUri: process.env.MONGO_URI || '',
            frontendUrl: process.env.FRONTEND_URL
        }
    },
    nitro: {
        plugins: ['~/server/middleware/mongo.ts']
    }
});