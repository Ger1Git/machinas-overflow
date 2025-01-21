import { defineEventHandler, setCookie, setResponseStatus } from 'h3';
import auth from '../../middleware/auth';

export default defineEventHandler(async (event) => {
    await auth(event);

    try {
        setCookie(event, 'jwt', '', { maxAge: 0 });
        return { message: 'Logged out successfully' };
    } catch (error) {
        setResponseStatus(event, 500);
        return { error: 'Internal server error when trying to logout' };
    }
});
