import mongoose, { Document, Schema, Types } from 'mongoose';

interface IUser extends Document {
    _id: Types.ObjectId;
    name: string;
    username: string;
    email: string;
    password: string;
    starredPosts: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        starredPosts: [
            {
                type: Types.ObjectId,
                ref: 'Post'
            }
        ],
        password: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const User = mongoose.model<IUser>('User', userSchema);

export { User, IUser };
