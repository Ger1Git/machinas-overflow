import cookieParser from 'cookie-parser';
import express from 'express';

export default defineEventHandler((event) => {
    const app = express();
    app.use(cookieParser());
    
    app.use((req, res, next) => {
        event.context.req = req;
        next();
    });
});

function notImplementedExpress() {
    throw new Error('Function not implemented.');
}

