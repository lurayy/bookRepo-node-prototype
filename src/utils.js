import generateKeyPair from 'crypto';

function cleanData(filthy, extraData = null){
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

function generateKey(id){
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem'
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
          passphrase : id
        }
      }); 
    return ({'publicKey':publicKey, 'privateKey':privateKey})
}

export {cleanData, validateInt, dateTimeInString, generateKey}