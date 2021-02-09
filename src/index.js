import express from 'express';
import {} from './database.js';
import {router} from './routes.js';
import body_parser from 'body-parser';
import fs from 'fs';
import {dateTimeInString} from './utils.js';

const app = express();

app.use(function(req, res, next){
    console.log(req.headers);
    next();
})


app.use(body_parser.json());
app.use(router);

const PORT = 8000;
app.listen(PORT, ()=>{console.log(`Server running on port : ${PORT}`)});

app.use(function (err, req, res, next){
    res.status(500).send({'status': false, 'error' : err.message});
    fs.appendFile('logs/error.log', `${dateTimeInString(Date.now())}, Triggered Url: ${req.originalUrl}, Error: ${err.message} \n`, function(wr_error){
        if (wr_error){
            console.log(`${dateTimeInString(Date.now())} :  Error while writing logs ! Error : ${wr_error} \n`)
        }
    });
    next();
})
