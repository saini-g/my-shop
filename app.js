const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const errorHandler = require('./api/middleware/error-handler');
const adminRouter = require('./api/routes/admin');
const shopRouter = require('./api/routes/shop');
const cartRouter = require('./api/routes/cart');
const dbUtil = require('./util/database');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');  // default is the views folder in project root directory, use this only if templates are stored in folder not named views

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('5d1b957c1c9d440000284725')
        .then(user => {
            req.user = new User(user.name, user.email, user._id, user.cart);;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRouter);
app.use(shopRouter);
app.use(cartRouter);

app.use(errorHandler.notFound);

dbUtil.mongoConnection(() => {
    app.listen(4000, () => console.log('server started on port 4000'))
});