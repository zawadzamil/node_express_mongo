const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = 3000;
const router = express.Router();
const multer = require('multer');

mongoose.set('strictQuery', true);
mongoose
    .connect('mongodb://127.0.0.1:27017/node', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connection Successful!');
    })
    .catch((err) => console.log(err));

const upload = multer({ dest: 'uploads/' });
app.use(router);
// Schema
const { Schema } = mongoose;
const userData = new Schema({
    name: String,
    phone: Number,
    file: String,
});
const UserModel = mongoose.model('User', userData);
// Routes
router.get('/user/:id', (req, res) => {
    UserModel.findById(req.params.id, (err, data) => {
        if (err) return res.status(500).send('Something Wrong');
        if (!userData) return res.status(404).send('Data Not Found!');
        return res.send(data);
    });
});
router.post('/file', upload.single('image'), (req, res) => {
    const newUser = new UserModel({
        name: req.body.name,
        phone: req.body.phone,
        file: req.file.fieldname,
    });
    newUser.save((err) => {
        if (err) return res.status(500).send(err);
        return res.status(201).send(newUser);
    });
});
router.put('/user/update/:id', (req, res) => {
    const userId = req.params.id;
    console.log(req.query);
    UserModel.findByIdAndUpdate(userId, { $set: req.query }, (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(404).send();
        return res.json(user);
    });
});
router.delete('/user/delete/:id', (req, res) => {
    const userId = req.params.id;
    UserModel.findByIdAndDelete(userId, (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(404).send({ message: 'User not found' });
        return res.send({ message: 'User deleted successfully' });
    });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
