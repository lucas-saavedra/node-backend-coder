import passport from 'passport';
import Local from 'passport-local';
import bcrypt from 'bcrypt';
import UserDaoMongoDb from '../models/daos/index.js';

const User = new UserDaoMongoDb();
const salt = () => bcrypt.genSaltSync(10);
const createHash = (password) => bcrypt.hashSync(password, salt());

const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

passport.use('login', new Local.Strategy(async (username, password, done) => {
    try {
        const user = await User.getByEmail(username);
        if (!user) {
            console.log('User does not exists');
            return done(null, false);
        }
        if (!isValidPassword(user, password)) {
            console.log('Invalid password');
            return done(null, false);
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.use('register', new Local.Strategy({
    passReqToCallback: true
},
    async (req, username, password, done) => {
        try {
            const isUserRegistered = await User.getByEmail(username);
            if (isUserRegistered) {
                console.log('User already exist');
                return done(null, false);
            }
            const userObj = {
                name: req.body.name,
                age: req.body.age,
                email: username,
                password: createHash(password),
                timestamp: Date.now()
            }
            const user = await User.createUser(userObj);
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

//serialize
passport.serializeUser((user, done) => {
    done(null, user._id)
})
//deserialize
passport.deserializeUser(async (id, done) => {
    const user = await User.getById(id);
    done(null, user);
})

export default passport;