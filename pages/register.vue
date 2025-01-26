<template>
    <div class="flex flex-1 items-center justify-center py-5 bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">
                Register
            </h2>

            <form @submit.prevent="handleRegister" class="space-y-4">
                <div>
                    <label
                        for="fullName"
                        class="block text-sm font-medium text-gray-700"
                        >Name</label
                    >
                    <Input
                        v-model="name"
                        id="name"
                        placeholder="Dexter"
                        required
                    />
                </div>
                <div>
                    <label
                        for="username"
                        class="block text-sm font-medium text-gray-700"
                        >Username</label
                    >
                    <Input
                        v-model="username"
                        id="username"
                        placeholder="dexter123"
                        required
                    />
                </div>
                <div>
                    <label
                        for="email"
                        class="block text-sm font-medium text-gray-700"
                        >Email</label
                    >
                    <Input
                        v-model="email"
                        id="email"
                        type="email"
                        placeholder="test@email.com"
                        required
                    />
                </div>
                <div>
                    <label
                        for="password"
                        class="text-sm font-medium text-gray-700"
                        >Password</label
                    >
                    <div class="password-input-container">
                        <Input
                            v-model="password"
                            id="password"
                            type="password"
                            placeholder="Your password"
                            required
                        />
                        <button
                            type="button"
                            @click="togglePasswordVisibility"
                            class="password-toggle-btn mt-1"
                        >
                            <img
                                v-if="isPasswordVisible"
                                src="/hidePassword.svg"
                                alt="Hide Password"
                                class="password-icon"
                            />
                            <img
                                v-else
                                src="/showPassword.svg"
                                alt="Show Password"
                                class="password-icon"
                            />
                        </button>
                    </div>
                </div>

                <div v-if="isError" class="text-red-600 text-sm mb-4">
                    {{
                        error.response?.data?.message ||
                        'An unexpected error occurred. Please try again.'
                    }}
                </div>

                <button
                    type="submit"
                    :disabled="isPending"
                    class="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <span v-if="isPending">Registering...</span>
                    <span v-else>Register</span>
                </button>
            </form>

            <p class="mt-4 text-center text-sm text-gray-600">
                Already have an account?
                <router-link
                    to="/login"
                    class="text-blue-500 hover:text-blue-600"
                    >Login</router-link
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
import Input from '../components/form/Input.vue';

const email = ref('');
const password = ref('');
const name = ref('');
const username = ref('');
const isPasswordVisible = ref(false);
const router = useRouter();
const queryClient = useQueryClient();

const {
    mutate: handleRegister,
    isError,
    isPending,
    error
} = useMutation({
    mutationKey: 'register',
    mutationFn: async () => {
        const response = await axios.post('/api/auth/register', {
            email: email.value,
            username: username.value,
            password: password.value,
            fullName: name.value
        });

        return response.data;
    },
    onSuccess: (data) => {
        queryClient.invalidateQueries('user');
        router.push('/');
    },
    onError: (error) => {
        console.error('Error registering user:', error);
    }
});

const togglePasswordVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value;
};
</script>

<style scoped>
.password-input-container {
    position: relative;
}

.password-toggle-btn {
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    cursor: pointer;
}

.password-icon {
    height: 24px;
    width: 24px;
    object-fit: cover;
    transition: transform 0.2s ease;
}

.password-toggle-btn:hover .password-icon {
    transform: scale(1.1);
}
</style>
