
const register = async (req, res, next) => {
    console.log(req.session.messages);
    res.redirect('/profile')
};
const login = async (req, res, next) => res.redirect('/profile');

export { register, login }