import { defineEventHandler, readBody, setResponseStatus } from 'h3';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import generateTokenAndSetCookie from '../utils/generateToken';

export default defineEventHandler(async (event) => {
    try {
        const { fullName, username, email, password } = await readBody(event);
        const emailRegex =
            /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
        const existingUser = await User.findOne({ username });
        const existingEmail = await User.findOne({ email });

        if (!emailRegex.test(email)) {
            setResponseStatus(event, 400);
            return { error: 'Invalid email format' };
        }

        if (existingUser) {
            setResponseStatus(event, 400);
            return { error: 'Username is already taken' };
        }

        if (existingEmail) {
            setResponseStatus(event, 400);
            return { error: 'Email already used' };
        }

        if (password.length < 6) {
            setResponseStatus(event, 400);
            return { error: 'Password must be at least 6 characters long' };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name: fullName,
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        generateTokenAndSetCookie(newUser._id, event);

        return { message: 'User created successfully' };
    } catch (error) {
        setResponseStatus(event, 500);
        return { error: 'Server error when trying to create user' };
    }
});
