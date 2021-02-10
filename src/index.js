import express from 'express';
import {db ,dbQuery} from './database.js';
import {router} from './routes.js';
import body_parser from 'body-parser';
import fs from 'fs';
import {dateTimeInString} from './utils.js';

const app = express();

app.use(async function(req, res, next){
    console.log(req.headers.authorization);
    if (req.headers.authorization){
        let result = await db.query(
            dbQuery.Get(
                dbQuery.Ref(dbQuery.Collection('vendors'), req.headers.authorization)
            )
        )
        console.log("Result : ", result)
        if (result){
            next();
        }else{
            res.status(400).send('Invalid Authorization Key !')
        }
    }else{
        res.status(400).send('Unauthorized Access !')        
    }
})

app.use(body_parser.json());
app.post('*', ()=>{
    console.log("POST Happened.")
})
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
