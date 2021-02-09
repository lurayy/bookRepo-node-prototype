import {db, dbQuery} from '../../database.js';
import {cleanData, validateInt, dateTimeInString, generateKey} from '../../utils.js';
import slug from 'slug';

async function getVendor(req, res){
    let result = await db.query(
        dbQuery.Get(
            dbQuery.Ref(dbQuery.Collection('vendors'),req.params.id)
        )
    )
    return res.send(cleanData({'data':[result]}))
}

async function registerVendor(req, res){
    let vendorData = req.body;
    let passKey = slug(req.body.name)
    vendorData['vendorSlug'] = passKey
    let result = await db.query(
        dbQuery.Create(
            dbQuery.Collection('vendors'), {data : vendorData}
        )
    )
    const keys = generateKey(passKey)
    result.data = [result.data]
    res.send(cleanData(result, {'publicKey':keys['publicKey']}))
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