import express from "express";
import authRoutes from "../api/auth/auth.routes.js";
import randomRoutes from '../api/randomGenerator/randomGenerator.routes.js'
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/', randomRoutes);

export default router;