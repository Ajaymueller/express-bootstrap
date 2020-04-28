const express = require('express');

const app = express();

const controllers = require('./controllers.js')

app.use('/', controllers.mainController);

module.exports = app;
