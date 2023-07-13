const express = require('express');
const mysql = require('mysql2');
const app = express.Router();

app.post('/dashboard', (req, res) => {
    //console.log(req.body);

    var responseData = {};
    query = `select name,email,acc_num,phone,address 
    from passenger where 
    acc_num="${req.body.accnum}" AND email="${req.body.email}"`;
    connection.query(query, (err, results, fields) => {
        if (err)
            console.log(err);

        console.log('userdata=');
        console.log(results[0]);
        global.userData = { ...results[0] };
        responseData.userData = { ...userData };
        query = `select booking_id,train_number,journey_date,fare,seat_type,no_of_seats 
        from booking NATURAL JOIN passenger
        where acc_num='${req.body.accnum}' AND email='${req.body.email}'`

        connection.query(query, (err, results, fields) => {
            if (err)
                console.log('ERRORRRR');

            console.log(results);
            responseData.details = results;

            query = `select * from station`;
            connection.query(query, (err, results, fields) => {
                //console.log(results);

                responseData.stations = results;
                //console.log(`response=`);
                //console.log(responseData);
                res.render('dashboard', responseData);
            });

        });
    })

});

module.exports = app;
