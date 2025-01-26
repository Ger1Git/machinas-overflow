import axios from 'axios';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const apiBaseUrl = process.env.API_BASE_URL;

    if (!apiBaseUrl) {
        console.error('API base URL is not defined.');
        return navigateTo('/login');
    }

    try {
        const response = await axios.get(`${apiBaseUrl}/api/auth/auth-check`, {
            withCredentials: true
        });

        if (response.status !== 200) {
            return navigateTo('/login');
        }

        return true;
    } catch (err) {
        return navigateTo('/login');
    }
});
