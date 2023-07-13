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
    console.log("TRAIN NUMBER CHECKK----------");
    console.log(req.body);
    query = `select *
            from seat_inventory
            where seat_type="${req.body.seatType}" 
            AND train_number=${req.body.trainNumber} 
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

//post=paymentmode,amount,paymentstatus,bookid
app.post('/book/payment', (req, res) => {
    console.log('PAYMENT DATA-------------------');
    console.log(req.body);
    global.userData = {
        name: 'Shrijon',
        email: 'shrijon1234@gmail.com',
        acc_num: 4,
        phone: 2147483647,
        address: 'behala',
    };
    query = `insert into payment values(
        "${req.body.paymentmode}",
        "${Math.floor(Math.random() * 10000)}",
        "${req.body.amount}",
        "${req.body.paymentstatus}",
        "${req.body.bookid}"
    )`
    connection.query(query, (err, results, fields) => {
        if (err)
            console.log(err);
        console.log(results);
        req.body.acc_num = userData.acc_num;
        req.body.email = userData.email;
        res.redirect(307, '/dashboard?accnum=4&email=shirjon0133@gmail.com');
    })
})
module.exports = app;
