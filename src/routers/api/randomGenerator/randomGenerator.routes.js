import express from 'express';
import  randomGenerator  from '../../../controllers/randomGenerator/randomGenerator.controllers.js';
const router = express.Router();

router.get('/randoms', randomGenerator);

export default router;