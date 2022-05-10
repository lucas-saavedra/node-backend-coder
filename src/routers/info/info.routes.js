import express from 'express';
import { info } from '../../controllers/info/info.controllers.js';
import compression from 'compression';

const router = express.Router();

router.get('/', info);
router.get('/compressed', compression(), info);

export default router;