import {db, dbQuery} from '../../database.js';
import {cleanData, validateInt, dateTimeInString, generateKey} from '../../utils.js';
import slug from 'slug';

async function getVendor(req, res){
    return res.send(req.user);
}

async function registerVendor(req, res){
    let vendorData = req.body;
    vendorData['vendorSlug'] = slug(req.body.name)
    let result = await db.query(
        dbQuery.Create(
            dbQuery.Collection('Vendor'), {data : vendorData}
        )
    )
    // const keys = generateKey(result.ref.id, result.data.vendorSlug)
    // console.log('erher')
    // res.send(cleanData({'data':[result]}, {'publicKey':keys['publicKey']}))
    res.send(cleanData({'data':[result]}))
}

async function listVendors(req, res){
    const size = validateInt(req.query.size)
    let filter =  {
        size : size==0?25:size
    }
    if (req.query.after){
        filter['after'] = [dbQuery.Ref(dbQuery.Collection('Vendor'), req.query.after)]
    }
    let result = await db.query(
        dbQuery.Map(
            dbQuery.Paginate(dbQuery.Documents(dbQuery.Collection('Vendor')), filter),
            dbQuery.Lambda((ele) => dbQuery.Get(ele))
        )
    )
    return res.send(cleanData(result))
}

async function updateVendor(req, res){
    let vendorData = req.body;
    let result = await db.query(
        dbQuery.Update(
            dbQuery.Ref(dbQuery.Collection('Vendor'), req.params.id), vendorData 
        )
    )
    // const keys = generateKey(passKey)
    res.send(cleanData({'data':[result]}))
}


export {getVendor, registerVendor, listVendors, updateVendor};