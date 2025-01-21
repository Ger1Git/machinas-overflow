import jwt from 'jsonwebtoken';
import { setCookie } from 'h3';
import { Types } from 'mongoose';

const generateTokenAndSetCookie = (
    userId: Types.ObjectId,
    event: any
): void => {
    const token = jwt.sign(
        { userId: userId.toString() },
        process.env.JWT_SECRET as string,
        {
            expiresIn: '10d'
        }
    );

    setCookie(event, 'jwt', token, {
        maxAge: 10 * 24 * 60 * 60, // 10 days
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        path: '/'
    });
};

export default generateTokenAndSetCookie;
