const express = require('express');
const mysql = require('mysql2');
const hbs = require('express-handlebars')

const app = express.Router();

app.get('/contact', (req, res) => {
    res.render('contact', {})
})

module.exports = app;
