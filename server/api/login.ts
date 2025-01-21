import { defineEventHandler, readBody, setResponseStatus } from 'h3';
import bcrypt from 'bcryptjs';
import { User, IUser } from '../models/User';
import generateTokenAndSetCookie from '../utils/generateToken';

export default defineEventHandler(async (event) => {
    try {
        const { usernameOrEmail, password } = await readBody(event);
        const user: IUser | null = await User.findOne({
            $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            setResponseStatus(event, 400);
            return { error: 'Invalid username or password' };
        }

        generateTokenAndSetCookie(user._id, event);

        return {
            _id: user._id,
            username: user.username,
            email: user.email
        };
    } catch (error) {
        setResponseStatus(event, 500);
        return { error: 'Internal server error when trying to login' };
    }
});
