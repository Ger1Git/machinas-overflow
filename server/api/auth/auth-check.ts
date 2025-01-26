import verifyJwtToken from '../../utils/verifyToken';

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'authToken');

    if (!token) {
        return {
            status: 401,
            message: 'Unauthorized. Token is missing.'
        };
    }

    try {
        const user = verifyJwtToken(token);
        return {
            status: 200,
            message: 'Authenticated',
            user
        };
    } catch (error) {
        return {
            status: 401,
            message: 'Unauthorized. Invalid or expired token.'
        };
    }
});
