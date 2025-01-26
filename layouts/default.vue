<template>
    <div class="flex flex-col min-h-screen">
        <!-- Navbar -->
        <Navbar />

        <!-- Main Content (Where page content will be injected) -->
        <main class="flex-1">
            <NuxtPage />
        </main>

        <!-- Footer -->
        <footer class="bg-gray-800 text-white p-4 mt-6">
            <div class="max-w-7xl mx-auto text-center">
                <p>&copy; 2025 My Nuxt App</p>
            </div>
        </footer>
    </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue'; // Import the Navbar component
</script>

<style scoped>
/* Scoped styles for App.vue can be added here if needed */
</style>
