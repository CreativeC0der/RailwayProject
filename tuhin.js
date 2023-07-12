// get the client

const express = require('express')
const mysql = require('mysql2');
const hbs = require('express-handlebars')

const app = express();

// create the connection to database

app.engine('handlebars', hbs.engine());
// initialize views and Handlebars
app.set('view engine', 'handlebars')
app.set('views', './Views')
console.log("server started")

// simple query

//login and sign up
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
    res.render('login', {})
})
app.get('/signup', (req, res) => {
    res.render('signup', {})
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        name: 'Shrijon',
        email: 'shrijon1234@gmail.com',
        accnum: 4,
        phone: 2147483647,
        address: 'behala',
        details: [
            {
                booking_id: 4,
                train_number: 12345,
                journey_date: '2023-06-19T18:30:00.000Z',
                fare: 1000,

            },
            {
                acc_num: 5,
                booking_id: 5,
                train_number: 12345,
                journey_date: '2023-06-19T18:30:00.000Z',
                fare: 1000,
                name: 'tuhin',
                email: 'shirjon0133@gmail.com',
                phone: 2147483647,
                address: 'behala'
            },
        ],
        stations: [
            {
                location: 'sealdah',
                station_code: 'SDH',
                station_name: 'Sealdah Junction'
            }
        ]
    })
})


// menu (home, contact, about)
app.get('/home', (req, res) => {
    res.render('home', {})
})

app.get('/about', (req, res) => {
    res.render('about', {})
})
app.get('/contact', (req, res) => {
    res.render('contact', {})
})

// home page 
app.get('/passenger-login', (req, res) => {
    res.render('login', {})
})
app.get('/admin-login', (req, res) => {
    res.render('login', {})
})

//TEMPLATE
//query=accnum,src,dest
app.get('/book', (req, res) => {
    res.render('book', {
        result: [
            {
                destination: 'sealdah',
                origin: 'budge-budge',
                train_name: 'budge-budge local',
                train_number: 12345
            }
        ]
    })
})

/*query={
  accnum: '4',
  jndt: '2023-07-10',
  tnum: '12345',
  seattype: 'AC',
  seatnum: '2'
}*/
app.get('/book/overview', (req, res) => {
    res.render('overview', {
        //pending
    })
})
// for image
app.use(express.static('Views'));
app.use('/images', express.static('images'));


app.listen(3000, 'localhost');