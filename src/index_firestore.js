const fs = require('fs/promises');
const path = require('path');
const users = [...require('./data/users.json')];
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const auth = require('./middlewares/auth');


const PORT = process.env.PORT || 8080;

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("./public")));
app.use(session({
  name: 'my-session',
  secret: 'top-secret-51',
  resave: false,
  saveUninitialized: false,
  store: new FileStore({
    path: path.join(__dirname, './sessions'),
    ttl: 300,
    retries: 0
  }
  )
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

app.get('/logout', auth, async (req, res) => {
  try {
    await fs.writeFile('./src/data/users.json', JSON.stringify(users));
    req.session.destroy(err => {
      if (err) {
        console.log(err);
        res.clearCookie('my-session');
      }
      else {
        res.clearCookie('my-session');
        res.redirect('/');
      }
    })
  }
  catch (err) {
    console.log(err);
  }
});

app.get('/unauthorized', (req, res) => {
  res.status(401).sendFile(path.resolve("./public", 'unauthorized.html'));
});

app.get('/notenoughfunds', auth, (req, res) => {
  res.status(400).sendFile(path.resolve("./public", 'notenough.html'));
});

app.get('/error', (req, res) => {
  res.status(500).sendFile(path.resolve("./public", 'error.html'));
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email);
  if (!user) return res.redirect('/error');
  req.session.user = user;
  req.session.save((err) => {
    if (err) {
      console.log(err);
      res.redirect('/')
    }
    res.redirect('/profile');
  })

});

app.post('/transfer', auth, (req, res) => {
  const { receiverAccount, senderAccount, amount, } = req.body;
  const sessionUser = req.session.user;

  const userAccount = sessionUser.accounts.find(account => account.number === senderAccount);
  if (+amount > userAccount.balance || userAccount.delinquent) return res.redirect('/notenoughfunds');

  const receiver = users.find(user => user.accounts.some(account => account.number === receiverAccount));
  if (!receiver) return res.redirect('/error');

  const targetAccount = receiver.accounts.find(account => account.number === receiverAccount);

  targetAccount.balance += +amount;
  userAccount.balance -= +amount;

  receiver.balance += +amount;
  res.sendFile(__dirname + '/public/success.html');
});

app.listen(PORT, () => {
  console.log('Server is up and running on port: ', PORT);
});