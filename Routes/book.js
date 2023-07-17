const express = require('express');
const mysql = require('mysql2');
const app = express.Router();

// create the connection to database


app.get('/book', (req, res) => {
    console.log(req.query);
    query = `select train.*,seat_type from 
            train NATURAL JOIN seat_inventory
            where origin="${req.query.src}" AND destination="${req.query.dept}"`;



    connection.query(query, (err, results, field) => {
        if (err)
            res.send('query error');
        console.log(results);
        output = [];
        for (train of results) {

            found = false
            for (i in output) {
                if (output[i].train_number == train.train_number) {
                    found = true;
                    (output[i].seat_type).push(train.seat_type);
                    break;
                }

            }

            if (!found) {
                train.seat_type = [train.seat_type];
                output.push(train);
            }
        }
        console.log("MY TRAINS");
        for (train of output)
            console.log(train);
        res.render('book', { userData: userData, result: output });
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
            console.log('USERDATA BEFORE BOOKING_------------------------');
            console.log(userData);
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
        res.redirect(307, `/dashboard?accnum=${userData.acc_num}&email=${userData.email}`);
    })
})
module.exports = app;
