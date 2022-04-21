import express from 'express';
import { login, register } from '../../../controllers/auth/auth.controllers.js';
import passport from '../../../middlewares/passport.js'

const router = express.Router();

router.post('/register',
    passport.authenticate('register', { failureRedirect: '/register-error' }),
    register
);

router.post('/login',
    passport.authenticate('login', { failureRedirect: '/login-error' }),
    login
);

export default router;