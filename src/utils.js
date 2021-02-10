import crypto from 'crypto';
import fs from 'fs';

function cleanData(filthy, extraData = null){
  console.log(filthy)
    let response = {'data': []}
    let data = {}
    filthy.data.forEach(element => {
        data = element.data
        data['id'] = element.ref.id
        response.data.push(data)    
    });
    response['status'] = true
    response['extraData'] = extraData
    return response
}

function validateInt(value){
   return (Number.isInteger(parseInt(value))?parseInt(value):0);
}

function dateTimeInString(dateTime){
    let date_ob = new Date(dateTime);
    return (`${date_ob.getFullYear()}-${date_ob.getMonth() + 1}-${date_ob.getDate()}.${date_ob.getHours()}:${date_ob.getMinutes()}:${date_ob.getSeconds()}`)
}

function generateKey(passKey,slug){
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem'
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
          cipher: 'aes-256-cbc',
          passphrase : passKey
        }
      }); 
    var dir = './keys/'+slug;
    if (!fs.existsSync(dir)){
      console.log('make dir')
        fs.mkdir(dir, (error)=>{
          console.log(error);
        });
    }
    console.log('exists')
    fs.writeFile('./keys/'+slug+'/'+passKey+'.pem', privateKey, (error)=>{
      console.log("writing error", error)
    })
    return ({'publicKey':publicKey})
}

export {cleanData, validateInt, dateTimeInString, generateKey}