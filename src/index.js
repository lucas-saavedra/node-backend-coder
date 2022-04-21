import dotenv from 'dotenv'
import express from 'express';
import session from 'express-session';
dotenv.config()
import path from 'path';
import MongoStore from 'connect-mongo';
import dbConfig from './db/config.js'
import passport from './middlewares/passport.js'
import appRoutes from './routers/app.routes.js';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 8080;

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("./public")));


app.use(session({
  name: 'my-session',
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 600000
  },
  store: MongoStore.create({
    mongoUrl: dbConfig.mongodb.connectTo('sessions')
  })

}));
app.use(passport.initialize());
app.use(passport.session());

// Template engines
app.set('views', path.resolve('./src/views'));
app.set('view engine', 'ejs');

// Routes
app.use(appRoutes);

app.listen(PORT, async () => {

  try {
    await mongoose.connect(dbConfig.mongodb.connectTo('users'))
    console.log('Connected to DB!');
    console.log('Server is up and running on port: ', +PORT);
  } catch (error) {
    console.log(error)
  }

});