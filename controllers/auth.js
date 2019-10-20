const User = require('../models/user');

const getLogin = (req, res, next) => {
    res.render('auth/login', { docTitle: 'Login', path: 'login', isAuthenticated: false });
}

const postLogin = (req, res, next) => {
    User.findById('5d1b957c1c9d440000284725')
        .then(user => {
            req.session.user = user;
            req.session.isLoggedIn = true;
            req.session.save(err => {
                console.log(err);
                res.redirect('/');
            });
        })
        .catch(err => console.log(err));
}

const postLogout = (req, res, next) => {
    req.session.destroy(err => {
        res.redirect('/');
    });
}

const getSignup = (req, res, next) => {
    res.render('auth/signup', { docTitle: 'Signup', path: 'signup', isAuthenticated: false });
}

const postSignup = (req, res, next) => {
    //
}

module.exports = {
    getLogin,
    postLogin,
    postLogout,
    getSignup,
    postSignup
};