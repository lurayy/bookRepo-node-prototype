import {db, dbQuery} from '../../../database.js';
import {validateInt} from '../../../utils.js';

const getStatus = async function (id){
    id = 289580001929462285;
    let result = await db.query(
        dbQuery.Get(
            dbQuery.Ref(dbQuery.Collection('vendors'), id)
        )
    ).then((data) =>{
        console.log('Retrived Data : ',data);
    })
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
        dbQuery.Paginate(dbQuery.Documents(dbQuery.Collection('vendors')), filter),
    )

    console.log(result)
    // let result = re
    return res.send("hero")
}

export {getStatus, listVendors};