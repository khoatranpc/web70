import express from 'express';
import RootRouterV1 from './routers/index.js';
import { connectDb } from './database/index.js';

const app = express();
app.use(express.json());
connectDb();

app.use('/api/v1', RootRouterV1);

app.listen(5001, () => {
    console.log(`Server is running!`);
});