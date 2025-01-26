<template>
    <div class="flex flex-1 items-center justify-center py-5 bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">
                Login
            </h2>

            <form @submit.prevent="handleLogin" class="space-y-4">
                <div>
                    <label
                        for="email"
                        class="block text-sm font-medium text-gray-700"
                        >Email / Username</label
                    >
                    <input
                        v-model="email"
                        id="email"
                        type="text"
                        required
                        placeholder="Enter your email"
                        class="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label
                        for="password"
                        class="block text-sm font-medium text-gray-700"
                        >Password</label
                    >
                    <input
                        v-model="password"
                        id="password"
                        type="password"
                        required
                        placeholder="Enter your password"
                        class="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div v-if="errorMessage" class="text-red-600 text-sm">
                    {{ errorMessage }}
                </div>

                <button
                    type="submit"
                    :disabled="isLoading"
                    class="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <span v-if="isLoading">Logging in...</span>
                    <span v-else>Login</span>
                </button>
            </form>

            <p class="mt-4 text-center text-sm text-gray-600">
                Don't have an account?
                <router-link
                    to="/register"
                    class="text-blue-500 hover:text-blue-600"
                    >Register</router-link
                >
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import axios from 'axios';

const email = ref('');
const password = ref('');
const errorMessage = ref(null);
const router = useRouter();
const queryClient = useQueryClient();

const {
    mutate: handleLogin,
    isLoading,
    isError,
    error
} = useMutation({
    mutationKey: ['login'],
    mutationFn: async () => {
        const response = await axios.post('/api/auth/login', {
            usernameOrEmail: email.value,
            password: password.value
        });

        return response.data;
    },
    onSuccess: (data) => {
        queryClient.invalidateQueries(['user']);
        router.push('/');
    },
    onError: (err) => {
        errorMessage.value =
            err.response?.data?.message || 'Invalid email or password';
    }
});
</script>
