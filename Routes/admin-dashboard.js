const express = require('express');
const mysql = require('mysql2');
const app = express.Router();

app.post('/admin-dashboard', (req, res) => {
    console.log(req.body);
    p1 = new Promise((resolve, reject) => {
        if (global.adminData === undefined) {
            if (req.body.accnum == 0 && req.body.email == 'admin@gmail.com') {
                query = `select name,email,acc_num,phone,address 
                    from passenger where 
                    acc_num="${req.body.accnum}" AND email="${req.body.email}"`;

                connection.query(query, (err, results, fields) => {
                    if (err)
                        console.log(err);

                    console.log(results);
                    global.adminData = results[0];
                    resolve('admin data fetched');
                })
            }

            else {
                res.send('Wrong credentials');
                reject('Wrong details');
            }
        }
        else
            resolve('admin data found in DB');
    })

    p1
        .then((msg) => {
            console.log(msg);
            responseData = { userData: adminData };
            query = `select * from station`;
            connection.query(query, (err, allstations, fields) => {
                responseData.stations = allstations;
                query = `select * from train`;
                connection.query(query, (err, alltrains, fields) => {
                    responseData.trains = alltrains;
                    query = `select * from seat_inventory`;
                    connection.query(query, (err, allseats, fields) => {
                        responseData.seats = allseats
                        responseData.alert = req.query.alert;
                        res.render('admin-dashboard', responseData);
                    })
                })
            });
        })
        .catch((msg) => {
            console.log(msg);
            return;
        })

});

app.post('/admin-dashboard/add-station', (req, res) => {
    console.log(req.body);
    query = `insert into station values(
        "${req.body.station_code}",
        "${req.body.station_name}",
        "${req.body.location}"
    )`;
    connection.query(query, (err, results, fields) => {
        if (err)
            console.log(err);
        res.redirect(307, '/admin-dashboard?alert=Station+added');
    })
})

app.post('/admin-dashboard/add-train', (req, res) => {
    console.log(req.body);
    query = `insert into train values(
        "${req.body.destination}",
        "${req.body.origin}",
        "${req.body.train_name}",
        "${req.body.train_number}"
    )`;
    connection.query(query, (err, results, fields) => {
        if (err)
            console.log(err);
        res.redirect(307, '/admin-dashboard?alert=Train+added');
    })
})

app.post('/admin-dashboard/add-seat', (req, res) => {
    console.log(req.body);
    query = `insert into seat_inventory values(
        "${req.body.fare}",
        "${req.body.available_seats}",
        "${req.body.seat_type}",
        "${req.body.train_number}"
    )`;
    connection.query(query, (err, results, fields) => {
        if (err)
            console.log(err);
        res.redirect(307, '/admin-dashboard?alert=Seat+added');
    })
})

app.post('/admin-dashboard/delete-station', (req, res) => {
    console.log(req.body);
    query = `delete from station where station_code="${req.body.station_code}"`;
    connection.query(query, (err, results, fields) => {
        if (err)
            console.log(err);
        res.redirect(307, '/admin-dashboard?alert=station+deleted');
    })
});

app.post('/admin-dashboard/delete-train', (req, res) => {
    console.log(req.body);
    query = `delete from train where train_number=${req.body.train_number}`;
    connection.query(query, (err, results, fields) => {
        if (err)
            console.log(err);
        res.redirect(307, '/admin-dashboard?alert=train+deleted');
    })
});

app.post('/admin-dashboard/delete-seat', (req, res) => {
    console.log(req.body);
    query = `delete from seat_inventory where train_number=${req.body.train_number} AND seat_type="${req.body.seat_type}"`

    connection.query(query, (err, results, fields) => {
        if (err)
            console.log(err);

        query = `delete from booking where train_number=${req.body.train_number} AND seat_type="${req.body.seat_type}";`

        connection.query(query, (err, results, fields) => {
            if (err)
                console.log(err);
            res.redirect(307, '/admin-dashboard?alert=seat+deleted');
        })

    })
});


module.exports = app