// get the client
const express = require('express')
const hbs = require('express-handlebars')
const mysql = require('mysql2');

//import Routes
const aboutRoute = require('./Routes/about');
const contactRoute = require('./Routes/contact');
const dashboardRoute = require('./Routes/dashboard');
const bookRoute = require('./Routes/book');

const app = express();

//connectiong to DB
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'railway'
});

connection.connect((err) => {
    if (err)
        console.log(err)
    else {
        console.log("Connected to DB")
        app.listen(3000, 'localhost', () => {
            console.log('listening on port 3000');
        });
    }

})

global.connection = connection;

// initialize views and Handlebars
app.engine('handlebars', hbs.engine());
app.set('view engine', 'handlebars')
app.set('views', './Views')
app.use(express.urlencoded({ extended: true }))


//Routing

app.get('/home', (req, res) => {
    res.render('home', {})
})

app.get('/passenger-login', (req, res) => {
    res.render('login', {})
})

app.get('/admin-login', (req, res) => {
    res.render('login', {})
})

app.get('/signup', (req, res) => {
    res.render('signup', {})
})

app.get('/about', aboutRoute);

app.get('/contact', contactRoute);

app.post('/dashboard', dashboardRoute);

app.get('/book', bookRoute);

app.post('/book/overview', bookRoute);

app.get('/book/overview/payment', bookRoute);
