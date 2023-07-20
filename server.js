// get the client
const express = require('express')
const hbs = require('express-handlebars')
const mysql = require('mysql2');

//import Routes
const aboutRoute = require('./Routes/about');
const contactRoute = require('./Routes/contact');
const dashboardRoute = require('./Routes/dashboard');
const bookRoute = require('./Routes/book');
const adminRoute = require('./Routes/admin-dashboard');

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
app.engine('handlebars', hbs.engine({
    helpers: {
        stringify: function (context) {
          return JSON.stringify(context);
        },
    }
}));
app.set('view engine', 'handlebars')
app.set('views', './Views')
app.use(express.urlencoded({ extended: true }))

//Routing

app.get('/home', (req, res) => {
    res.render('home', {})
})

//posting to /passnger-login (need to implemnet this)
app.post('/passenger-login', (req, res) => {
    console.log(req.body);
    query = `insert into passenger values(
        "${req.body.name}",
        "${req.body.acc_num}",
        "${req.body.email}",
        "${req.body.phone}",
        "${req.body.address}"
    )`
    connection.query(query, (err, results, fields) => {
        if (err)
            console.log(err);
        res.redirect('/passenger-login');
    })
})

app.get('/passenger-login', (req, res) => {
    res.render('login', {})
})

app.get('/admin-login', (req, res) => {
    res.render('admin-login', {})
})

app.get('/signup', (req, res) => {
    res.render('signup', {})
})

app.get('/about', aboutRoute);

app.get('/contact', contactRoute);

app.post('/dashboard', dashboardRoute);

app.post('/dashboard/cancel', dashboardRoute);

app.get('/book', bookRoute);

app.post('/book/overview', bookRoute);

app.post('/book/payment', bookRoute);


app.post('/admin-dashboard', adminRoute);

app.post('/admin-dashboard/add-station', adminRoute);
app.post('/admin-dashboard/add-train', adminRoute);
app.post('/admin-dashboard/add-seat', adminRoute);

//need to implemnet @shrijon

//posting station_code
app.post('/admin-dashboard/delete-station', adminRoute);
//posting train_number, train_name
app.post('/admin-dashboard/delete-train', adminRoute);
//posting train_number, seat_type
app.post('/admin-dashboard/delete-seat', adminRoute);
