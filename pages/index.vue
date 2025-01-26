<template>
    <div class="flex flex-col items-center w-full bg-white p-6">
        <div class="w-full max-w-4xl bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold mb-4 text-gray-800">Posts</h2>

            <div v-if="isLoading" class="text-gray-600">Loading posts...</div>
            <div v-else-if="isError" class="text-red-600">
                Error loading posts: {{ error.message }}
            </div>
            <div v-else>
                <ul>
                    <li
                        v-for="post in posts"
                        :key="post._id"
                        class="border-b border-gray-300 py-4"
                    >
                        <h3 class="text-lg font-bold text-gray-900">
                            {{ post.title }}
                        </h3>
                        <p class="text-gray-700">{{ post.content }}</p>
                        <div class="text-sm text-gray-500 mt-2">
                            Liked by {{ post.likes.length }} users |
                            <span
                                v-if="post.isLikedByUser"
                                class="text-green-500"
                                >You like this!</span
                            >
                            <span v-else class="text-gray-500"
                                >Not liked by you</span
                            >
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: ['auth']
});

import { useQuery } from '@tanstack/vue-query';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const {
    data: user,
    error,
    isError,
    isLoading
} = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
        const { data } = await axios.get('/api/posts', {
            withCredentials: true
        });

        if (data.status !== 200) {
            router.push('/login');
            return null;
        }

        return data.user;
    }
});
</script>
