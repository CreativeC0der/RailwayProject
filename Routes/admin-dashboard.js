const express = require('express');
const mysql = require('mysql2');
const app = express.Router();

app.post('/admin-dashboard', (req, res) => {
    console.log(req.body);
    if (req.body.accnum == 0 && req.body.email == 'admin@gmail.com') {
        res.render('admin-dashboard', {
            userData
        });
    }
    else {
        res.send('Wrong credentials');
    }
})

module.exports = app;