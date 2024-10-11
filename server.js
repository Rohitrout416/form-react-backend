import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import './Models/db.js';
import AuthRouter from './Routes/AuthRouter.js';
import ProductRouter from './Routes/ProductRouter.js';

const app = express();
dotenv.config();

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/success', (req, res) => {
    res.send('working successfully');
})

app.use(express.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})