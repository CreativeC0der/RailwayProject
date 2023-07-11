const express = require('express');
const mysql = require('mysql2');
const hbs = require('express-handlebars')

const app = express.Router();

app.get('/about', (req, res) => {
    res.render('about', {})
})

module.exports = app;
