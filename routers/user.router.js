const express = require("express");
const router = express.Router();
const userHandler = require("../handler/user.handler");
const { validate } = require("req-valida");

router.get("/", userHandler.get);

router.post(
    "/",

    validate({
        location: "body",
        data: {
            name: {
                rules: ["string"],
            },
            phone: {
                rules: ["string"],
            },
            email: {
                rules: ["string"],
            },
            age: {
                rules: ["number"],
                isOptional: true,
            },
        },
    }),

    userHandler.post
);

module.exports = router;
