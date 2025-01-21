import mongoose from 'mongoose';
import { useRuntimeConfig } from '#imports';

const connectMongoDB = async () => {
    const config = useRuntimeConfig();
    const mongoURI = config.private.mongoUri;

    if (!mongoURI) {
        throw new Error('Mongo URI is not defined');
    }

    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};

export default connectMongoDB;
