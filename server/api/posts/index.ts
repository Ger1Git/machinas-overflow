import { defineEventHandler, setResponseStatus } from 'h3';
import { Post } from '../../models/Post';

export default defineEventHandler(async (event) => {
    try {
        const userId = event?.context?.user?._id;
        if (!userId) {
            setResponseStatus(event, 401);
            return { error: 'Unauthorized access' };
        }

        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate('user', '-password')
            .populate('comments.user', '-password')
            .populate('likes', '-password');

        return {
            statusCode: 200,
            body: posts
        };
    } catch (error) {
        console.error('Error fetching posts:', error);

        setResponseStatus(event, 500);
        return { error: 'Internal server error' };
    }
});
