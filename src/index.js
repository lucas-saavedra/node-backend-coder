
const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');


const PORT = process.env.PORT || 8080;

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("./public")));

const MONGO_URI = "mongodb+srv://lucas_saavedra:Dino21%3F%3F@coderhouse-ecommerce.ys3rp.mongodb.net/coderhouse_ecommerce?retryWrites=true&w=majority"

app.use(session({
  name: 'my-session',
  secret: 'top-secret-51',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 600000
  },
  store: MongoStore.create({
    mongoUrl: MONGO_URI
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

app.get('/profile', async (req, res) => {
  const user = await req.session.user;
  if (user) {
    res.render('profile', { sessionUser: user });
  }
  else {
    return res.sendFile(path.resolve("./public", "login.html"));
  }

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
      if (err) {
        console.log(err);
        res.clearCookie('my-session');
        res.render('logout', { sessionUser: user });
      }
      else {
        res.clearCookie('my-session');
        res.render('logout', { sessionUser: user });
      }
    })

  }
  catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log('Server is up and running on port: ', PORT);
});