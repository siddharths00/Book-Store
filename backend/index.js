const axios = require("axios");
require('dotenv').config();
const mongoose = require('mongoose');
const express = require("express");
const app = express();

const cors = require('cors');
const res = require("express/lib/response");

app.listen(5000, () => console.log("Server Started at the Port 5000"));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
  extended:true
}));

var cookies = require("cookie-parser");

app.use(cookies());

app.use(cors());

const url = process.env.URL;

const URI = process.env.MONGODB_URL
mongoose.connect("mongodb+srv://siddharths:299@bookstore.b2gdi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')
})

app.use('/user', require('./routes/userRouter'));
app.use('/api', require('./routes/bookRouter'))


