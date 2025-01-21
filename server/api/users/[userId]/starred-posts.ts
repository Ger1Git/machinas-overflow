import { defineEventHandler, setResponseStatus } from 'h3';
import { User } from '../../../models/User';

export const getStarredPosts = defineEventHandler(async (event) => {
    try {
        const userId = event?.context?.params?.userId;
        const user = await User.findById(userId).populate('starredPosts');

        if (!user) {
            setResponseStatus(event, 404);
            return { message: 'User not found' };
        }

        return user.starredPosts;
    } catch (error) {
        setResponseStatus(event, 500);
        return { message: 'Error fetching starred posts' };
    }
});
