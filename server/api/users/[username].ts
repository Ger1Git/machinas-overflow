import { defineEventHandler, setResponseStatus } from 'h3';
import { User } from '../../models/User';

export default defineEventHandler(async (event) => {
    const { params } = event?.context || {};
    const { username } = params || {};

    try {
        const user = await User.findOne({ username }).select('-password');

        if (!user) {
            setResponseStatus(event, 404);
            return { error: 'User not found' };
        }

        return { statusCode: 200, body: user };
    } catch (error) {
        setResponseStatus(event, 500);
        return { error: 'Server error when getting user profile' };
    }
});
