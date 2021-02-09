import {db, dbQuery} from '../../database.js';
import {cleanData, validateInt, dateTimeInString} from '../../utils.js';

async function getVendor(req, res){
    let result = await db.query(
        dbQuery.Get(
            dbQuery.Ref(dbQuery.Collection('vendors'),req.params.id)
        )
    )
    return res.send(cleanData({'data':[result]}))
}

async function registerVendor(req, res){
    let vendorData = req.body
    let result = await db.query(
        dbQuery.Create(
            dbQuery.Collection('vendors'), {data : vendorData}
        )
    )
    console.log(result)
    res.send(cleanData(result))
}

async function listVendors(req, res){
    const size = validateInt(req.query.size)
    let filter =  {
        size : size==0?25:size
    }
    if (req.query.after){
        filter['after'] = [dbQuery.Ref(dbQuery.Collection('vendors'), req.query.after)]
    }
    let result = await db.query(
        dbQuery.Map(
            dbQuery.Paginate(dbQuery.Documents(dbQuery.Collection('vendors')), filter),
            dbQuery.Lambda((ele) => dbQuery.Get(ele))
        )
    )
    return res.send(cleanData(result))
}

export {getVendor, registerVendor, listVendors};