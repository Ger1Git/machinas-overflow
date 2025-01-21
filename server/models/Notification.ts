import mongoose, { Document, Schema, Types } from 'mongoose';

interface INotification extends Document {
    from: Types.ObjectId;
    to: Types.ObjectId;
    type: 'comment';
    read: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const notificationSchema: Schema = new Schema(
    {
        from: {
            type: Types.ObjectId,
            ref: 'User',
            required: true
        },
        to: {
            type: Types.ObjectId,
            ref: 'User',
            required: true
        },
        type: {
            type: String,
            required: true,
            enum: ['comment']
        },
        read: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const Notification = mongoose.model<INotification>(
    'Notification',
    notificationSchema
);

export default Notification;
