import { defineEventHandler } from 'h3';
import connectMongoDB from '~/server/db/connectMongo';

export default defineEventHandler(async () => {
    await connectMongoDB();
});
