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
<<<<<<< HEAD
        name: "tuhin",
        accno: 1234

    })})
=======
        details: [
            {
                name: 'shrijon'
            },//tuple 1
            {
                name: 'tuhin'
            },//tuple 2
            {
                name: 'suman'
            }//tuple 3
        ],
        tablename: 'passengers',
        mysqlmetadata: {
            id: 234,
        }
    })
})
>>>>>>> 7e01102b2d769836d3a112c0e799d636fb43a661


// menu (home, contact, about)

app.get('/about', (req, res) => {
    res.render('about', {})
})
app.get('/contact', (req, res) => {
    res.render('contact', {})
})
app.get('/home', (req, res) => {
    res.render('login', {})
})


// for image
app.use(express.static('Views'));
app.use('/images', express.static('images'));


app.listen(3000, 'localhost');