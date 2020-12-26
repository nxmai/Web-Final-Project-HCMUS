const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileupload = require('express-fileupload');
require('dotenv').config();
require('express-async-errors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const shopgridRouter = require('./routes/shop-grid');
const productRouter = require('./routes/product');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'hbs');

const exhbs = require('express-handlebars');
const paginateHelper = require('express-handlebars-paginate');

app.engine('hbs', exhbs({
    defaultLayout: 'layout',
    extname: 'hbs',
    layoutsDir: 'views',
    partialsDir: 'views/partials',
    helpers: {
        createPagination: paginateHelper.createPagination
    }
  }));
  app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileupload());


app.use('/users', usersRouter);
app.use('/shop-grid', shopgridRouter);
app.use('/single-product', productRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.render('error',{
        layout: false
    })
    //next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
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