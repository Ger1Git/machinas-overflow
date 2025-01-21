import mongoose, { Document, Schema, Types } from 'mongoose';

interface IPost extends Document {
    _id: Types.ObjectId;
    title: string;
    content: string;
    user: Types.ObjectId;
    category: string;
    comments: Types.ObjectId[];
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

const postSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true
    },
    comments: [
        {
            type: Types.ObjectId,
            ref: 'Comment'
        }
    ],
    tags: [
        {
            type: String
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model<IPost>('Post', postSchema);

export { Post, IPost };
