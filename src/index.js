import express from 'express';
import {db ,dbQuery} from './database.js';
import {router} from './routes.js';
import body_parser from 'body-parser';
import fs from 'fs';
import {cleanData, dateTimeInString} from './utils.js';
import {privateDecrypt} from 'crypto';

const app = express();

app.use(async function(req, res, next){
    if (req.headers.authorization){
        let result = null;
        try{
            result = await db.query(
                dbQuery.Get(
                    dbQuery.Ref(dbQuery.Collection('Vendor'), req.headers.authorization)
                )
            )
            req['user'] = cleanData({'data':[result]})['data'][0];
        }catch{
            result = null
        }
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

app.post('*', async function(req, res, next){
    console.log(req.body);
    next();
    // let path = "keys/"+req.user.vendorSlug+'/'+req.user.id+'.pem';
    // console.log(path);
    // if (fs.existsSync(path)){
    //     let privateKey = fs.readFileSync(path, 'utf8', function(error){
    //         console.log("error reading file : ", error)
    //     });
    //     console.log('encrypted',body);
    //     let body = privateDecrypt(privateKey, req.body);
    //     console.log(body);
    //     console.log("yooo path");
    //     next();
    // }else{
    //     res.send.status(500).send('No KeyPair found for given vendor.')
    // }
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
