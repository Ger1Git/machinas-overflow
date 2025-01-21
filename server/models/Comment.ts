import mongoose, { Document, Schema, Types } from 'mongoose';

interface IComment extends Document {
    _id: Types.ObjectId;
    text: string;
    user: Types.ObjectId;
    post: Types.ObjectId;
    createdAt: Date;
}

const commentSchema: Schema = new Schema(
    {
        text: {
            type: String,
            required: true
        },
        user: {
            type: Types.ObjectId,
            ref: 'User',
            required: true
        },
        post: {
            type: Types.ObjectId,
            ref: 'Post',
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

const Comment = mongoose.model<IComment>('Comment', commentSchema);

export { Comment, IComment };
