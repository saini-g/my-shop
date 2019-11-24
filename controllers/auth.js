const bcrypt = require('bcryptjs');

const User = require('../models/user');

const getLogin = (req, res, next) => {
    res.render('auth/login', { docTitle: 'Login', path: 'login' });
}

const postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email })
        .then(userDoc => {

            if (!userDoc) {
                return res.redirect('/login');
            }
            bcrypt.compare(password, userDoc.password)
                .then(isPasswordValid => {

                    if (isPasswordValid) {
                        req.session.user = userDoc;
                        req.session.isLoggedIn = true;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/');
                        });
                    }
                    res.redirect('/login');
                });
        })
        .catch(err => {
            console.log(err);
        });
    
    
    User.findById('5d1b957c1c9d440000284725')
        .then(user => {
        })
        .catch(err => console.log(err));
}

const postLogout = (req, res, next) => {
    req.session.destroy(err => {
        res.redirect('/');
    });
}

const getSignup = (req, res, next) => {
    res.render('auth/signup', { docTitle: 'Signup', path: 'signup' });
}

const postSignup = (req, res, next) => {
    // to avoid duplication - can also use index in mongodb
    const email = req.body.email;
    const password = req.body.password;
    // const confirmPassword = req.body.confirmPassword;
    User.findOne({ email: email })
        .then(userDoc => {

            if (userDoc) {
                return res.redirect('/signup');
            }
            bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const newUser = new User({
                        email: email,
                        password: hashedPassword,
                        cart: { products: [] }
                    });
                    return newUser.save();
                })
                .then(result => {
                    res.redirect('/login');
                })
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = {
    getLogin,
    postLogin,
    postLogout,
    getSignup,
    postSignup
};