const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileupload = require('express-fileupload');
const exhbs = require('express-handlebars');
require('dotenv').config();
require('express-async-errors');

const passport = require('./passport');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const shopgridRouter = require('./routes/shop-grid');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const usersApiUser = require('./routes/api/user');
const app = express();

app.engine('hbs', exhbs({
    defaultLayout: 'layout',
    extname: 'hbs',
    layoutsDir: 'views',
    partialsDir: 'views/partials'
    //helpers: require('./helpers/handlebars.js')(exhbs)
    //createPagination: paginateHelper.createPaginatio
}));
app.set('view engine', 'hbs');

var hbs = exhbs.create({});
hbs.handlebars.registerHelper("when", function (operand_1, operator, operand_2, options) {
    var operators = {
        'eq': function (l, r) { return l == r; },
        'noteq': function (l, r) { return l != r; },
        'gt': function (l, r) { return Number(l) > Number(r); },
        'or': function (l, r) { return l || r; },
        'and': function (l, r) { return l && r; },
        '%': function (l, r) { return (l % r) === 0; }
    }
        , result = operators[operator](operand_1, operand_2);

    if (result) return options.fn(this);
    else return options.inverse(this);
});


//use body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//use session
const session = require('express-session');
app.use(session({
    cookie: {httpOnly: true, maxAge: null},
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

//use passport
app.use(passport.initialize());
app.use(passport.session());

//pass req.user to res locals
app.use(function(req, res, next) {
    res.locals.user = req.user;
    res.locals.isLogin = req.user ? true : false;

    //console.log('user', res.locals.user);
    //req.session.cookie.maxAge = res.locals.isLogin ? 30 * 24 * 60 * 60 * 100 : null;
    next();
})

//use cart controller by session
const Cart = require('./controllers/cartController');
app.use((req, res, next) => {
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    req.session.cart = cart;
    res.locals.totalQuantity = cart.totalQuantity;

    next();
})


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileupload());


app.use('/user', usersRouter);
app.use('/shop-grid', shopgridRouter);
app.use('/single-product', productRouter);
app.use('/cart', cartRouter);
app.use('/', indexRouter);

//routes api
app.use('/api/user', usersApiUser);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.render('error', {
        layout: false
    })
    //next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    console.log(err);
    res.render('500', {
        layout: false
    });
});

module.exports = app;