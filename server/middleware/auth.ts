import { defineEventHandler, getCookie, setResponseStatus } from 'h3';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

interface DecodedToken extends jwt.JwtPayload {
    userId: string;
}

const protectedRoutes = [
    '/api/users',
    '/api/posts',
    '/api/auth/logout',
    '/api/comments'
];

export default defineEventHandler(async (event) => {
    const currentRoute = event.node.req.url;

    const isProtected = protectedRoutes.some((route) =>
        currentRoute?.startsWith(route)
    );

    if (!isProtected) {
        return;
    }

    try {
        const token = getCookie(event, 'jwt');

        if (!token) {
            setResponseStatus(event, 401);
            return { message: 'Unauthorized: No Token Provided' };
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as DecodedToken;

        if (!decoded) {
            setResponseStatus(event, 401);
            return { message: 'Unauthorized: Invalid Token' };
        }

        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            setResponseStatus(event, 404);
            return { error: 'User not found' };
        }

        event.context.user = user;
    } catch (error) {
        setResponseStatus(event, 500);
        return { message: 'Server error in protectRoute middleware' };
    }
});
