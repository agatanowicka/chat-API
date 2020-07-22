const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const usersRouters = require("./routers/users");

app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());


require('dotenv').config()

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use("/api/users", usersRouters);




app.listen(3000);