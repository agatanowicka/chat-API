

const { Client } = require('pg');

const client = new Client({
    user: process.env.USER,
    host:  process.env.HOST,
    database:  process.env.DATABASE,
    password: process.env.PASSWORD,
    port:  process.env.PORT,
});

const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.signup = (req, res) => {
    client.connect()
        .then(() => {
            client.query('SELECT * FROM users WHERE email = $1', [req.body.email], (err, res) => {
                if (err) {
                    return next(err)
                }
                bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                    if (err) {
                        return next(err)
                    }
                    client.query('INSERT INTO users ("firstName", "lastName", "email", "password") VALUES ($1, $2, $3, $4)', [req.body.firstName, req.body.lastName, req.body.email, hash], (err, savedUser) => {
                        if (savedUser) {
                            client.end()
                            return true
                        }
                        else { return next(err)}
                    })
                });
            })
        })
}

