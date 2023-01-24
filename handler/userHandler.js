const express = require('express');
const mongoose = require('mongoose');
const { validate } = require('req-valida');

const router = express.Router();
const userSchema = require('./userSchema');

// eslint-disable-next-line new-cap
const User = new mongoose.model('User', userSchema);

router.get('/', (req, res) => {
    console.log('Hello World');
    res.end('Hello');
});

router.post(
    '/create',

    validate({
        location: 'body',
        data: {
            name: {
                rules: ['string'],
            },
            phone: {
                rules: ['number'],
            },
            email: {
                rules: ['string'],
            },
            age: {
                rules: ['number'],
                isOptional: true,
            },
        },
    }),

    (req, res) => {
        const { name } = req.body;
        const { phone } = req.body;
        const { email } = req.body;
        const age = req.body.age ?? null;
        console.log(name);
        const newUser = new User({
            name,
            phone,
            email,
            age,
        });

        newUser.save((err, d) => {
            if (err) {
                res.status(400).json({
                    error: err.name,
                    message: err.message,
                });
            } else {
                res.status(201).json({
                    message: 'Record Saved Successfully!',
                    data: d,
                });
            }
        });
    },
);
module.exports = router;
