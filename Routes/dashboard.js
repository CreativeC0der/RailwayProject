const express = require('express');
const mysql = require('mysql2');
const app = express.Router();

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'railway'
});

connection.connect((err) => {
    if (err)
        console.log(err)
    else
        console.log("Connected to DB")
})

app.post('/dashboard', (req, res) => {
    console.log(req.body);
    query = `select * 
    from booking NATURAL JOIN passenger
    where acc_num='${req.body.accnum}' AND email='${req.body.email}'`

    connection.query(query, (err, results, fields) => {
        if (err)
            console.log('ERRORRRR');

        console.log(results);
        res.render('dashboard', { details: results })
    });
});

module.exports = app;
