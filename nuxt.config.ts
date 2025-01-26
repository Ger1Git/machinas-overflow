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
    },
    css: ['~/assets/css/tailwind.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {}
        }
    },
    app: {
        head: {
            title: 'Machinas Overflow',
            meta: [
                {
                    name: 'description',
                    content: 'Website for Salesforce questions'
                }
            ],
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: '/machinas.svg' }
            ]
        }
    }
});
