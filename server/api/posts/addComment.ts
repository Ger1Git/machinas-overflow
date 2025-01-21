import { defineEventHandler, readBody, setResponseStatus } from 'h3';
import { Post } from '../../models/Post';
import { Comment } from '../../models/Comment';
import auth from '../../middleware/auth';

export default defineEventHandler(async (event) => {
    const { text } = await readBody(event);
    const postId = event?.context?.params?.id;
    const userId = event?.context?.user?._id;

    await auth(event);

    try {
        if (!text) {
            setResponseStatus(event, 400);
            return { error: 'Text field is required' };
        }

        const post = await Post.findById(postId);

        if (!post) {
            setResponseStatus(event, 404);
            return { error: 'Post not found' };
        }

        const comment = new Comment({
            text,
            user: userId,
            post: postId
        });

        await comment.save();
        post.comments.push(comment._id);
        await post.save();

        return { message: 'Comment added', comment };
    } catch (error) {
        setResponseStatus(event, 500);
        return { error: 'Internal server error' };
    }
});
