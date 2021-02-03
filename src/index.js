import express from 'express';

const db = require('./database.js');

const app = express();
const PORT = 8000;
app.listen(PORT, ()=>{console.log(`Server running on port : ${PORT}`)});
