const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const csrfProtection = require('csurf')();
const flash = require('connect-flash');

const errorHandler = require('./api/middleware/error-handler');
const adminRouter = require('./api/routes/admin');
const shopRouter = require('./api/routes/shop');
const cartRouter = require('./api/routes/cart');
const authRouter = require('./api/routes/auth');
const User = require('./models/user');

const MONGO_CONNECTION_URI
    = 'mongodb+srv://gaurav-saini:gaurav-saini@slackedge-test-skasp.mongodb.net/my-shop';

const store = new MongoStore({ uri: MONGO_CONNECTION_URI, collection: 'sessions' });

const app = express();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);

app.set('view engine', 'ejs');
app.set('views', 'views');  // default is the views folder in project root directory, use this only if templates are stored in folder not named views

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'my session secret',
    resave: false,  // session not saved on every request, instead it is saved only if something changes
    saveUninitialized: false,
    store: store
}));
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {

    if (req.session.user) {

        User.findById(req.session.user._id)
            .then(user => {
                req.user = user;
                next();
            })
            .catch(err => console.log(err));
    } else {
        next();
    }
});

app.use((req, res, next) => {
    // express passes local variables into all render calls 
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use('/admin', adminRouter);
app.use(shopRouter);
app.use(cartRouter);
app.use(authRouter);

app.use(errorHandler.notFound);

mongoose.connect(MONGO_CONNECTION_URI)
    .then(result => {
        app.listen(4000, () => console.log('server started on port 4000'))
    })
    .catch(err => console.log(err));