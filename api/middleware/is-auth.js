module.exports = (req, res, next) => {

    if (!req.session.isLoggedIn) {
        req.flash('error', 'You Need to login to access this page.');
        return res.redirect('/login');
    }
    next();
}