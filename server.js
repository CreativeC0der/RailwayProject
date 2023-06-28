// get the client
const express = require('express')
const mysql = require('mysql2');
const hbs = require('express-handlebars')



const app = express();

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
        console.log("successful")
})

app.engine('handlebars', hbs.engine());
// initialize views and Handlebars
app.set('view engine', 'handlebars')
app.set('views', './Views')

// simple query

app.use(express.urlencoded({ extended: true }))
app.post('/', (req, res) => {

    query = `select * 
    from booking NATURAL JOIN passenger
    where name='${req.body.name}'`


    connection.query(query, (err, results, fields) => {
        if (err)
            console.log('ERRORRRR');

        res.render('bookings', { details: results })
    });
});

app.listen(3000, 'localhost');