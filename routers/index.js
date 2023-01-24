const express = require("express");
const router = express.Router();

const userRouter = require("./user.router");

const API_VERSION = "1.0.0";

router.use(`/v/${API_VERSION}/users`, userRouter);

module.exports = router;
