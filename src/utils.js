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

function errorHandler(target, property, descriptor){
    console.log(target)
    console.log(property)
    console.log(descriptor)
}

export {cleanData, validateInt, errorHandler}