const express = require('express');
const mysql = require('mysql2');
const app = express.Router();

app.post('/admin-dashboard', (req, res) => {
    console.log(req.body);
    if (adminData == undefined) {
        if (req.body.accnum == 0 && req.body.email == 'admin@gmail.com') {
            query = `select name,email,acc_num,phone,address 
                from passenger where 
                acc_num="${req.body.accnum}" AND email="${req.body.email}"`;

            Connection.query(query, (err, results, fields) => {
                if (err)
                    console.log(err);

                console.log(results);
                global.adminData = results[0];
            })
        }

        else {
            res.send('Wrong credentials');
        }
    }

    query = `select * from stations where station=`


})

module.exports = app;