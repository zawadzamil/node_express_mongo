const express = require('express');

const router = express.Router();
const { validate } = require('req-valida');
const userHandler = require('../handler/user.handler');

router.get('/id/:id', userHandler.get);

router.post(
    '/create',

    validate({
        location: 'body',
        data: {
            name: {
                rules: ['string'],
            },
            phone: {
                rules: ['string'],
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
    userHandler.post,
);
router.put(
    '/update/:id',

    validate({
        location: 'body',
        data: {
            name: {
                rules: ['string'],
                isOptional: true,
            },
            phone: {
                rules: ['string'],
                isOptional: true,
            },
            email: {
                rules: ['string'],
                isOptional: true,
            },
            age: {
                rules: ['number'],
                isOptional: true,
            },
        },
    }),
    userHandler.update,
);
router.delete('/delete/:id', userHandler.remove);

router.get('/all', userHandler.all);

module.exports = router;
