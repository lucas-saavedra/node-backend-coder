import express from 'express';
import { info } from '../../controllers/info/info.controllers.js';

const router = express.Router();

router.get('/', info);

export default router;