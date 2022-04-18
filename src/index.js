require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const auth = require('./middlewares/auth');

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
    mongoUrl: process.env.MONGO_URI
  })

}));

// Template engines
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Routes
app.get('/', async (req, res) => {
  const user = await req.session.user;
  if (user) {
    return res.redirect('/profile');
  }
  else {
    return res.sendFile(path.resolve("./public", "login.html"));
  }
});

app.get('/profile', auth, async (req, res) => {
  const user = await req.session.user;
  res.render('profile', { sessionUser: user });
});


app.post('/login', async (req, res) => {
  const { user } = req.body;
  req.session.user = user;
  req.session.save((err) => {
    if (err) {
      console.log(err);
      res.redirect('/')
    }
    res.redirect('/profile');
  })

});
app.get('/logout', async (req, res) => {
  try {
    const user = await req.session.user;
    req.session.destroy(err => {
      if (err) { console.log(err); }
      res.clearCookie('my-session');
      res.render('logout', { sessionUser: user });
    })

  }
  catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log('Server is up and running on port: ', PORT);
});