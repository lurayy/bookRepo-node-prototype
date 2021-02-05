import {db, dbQuery} from '../../../database.js';
import {cleanData, validateInt, errorHandler} from '../../../utils.js';

const getStatus = async function (id){
    let result = await db.query(
        dbQuery.Get(
            dbQuery.Ref(dbQuery.Collection('vendors'), id)
        )
    )
    return result
}

const listVendors = async function(req, res) {
    const size = validateInt(req.query.size)
    let filter =  {
        size : size==0?25:size
    }
    if (req.query.afterId){
        filter['after'] = [dbQuery.Ref(dbQuery.Collection('vendors'), req.query.afterId)]
    }
    let result = await db.query(
        dbQuery.Map(
            dbQuery.Paginate(dbQuery.Documents(dbQuery.Collection('vendors')), filter),
            dbQuery.Lambda((ele) => dbQuery.Get(ele))
        )
    )
    return res.send(cleanData(result))
}

export {getStatus, listVendors};