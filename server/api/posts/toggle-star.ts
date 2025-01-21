import { defineEventHandler, readBody, setResponseStatus } from 'h3';
import { User } from '../../models/User';
import { Post } from '../../models/Post';

export const toggleStarPost = defineEventHandler(async (event) => {
    try {
        const userId = event?.context?.params?.userId;
        const { postId } = await readBody(event);

        const user = await User.findById(userId);
        if (!user) {
            setResponseStatus(event, 404);
            return { message: 'User not found' };
        }

        const post = await Post.findById(postId);
        if (!post) {
            setResponseStatus(event, 404);
            return { message: 'Post not found' };
        }

        const postIndex = user.starredPosts.indexOf(postId);

        if (postIndex > -1) {
            user.starredPosts.splice(postIndex, 1);
        } else {
            user.starredPosts.push(postId);
        }

        await user.save();

        return {
            message:
                postIndex > -1
                    ? 'Post unstarred successfully'
                    : 'Post starred successfully'
        };
    } catch (error) {
        setResponseStatus(event, 500);
        return {
            message: 'An error occurred while toggling the star on the post'
        };
    }
});
