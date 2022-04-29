
import apiRoutes from './api/api.routes.js';
import express from 'express';
import auth from '../middlewares/auth.js';
import path from 'path';
import errorRoutes from "./error/error.routes.js";
import infoRoutes from "./info/info.routes.js";
const router = express.Router();


router.get('/', async (req, res) => {
    const user = await req.user;
    if (user) {
        return res.redirect('/profile');
    }
    else {
        return res.sendFile(path.resolve("./public", "login.html"));
    }
});

router.get('/register', async (req, res) => {
    return res.sendFile(path.resolve("./public", "register.html"));
})
router.get('/login', async (req, res) => {
    return res.sendFile(path.resolve("./public", "login.html"));
})
router.get('/profile', auth, async (req, res) => {
    const user = await req.user;
    res.render('profile', { email: user.email });
});
router.get('/logout', auth, async (req, res) => {
    const user = await req.user;
    req.logOut();
    res.render('logout', { email: user.email });
});
router.use('/info', infoRoutes)
router.use('/api', apiRoutes);

router.use('/', errorRoutes);


export default router;