// get the client
const express = require('express')
const hbs = require('express-handlebars')

//import Routes
const aboutRoute = require('./Routes/about');
const contactRoute = require('./Routes/contact');
const dashboardRoute = require('./Routes/dashboard');

const app = express();

// initialize views and Handlebars
app.engine('handlebars', hbs.engine());
app.set('view engine', 'handlebars')
app.set('views', './Views')
app.use(express.urlencoded({ extended: true }))


//Routing

app.get('/', (req, res) => {
    res.render('login', {})
})

app.get('/signup', (req, res) => {
    res.render('signup', {})
})

app.get('/about', aboutRoute);

app.get('/contact', contactRoute);

app.post('/dashboard', dashboardRoute);

app.listen(3000, 'localhost');