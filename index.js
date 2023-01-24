const express = require('express');
const mongoose = require('mongoose');
const userHandler = require('./handler/userHandler');

const app = express();
app.use(express.json());
app.use('/user', userHandler);
const port = 3000;
mongoose.set('strictQuery', true);
mongoose
    .connect('mongodb://127.0.0.1:27017/node', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connection Successful!');
    })
    .catch((err) => console.log(err));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
