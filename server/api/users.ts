import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('User API is running');
});

export default defineEventHandler(() => app);
