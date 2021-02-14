import {publicEncrypt} from 'crypto';
import { readFileSync } from 'fs';
import fs from 'fs';

let path = 'public.pem'
let publicKey = null
if (fs.existsSync(path)){
    publicKey = fs.readFileSync(path, 'utf8', function(error){
        console.log("error reading file : ", error)
    });
    console.log(publicKey)
}

let x = publicEncrypt(publicKey, "Hello Again", function(error, result){
    console.log(error);
    console.log('er' , result)
});
console.log(x.toString())
fs.appendFile('en.txt', x.toString(), function(wr_error){
    if (wr_error){
        console.log('error')
    }
});

// let x = '25'
// console.log(x) 
