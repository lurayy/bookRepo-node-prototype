function cleanData(filthy){
    let clean = {}
    return clean
}

function validateInt(value){
   return (Number.isInteger(parseInt(value))?parseInt(value):0);
}

export {cleanData, validateInt}