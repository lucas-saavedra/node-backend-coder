import express from 'express';
import router from './routers/app.routes.js';
import config from '../config.js';

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

export default app;

