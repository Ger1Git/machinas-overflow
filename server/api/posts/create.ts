import { defineEventHandler, readBody, setResponseStatus } from 'h3';
import { Post } from '../../models/Post';
import auth from '../../middleware/auth';

export default defineEventHandler(async (event) => {
    const { text, category, tags } = await readBody(event);
    const userId = event.context.user._id;

    await auth(event);

    try {
        const post = new Post({
            text,
            user: userId,
            category,
            tags
        });

        await post.save();
        return { message: 'Post created', post };
    } catch (error) {
        setResponseStatus(event, 500);
        return { message: 'Error creating post', error };
    }
});
