import { defineEventHandler, readBody, setResponseStatus } from 'h3';
import bcrypt from 'bcryptjs';
import { User } from '../../models/User';

export default defineEventHandler(async (event) => {
    const { email, username, currentPassword, newPassword } = await readBody(
        event
    );

    const userId = event.context.user._id;

    try {
        let user = await User.findById(userId);

        if (!user) {
            setResponseStatus(event, 404);
            return { error: 'User not found' };
        }

        if (
            (!newPassword && currentPassword) ||
            (newPassword && !currentPassword)
        ) {
            setResponseStatus(event, 400);
            return {
                error: 'Please provide both current password and new password'
            };
        }

        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(
                currentPassword,
                user.password
            );
            if (!isMatch) {
                setResponseStatus(event, 400);
                return { error: 'Current password is incorrect' };
            }

            if (newPassword.length < 6) {
                setResponseStatus(event, 400);
                return {
                    error: 'Password needs to be at least 6 characters long'
                };
            }

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        user.email = email || user.email;
        user.username = username || user.username;

        user = await user.save();

        return { statusCode: 200, body: user };
    } catch (error) {
        setResponseStatus(event, 500);
        return { error: 'Server error when trying to update user profile' };
    }
});
