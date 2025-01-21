import { defineEventHandler, setCookie } from 'h3';

export default defineEventHandler(async (event) => {
    try {
        setCookie(event, 'jwt', '', { maxAge: 0 });
        return { message: 'Logged out successfully' };
    } catch (error) {
        setResponseStatus(event, 500);
        return { error: 'Internal server error when trying to logout' };
    }
});
