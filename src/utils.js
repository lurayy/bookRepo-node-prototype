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


export {cleanData, validateInt, dateTimeInString}