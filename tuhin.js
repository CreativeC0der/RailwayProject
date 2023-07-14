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
        userData: {
            name: 'Shrijon',
            email: 'shrijon1234@gmail.com',
            acc_num: 4,
            phone: 2147483647,
            address: 'behala',
        },
        details: [
            {
                booking_id: 4,
                train_number: 12345,
                journey_date: '2023-06-19T18:30:00.000Z',
                fare: 1000,
                seat_type: '1A',
                no_of_seats: 4,
                payment_status: 'PAID',
                payment_mode: 'UPI',
                payment_id: 2490
            },
        ],
        stations: [
            {
                location: 'sealdah',
                station_code: 'SDH',
                station_name: 'Sealdah Junction'
            },
            {
                location: 'canning',
                station_code: 'CNG',
                station_name: 'Canning'
            },
            {
                location: 'piali',
                station_code: 'PLF',
                station_name: 'Pilai'
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
    res.render('admin-login', {})
})

//TEMPLATE
//query=acc_num,src,dest
app.get('/book', (req, res) => {
    res.render('book', {
        userData: {
            name: 'Shrijon',
            email: 'shrijon1234@gmail.com',
            acc_num: 4,
            phone: 2147483647,
            address: 'behala',
        },
        result: [
            {
                destination: 'sealdah',
                origin: 'budge-budge',
                train_name: 'budge-budge local',
                train_number: 12345
            },
            {
                destination: 'sealdah',
                origin: 'canning',
                train_name: 'canning local',
                train_number: 23456
            },
            {
                destination: 'sonapur',
                origin: 'sealdah',
                train_name: 'sonarpur local',
                train_number: 78901
            }
        ]
    })
})

//book details

/*query={
  jndt: '2023-07-10',
  tnum: '12345',  //fixed!!!!!
  seattype: 'AC',
  seatnum: '2'
}*/
app.post('/book/overview', (req, res) => {
    res.render('overview', {
        userData: {
            name: 'Shrijon',
            email: 'shrijon1234@gmail.com',
            acc_num: 4,
            phone: 2147483647,
            address: 'behala',
        },
        bookingData: {
            train_number: 12345,
            booking_id: 4,
            journey_date: '2023-06-19T18:30:00.000Z',
            fare: 1000,
            acc_num: 4,
            seat_type: '1A',
            no_of_seats: 2,
            destination: 'sealdah',
            origin: 'budge-budge',
            train_name: 'budge-budge local',
        },
        extraData: {
            mealPreference: 'vegetarian',
            seatPreference: ['upper', 'middle']
        }
    })
})

//post=paymentmode,paymentstatus,bookid,amount
app.post('/book/payment', (req, res) => {
    //redirected to dashboard using same userData
})
// 
// payment_id,acc_num,booking_id  is posting 
app.post('/dashboard/cancel', (req, res) => {
    //redirected to dashboard using same userData  
})

//......................................................................admin section ................................................................
//admin_dashboard
// this will be in post method

app.post('/admin-dashboard', (req, res) => {
    res.render('admin-dashboard', {
        userData: {
            name: 'Shrijon',
            email: 'shrijon1234@gmail.com',
            acc_num: 4,
            phone: 2147483647,
            address: 'behala',
        },
        trains: [
            {
                destination: 'sealdah',
                origin: 'budge-budge',
                train_name: 'budge-budge local',
                train_number: 12345
            },
            {
                destination: 'sealdah',
                origin: 'canning',
                train_name: 'canning local',
                train_number: 23456
            },
            {
                destination: 'sonapur',
                origin: 'sealdah',
                train_name: 'sonarpur local',
                train_number: 78901
            }
        ],
        stations: [
            {
                location: 'sealdah',
                station_code: 'SDH',
                station_name: 'Sealdah Junction'
            },
            {
                location: 'canning',
                station_code: 'CNG',
                station_name: 'Canning'
            },
            {
                location: 'piali',
                station_code: 'PLF',
                station_name: 'Pilai'
            }
        ],
        seats: [
            {
                fare: 100,
                available_seats: 2,
                train_number: 12345,
                seat_type: '1A'
            },
            {
                fare: 100,
                available_seats: 2,
                train_number: 12345,
                seat_type: '1A'
            }
        ]

    })
})
//post data from admin dashboard:
app.post('/admin-dashboard/add-station', (req, res) => {
    //redirected to dashboard 
})
app.post('/admin-dashboard/add-train', (req, res) => {
    //redirected to dashboard 
})
app.post('/admin-dashboard/add-seat', (req, res) => {
    //redirected to dashboard 
})


app.listen(3000, 'localhost');