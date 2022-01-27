const express = require('express');
const env = require('dotenv');
const app = express();

env.config();

console.log(process.env.PORT);
app.listen(process.env.PORT, () => {
    console.log(`running on port ${process.env.PORT}`);
});