const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const User = require('../models/user');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}));

const getLogin = (req, res, next) => {
    let message = req.flash('error');

    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/login', {
        docTitle: 'Login',
        path: 'login',
        errorMessage: message
    });
}

const postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email })
        .then(userDoc => {

            if (!userDoc) {
                req.flash('error', 'Invalid login credentials.');
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
                    req.flash('error', 'Invalid login credentials.');
                    res.redirect('/login');
                });
        })
        .catch(err => {
            console.log(err);
        });
}

const postLogout = (req, res, next) => {
    req.session.destroy(err => {
        res.redirect('/');
    });
}

const getSignup = (req, res, next) => {
    let message = req.flash('error');

    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/signup', {
        docTitle: 'Signup',
        path: 'signup',
        errorMessage: message
    });
}

const postSignup = (req, res, next) => {
    // to avoid duplication - can also use index in mongodb
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if (password !== confirmPassword) {
        req.flash('error', 'Passwords do not match.');
        return res.redirect('/signup');
    }
    User.findOne({ email: email })
        .then(userDoc => {

            if (userDoc) {
                req.flash('error', 'User with email already exists.');
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
                    return transporter.sendMail({
                        to: email,
                        from: 'node@test.gs',
                        subject: 'Signup Succesful',
                        html: `<h3>Signup successful for nodejs shop.</h3>`
                    });
                })
                .catch(err => {
                    console.log(err);
                });
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