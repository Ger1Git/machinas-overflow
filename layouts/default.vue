<template>
    <div class="flex flex-col min-h-screen">
        <Navbar />

        <main class="flex flex-1">
            <NuxtPage />
        </main>

        <footer class="bg-gray-800 text-white p-4">
            <div class="max-w-7xl mx-auto text-center">
                <p>&copy; 2025 My Nuxt App</p>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { useQuery } from '@tanstack/vue-query';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();
const isAuthenticated = ref(false);

useQuery({
    queryKey: ['user'],
    queryFn: async () => {
        const { data } = await axios.get('/api/auth/auth-check', {
            withCredentials: true
        });

        if (data.status !== 200) {
            router.push('/login');
            return null;
        }

        return data.user;
    },
    onError: () => {
        router.push('/login');
    },
    retry: false
});

onMounted(() => {
    if (!isAuthenticated) {
        router.push('/login');
    }
});
</script>
