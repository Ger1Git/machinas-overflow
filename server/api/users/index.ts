import { defineEventHandler, setResponseStatus } from 'h3';
import { User } from '../../models/User';

export default defineEventHandler(async (event) => {
    try {
        const searchQuery = event?.context?.query?.search || '';

        const users = await User.aggregate([
            {
                $match: {
                    $or: [
                        { username: { $regex: searchQuery, $options: 'i' } },
                        { fullName: { $regex: searchQuery, $options: 'i' } }
                    ]
                }
            },
            { $sample: { size: 20 } }
        ]);

        const suggestedUsers = users.slice(0, 6);
        suggestedUsers.forEach((user) => (user.password = null));

        return { statusCode: 200, body: suggestedUsers };
    } catch (error) {
        setResponseStatus(event, 500);
        return { error: 'Server error when trying to get users' };
    }
});
