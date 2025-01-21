import { defineEventHandler, setResponseStatus } from 'h3';
import { Post } from '../../models/Post';
import auth from '../../middleware/auth';

export default defineEventHandler(async (event) => {
    await auth(event);

    try {
        const postId = event?.context?.params?.id;
        const post = await Post.findById(postId);

        if (!post) {
            setResponseStatus(event, 404);
            return { error: 'Post not found' };
        }

        if (post.user.toString() !== event.context.user._id.toString()) {
            setResponseStatus(event, 401);
            return { error: 'You are not authorized to delete this post' };
        }

        await Post.findByIdAndDelete(postId);
        return { message: 'Post deleted successfully' };
    } catch (error) {
        setResponseStatus(event, 500);
        return { error: 'Internal server error' };
    }
});
