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

    var responseData = {};
    query = `select name,email,acc_num,phone,address 
    from passenger where 
    acc_num="${req.body.accnum}" AND email="${req.body.email}"`;
    connection.query(query, (err, results, fields) => {
        if (err)
            console.log(err);
        if (result.length() == 0)
            res.send('User not found');
        responseData = results[0];
        query = `select booking_id,train_number,journey_date,fare
        from booking NATURAL JOIN passenger
        where acc_num='${req.body.accnum}' AND email='${req.body.email}'`

        connection.query(query, (err, results, fields) => {
            if (err)
                console.log('ERRORRRR');

            console.log(results);
            responseData.details = results;

            query = `select * from station`;
            connection.query(query, (err, results, fields) => {
                console.log(results);

                responseData.stations = results;
                console.log(`response=`);
                console.log(responseData);
                res.render('dashboard', responseData);
            });

        });
    })

});

module.exports = app;
