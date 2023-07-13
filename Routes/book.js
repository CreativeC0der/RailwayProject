const express = require('express');
const mysql = require('mysql2');
const app = express.Router();

// create the connection to database


app.get('/book', (req, res) => {
    console.log(req.query);
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
  jndt: '2023-07-10',
  tnum: '12345',
  seattype: '1A',
  seatnum: '2'
}*/
app.post('/book/overview', (req, res) => {
    console.log("USER DATA----------");
    console.log(userData);
    req.body.tnum = 12345;//MAke this DYNAMIC LATER
    query = `select *
            from seat_inventory
            where seat_type="${req.body.seatType}" 
            AND train_number=${req.body.tnum} 
            AND available_seats>=${req.body.numSeats}`
    console.log(query);
    connection.query(query, (err, results, fields) => {
        if (err)
            console.log(err);

        console.log(results);
        if (results.length == 0) {
            res.send("Seats Not Available");
            return
        }

        seat = { ...results[0] };

        fare = seat.fare * req.body.numSeats;

        query = `update seat_inventory
                set available_seats=${Number(seat.available_seats) - Number(req.body.numSeats)}
                where seat_type="${seat.seat_type}" AND train_number="${seat.train_number}"`;

        connection.query(query, (err, results, fields) => {
            if (err)
                console.log(err);
            console.log(results);
            bookid = Math.floor(Math.random() * 10000);
            query = `insert into booking values(
                ${bookid},
                ${seat.train_number},
                "${req.body.journeyDate}",
                ${fare},
                ${userData.acc_num},
                "${req.body.seatType}",
                ${req.body.numSeats}
            )`;
            connection.query(query, (err, results, fields) => {
                if (err)
                    console.log(err);

                query = `select * 
                        from booking NATURAL JOIN train
                        where booking_id=${bookid}`;
                connection.query(query, (err, results, fields) => {
                    if (err)
                        console.log(error);
                    response = {
                        userData: userData,
                        bookingData: results[0],
                        extraData: {
                            mealPreference: req.body.mealPreference,
                            seatPreference: req.body.seatPreference,
                            age: req.body.age
                        },
                    };
                    console.log(response);
                    res.render('overview', response);

                })
            })
        })
    })

});

//query= bookid
app.get('/book/overview/payment', (req, res) => {
    res.render('payment', {
        name: "shrijon",
        acc_num: 4,
        train_number: 12345,
        total_fare: 4000
    })
})
module.exports = app;
