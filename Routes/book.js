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

app.get('/book', (req, res) => {
    console.log(req.query);
    console.log('Global start------------')
    console.log(global.userData);
    console.log('Global start------------')
    query = `select * from train where
            origin="${req.query.src}" AND destination="${req.query.dept}"`;
    connection.query(query, (err, result, field) => {
        if (err)
            res.send('query error');
        console.log({ userData: userData, result: result });
        res.render('book', { userData: userData, result: result });
    })
});

/*query={
  accnum: '4',
  jndt: '2023-07-10',
  tnum: '12345',
  seattype: 'AC',
  seatnum: '2'
}*/
app.get('/book/overview', (req, res) => {
    console.log(req.query);
    query = `select count(*)
            from seat_inventory 
            where booking_status=NULL`
    connection.query(query, (err, result, fields) => {
        if (err)
            log('error');
        console.log(result);
    });
});

module.exports = app;
