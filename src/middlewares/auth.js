const auth = async (req, res, next) => {
  console.log(req.messages);
  if (req.isAuthenticated()) {
    next();
  }
  else {
    res.redirect('/');
  }
};

export default auth;