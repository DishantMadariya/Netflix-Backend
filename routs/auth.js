const express = require('express');
const routs = express.Router();
const authcontroller = require('../controllers/authcontroller');

routs.post('/register',authcontroller.register);
routs.post('/login', authcontroller.login);
routs.get('/logout', authcontroller.logout);

module.exports = routs;
