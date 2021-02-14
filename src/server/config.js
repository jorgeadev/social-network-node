const path = require('path');
const exphbs = require('express-handlebars');
const  morgan = require('morgan');
const  multer = require('multer');
const express = require('express');
const routes = require('../routes/index');
const errorHandler = require('errorhandler');

module.exports = app => {
    // Settings
    app.set('port', process.env.PORT || 3005);
    app.set('views', path.join(__dirname, '../views'));
    app.engine('.hbs', exphbs ({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers')
    }));
    app.set('view engine', '.hbs');

    // middlewares
    app.use(morgan('dev'));
    app.use(multer({dest: path.join(__dirname, '../css/upload/temp')}).single('image'));
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());

    // routers
    routes(app);

    // statics files
    app.use('/css' ,express.static(path.join(__dirname, '../css')));

    // errorhandler
    if ('development' === app.get('env')) {
        app.use(errorHandler);
    }

    return app;
}