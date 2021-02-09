import {db, dbQuery} from '../../database.js';
import {cleanData, validateInt, dateTimeInString} from '../../utils.js';

const getStatus = async function (id){
    let result = await db.query(
        dbQuery.Get(
            dbQuery.Ref(dbQuery.Collection('vendors'), id)
        )
    )
    return result
}

async function registerVendror(req, res){
        
}


async function listVendors(req, res){
    const size = validateInt(req.query.size)
    let filter =  {
        size : size==0?25:size
    }
    if (req.query.after){
        filter['after'] = [dbQuery.Ref(dbQuery.Collection('vendors'), req.query.after)]
    }
    // let result = await db.query(
    //     dbQuery.Map(
    //         dbQuery.Paginate(dbQuery.Documents(dbQuery.Collection('vendors')), filter),
    //         dbQuery.Lambda((ele) => dbQuery.Get(ele))
    //     )
    // )
    // return res.send(cleanData(result))
    return res.send("Done")
}

export {getStatus, listVendors};