
import apiRoutes from './api/api.routes.js';
import express from 'express';
import errorHandler from '../middlewares/errorHandler.js';

const router = express.Router();

router.use(apiRoutes, errorHandler);


export default router;